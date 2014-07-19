import Ember from "ember";

/**



**/

export default Ember.ObjectController.extend({
    text: '',
    autocomplete: null,

    entitiesdefault: [{
        'type': 'places_eng',
        'display': 'Places',
        'color': 'orange',
    }, {
        'type': 'people_eng',
        'display': 'People',
        'color': 'yellow',
    }],
    actions: {
        // bound to search text field, transitions to /search/my_search_text
        query: function() {
            this.transitionToRoute('search', {
                query: this.get('text'),
            });
        },


        // clears autocomplete when link is clicked
        ac_click: function(suggestion) {
            console.log("THIS HAS BEEN CLICKED");
            this.get('autocomplete').send('clear');

            this.transitionToRoute('document', encodeURIComponent(suggestion.reference));
        },

        // Currently commented out until better implementation.
        autocomplete: function() {
            /*
            var autocomplete = this.get('autocomplete')
            autocomplete.set('content', [])
            var waiting = Math.floor(Math.random() * 100) + 1;
            this.set("autocomplete.waiting", waiting);
            var self = this
            var querytext = self.get('text');
            Ember.$.post(apiurl + '/1/api/sync/query/v1', {
                'apikey': apikey,
                'text': querytext,
                'database_match': apiindex,
                'max_results': 3,
            }, function(response) {
                if (self.get('autocomplete.waiting') != waiting) {
                    return
                }


                $(response.documents).each(function() {
                    autocomplete.pushObject({
                        'title': highlight(this.title, querytext.trim()),
                        'reference': this.reference
                    })
                })
                console.log(response)

            }, 'json');

*/
            // this.get("autocomplete").send('autocomplete')
        }
    },


});
