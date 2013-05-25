define([ "jquery","backbone","models/InspectionModel" ], function( $, Backbone, InspectionModel ) {
	
	return Backbone.Collection.extend( {
		model: InspectionModel
    });
});