import Ember from "ember";


/** @class AutocompleteController
	Content array controller for autocomplete suggestions. 
**/
export default Ember.ArrayController.extend({
    //needs: ["application"],
    content: [],
    waiting: null,

    //action to clear content ( probably better way to do this without a function )
    clear: function() {
        this.set('content', []);
    }
});