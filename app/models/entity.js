import Ember from "ember";

/**
    Entity model, probably needs to be reengineered.
**/

export default Ember.Object.extend({
/*
    extract: function(text) {

        var self = this;


        Ember.$.post(apiurl + "/1/api/sync/extractentities/v1", {
            'apikey': apikey,
            'text': text,
            'entity_type': self.type,
        }, function(response) {
            var results = [];
            for (var i = 0; i < response["entities"].length; i++) {
                results.push(response["entities"][i].normalized_text);
            }
            self.returnedEntities = results.join(", ");
            //console.log(self)
            //extractedentities.pushObject(entity);

        }, "json");
    }
    */
});
