// Mobile Router
// =============

// Includes file dependencies
define([ "jquery","backbone", "../models/InspectionModel", "../collections/InspectionsCollection", "../views/ListView", "../views/HomeView", "parse" ], function( $, Backbone, CategoryModel, CategoriesCollection, ListView, HomeView, jqueryParse ) {

    // Extends Backbone.Router
    return Backbone.Router.extend( {
		latitude: undefined,
		longitude: undefined,
		
        initialize: function() {
			this.locateUser();
			Backbone.history.start();
        },

		locateUser: function(){
			if (navigator && navigator.geolocation) {
				var that = this;
		            navigator.geolocation.getCurrentPosition(function(data, error) {
			that.latitude = data.coords.latitude;
			that.longitude = data.coords.longitude;
				console.log("latitude: ",data.coords.latitude);
				console.log("longitude: ",data.coords.longitude);
				that.getInspections();
				
				
			});
		        } else {
		            error('Geolocation is not supported.');
		        }
		},

        // Backbone.js Routes
        routes: {

            // When there is no hash bang on the url, the home method is called
            "": "home",

            // When #category? is on the url, the category method is called
            "page?:type": "page"

        },

        // Home method
        home: function() {
			console.log("homeview!");
            // Programatically changes to the categories page
			
            $.mobile.changePage( "#home" , { reverse: false, changeHash: false } );

        },

		getInspections: function(){
			var that = this;
			console.log("lat",that.latitude);
					Parse.initialize("YdUZbgh0cv3sNHoeScLz5WMwVSp1fpWAiW3UDiOt", "UFFrD0afUNAjkwjvlDxATRgyYlHUH5195IrLhCQB");
					var Location = Parse.Object.extend("food_inspections");
					var query = new Parse.Query(Location);
					var point = new Parse.GeoPoint({latitude: that.latitude, longitude: that.longitude});
					query.withinMiles("geopoint_location", point,Number(.3));
					query.limit(500);
						query.find({
						  success: function(collection) {
							that.collection = collection;
							that.listView = new ListView({el: "#list",collection: that.collection});
							that.homeView = new HomeView({el: "#home", lat: that.latitude, lng: that.longitude, collection: collection });
							
						  }
						});	
		},
		
		gotoDetailView: function(model){
			alert(model);
			
		},
        page: function(type) {
            var currentView = this[ type + "View" ];
			console.log("Current View: ",currentView);

                    $.mobile.changePage( "#" + type, { reverse: false, changeHash: false } );

        }

    } );


} );