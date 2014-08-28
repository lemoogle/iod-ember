import Ember from "ember";


/**
    Search Route

**/
var SearchRoute = Ember.Route.extend({

    // creates and injects search dependant controllers and injects them into the route's searchcontroller.
    setupController: function(controller, model) {

        controller.set("controllers.application.text", model.query);

        //console.log(model)
       // controller.set('page',parseInt(model.page));
        var results = this.controllerFor('results');
        var clusters = this.controllerFor('clusters');
        var facets = this.controllerFor('facets');

        var recentsearches = this.controllerFor('recentsearches');
        controller.set('results', results);
        controller.set('clusters', clusters);
        controller.set('facets', facets);

        controller.set('recentsearches', recentsearches);
        //console.log(recentsearches);
        controller.send('search');
        
    },



});


export default SearchRoute;