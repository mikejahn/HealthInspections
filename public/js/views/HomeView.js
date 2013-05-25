define([ "jquery", "backbone", "handlebars", "text!views/templates/home.html", "maps", "parse" ], function( $, Backbone, Handlebars, template, maps, jqueryParse  ) {

    return Backbone.View.extend( {
        initialize: function(options) {
				var params = {
					lat: options.lat,
					lng:  options.lng
					
				}
		this.collection = options.collection;

		this.render(params);
        },

		getInspections : function(){

						this.collection.forEach(function(object) {
							var position = object.get('Latitude') + "," + object.get('Longitude');
							var results = object.get('Results');
							var content =  object.get("akaName") + "<br>" + object.get('Address') + "<br> " + results;
							
							
							if(results === "Pass" ||  results === "Pass w/ Conditions"){
									$('#map_canvas').gmap('addMarker', {'icon':'images/smiley_happy.png','position': position, 'bounds': true}).click(function() {
										$('#map_canvas').gmap('openInfoWindow', {'content': content}, this);
									});	
							} else if(results === "Fail") {
									$('#map_canvas').gmap('addMarker', {'icon':'images/smiley_sad.png','position': position, 'bounds': true}).click(function() {
										$('#map_canvas').gmap('openInfoWindow', {'content': content}, this);
									});	
							} else {
									$('#map_canvas').gmap('addMarker', {'icon':'images/smiley_neutral.png','position': position, 'bounds': true}).click(function() {
										$('#map_canvas').gmap('openInfoWindow', {'content': content}, this);
									});
							}
						
						});
			$.mobile.hidePageLoadingMsg();
				
		},

		setMapWithPosition : function(params){
			$.mobile.loading( "show" );
            
			var position = params.lat + "," + params.lng;
			
            $('#map_canvas').gmap().bind('init', function(ev, map) {
	
				$('#map_canvas').gmap('addMarker', {'position': position, 'bounds': true}).click(function() {
					$('#map_canvas').gmap('openInfoWindow', {'content': 'Hello World!'}, this);
				});
	            $('#map_canvas').gmap('option', 'zoom', 17);
				
			});
			this.getInspections();
		},

        render: function(params) {	
			var compiledTemplate = Handlebars.compile(template);
			var html    = compiledTemplate(params);
			$("#homeView",this.el).html(html);
			this.setMapWithPosition(params);
			
            // Maintains chainability
            return this;

        }

    } );



} );