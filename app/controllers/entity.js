import Ember from "ember";



export
default Ember.ObjectController.extend({
    needs: ["results"],
    actions: {

        entity: function() {
            //text = this.get('text') + this.get('title')
            //item.extract(text);
            var result = this.get("parentController");
            var text = result.get('summary') + " " + result.get('title');
            var self = this;


            var data = {
                'text': text,
                'entity_type': self.get('type')
            };

            var callback = function(response) {
                var results = [];
                for (var i = 0; i < response["entities"].length; i++) {
                    results.push(response["entities"][i].normalized_text);
                }
                if (response["entities"].length === 0) {
                    self.set("returnedEntities", "No entities found");
                    return;
                }
                self.set("returnedEntities", results.join(", "));

                //  self.returnedEntities = results.join(", ");
                //extractedentities.pushObject(entity);

            };

            this.get('iodadapter').call('extractentities',data,callback);
        }
    },

    allEntityObserver: function() {
        this.send("entity");
        // this.entity();
    }.observes("controllers.results.entities.length")
});