import Ember from "ember";


export default Ember.TextField.extend({

    // classNames: ["form-control"],
    waiting: 0,


    keyUp: function(e) {
        if ([32].contains(e.keyCode)) {

            this.get('targetObject').send('autocomplete');
            this.set("waiting", 0);

        } else {

            var self = this;
            var waiting = Math.floor(Math.random() * 100) + 1;
            this.set("waiting", waiting);
            setTimeout(function() {
                self.acWait(waiting);
            }, 1000);

            this.set('targetObject.autocomplete.content', []);
        }
    },

    acWait: function(waiting) {
        if (this.get('waiting') === waiting) {
            this.get('targetObject').send('autocomplete');
        }
    },

    insertNewline: function() {
        this.set("waiting", 0);
        var controller = this.get('targetObject');
        controller.send('query');

    }
});
