// Category View
// =============

// Includes file dependencies
define([ "jquery", "backbone","models/InspectionModel","text!views/templates/row.html", "handlebars", "views/DetailView", "routers/mobileRouter" ], function( $, Backbone, CategoryModel, template, Handlebars, DetailView, router ) {

    // Extends Backbone.View
    return Backbone.View.extend( {
	
	tagName: "li",
	
	events: {
		"click [data-node-name=detailLink]" : "showDetail"
	},
	

    initialize: function(options) {
		this.model = options.model
		this.render();
    },

	showDetail: function(){
		$.mobile.changePage( "#detail" , { reverse: false, changeHash: true} );
	 	var dv = new DetailView({model: this.model});
		dv.render();
	},
	
	render: function() {
	$(this.el).addClass("ui-li ui-li-static ui-btn-up-c ui-corner-top");
	var results = this.model.get("Results");
		
		if(results === "Pass" ||  results === "Pass w/ Conditions"){
			$(this.el).addClass("pass");
			
		} else if(results === "Fail") {
			$(this.el).addClass("fail");
			
		} else {
			
		}
	var params = {
		results : this.model.get('Results'),
		address : this.model.get("Address"),
		date : this.model.get("inspectionDate"),
		name: this.model.get("akaName")
	};
	var compiledTemplate = Handlebars.compile(template)(params);
	
    this.$el.html(compiledTemplate);
	
            // Sets the view's template property
	


			//	$(this.el).append(compiledTemplate)
				//$(this.el).html(compiledTemplate);
            // Maintains chainability
            return this;

        }

    } );



} );