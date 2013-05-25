define([ "jquery", "backbone","models/InspectionModel","text!views/templates/details.html", "handlebars" ], function( $, Backbone, CategoryModel, template, Handlebars ) {
	
	return Backbone.View.extend( {
		initialize: function(options) {
			this.model = options.model
          	this.render();

        },
		
		render: function() {
			var params = {
				results : this.model.get('Results'),
				address : this.model.get("Address"),
				date : this.model.get("inspectionDate"),
				name: this.model.get("akaName"),
				type: this.model.get("facilityType"),
				violations: this.model.get("Violations")		
			};
			var compiledTemplate = Handlebars.compile(template)(params);
	
  			$("#detailView").html(compiledTemplate);

            return this;

        }

    }); ddd
});