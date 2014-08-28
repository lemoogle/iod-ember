import Ember from 'ember';


var Router = Ember.Router.extend({
  location: IodEmberENV.locationType
});

Router.map(function() {
  
    this.route('document', {
        'path': 'document/:reference'
    });

    this.resource('search', {
        'path': 'search/:query',

    });

    
});

export default Router;
