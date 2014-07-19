import Ember from "ember";

/**
	Application route

	initializes autocomplete controller
	
**/

var ApplicationRoute = Ember.Route.extend({

    setupController: function(controller) {
        var autocompleteController = this.controllerFor('autocomplete');
        controller.set('autocomplete', autocompleteController);

    }
});


export default ApplicationRoute;