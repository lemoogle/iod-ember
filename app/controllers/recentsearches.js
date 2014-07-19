import Ember from "ember";

/** 
    RecentSearchesController
    
**/

export default Ember.ArrayController.extend({
    content: [],
    needs: ["application"],

    // called on new search. Replaces if already searched.
    addSearch: function(search) {
        search = search.toString().trim();
        if (this.contains(search)) {
            this.removeObject(search);
        }
        this.pushObject(search);
    },


    actions: {
        // Called on clicking of recent search. transitions to search route for that specific search
        searchAgain: function(recentsearch) {

            this.transitionToRoute('search', {
                query: recentsearch,
            });

        }
    },
    // reverse used for recent ordering.
    reverse: function() {
        return this.toArray().reverse();
    }.property('@each')
});
