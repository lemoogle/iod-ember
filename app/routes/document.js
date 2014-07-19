import Ember from "ember";



/**
	Document route, used for individual document view
**/

var DocumentRoute = Ember.Route.extend({



    setupController: function(controller, model) {

    	// should set 'model'? 
        controller.set('reference', decodeURIComponent(model.reference));
        controller.loadData();
    }
});



export default DocumentRoute;