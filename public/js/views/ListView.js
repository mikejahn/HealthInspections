// Category View
// =============

// Includes file dependencies
define([ "jquery", "backbone","models/InspectionModel","text!views/templates/details.html", "handlebars", "views/ListRowView" ], function( $, Backbone, CategoryModel, template, Handlebars, rowView ) {

    // Extends Backbone.View
    return Backbone.View.extend( {

        // The View Constructor
        initialize: function() {			
          	this.render();
        },

        render: function() {
			_.each(this.collection, function(row){
				var rowV = new rowView({model: row});
				this.$("#listView").append(rowV.render().el);
		      
			});
            // Maintains chainability
            return this;
        }

    } );



} );