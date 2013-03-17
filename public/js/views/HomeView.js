// Home View
// =============

// Includes file dependencies
define([ "jquery", "backbone", "handlebars", "text!views/templates/home.html", "maps", "parse" ], function( $, Backbone, Handlebars, template, maps, jqueryParse  ) {

    // Extends Backbone.View
    return Backbone.View.extend( {
        // The View Constructor
        initialize: function(options) {
				console.log(options);
				var params = {
					lat: options.lat,
					lng:  options.lng
					
				}
		
            // The render method is called when Category Models are added to the Collection
            //this.collection.on( "added", this.render, this );
			this.render(params);
        },

		getInspections : function(params){
			var results;
				Parse.initialize("YdUZbgh0cv3sNHoeScLz5WMwVSp1fpWAiW3UDiOt", "UFFrD0afUNAjkwjvlDxATRgyYlHUH5195IrLhCQB");
				var Location = Parse.Object.extend("food_inspections");
				var query = new Parse.Query(Location);
				var point = new Parse.GeoPoint({latitude: params.lat, longitude: params.lng});
				query.withinMiles("geopoint_location", point,Number(.2));
				query.limit(500);
					query.find({
					  success: function(collection) {
						collection.forEach(function(object) {
							var position = object.get('Latitude') + "," + object.get('Longitude');
							
							$('#map_canvas').gmap('addMarker', {'position': position, 'bounds': true}).click(function() {
								$('#map_canvas').gmap('openInfoWindow', {'content': object.get('Address')}, this);
							});
						});
					  }
					});
				
		},

		setMapWithPosition : function(params){
			var position = params.lat + "," + params.lng;
			
            $('#map_canvas').gmap().bind('init', function(ev, map) {
	
				$('#map_canvas').gmap('addMarker', {'position': position, 'bounds': true}).click(function() {
					$('#map_canvas').gmap('openInfoWindow', {'content': 'Hello World!'}, this);
				});
	            $('#map_canvas').gmap('option', 'zoom', 17);
				
			});
			
			console.log(this.getInspections(params));
		},

        // Renders all of the Category models on the UI
        render: function(params) {
			console.log("homeview.render");
	
			var compiledTemplate = Handlebars.compile(template);
			var html    = compiledTemplate(params);
			$("#homeView",this.el).html(html);
			this.setMapWithPosition(params);
			
            // Maintains chainability
            return this;

        }

    } );



} );