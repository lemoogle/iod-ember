import Ember from "ember";
import Entity from "../models/entity";
import EntitiesController from "../controllers/entities";

export default Ember.Object.extend({
    sentimentvalue: null,
    extractedentities: null,
    entitiesdefault: null,
    init: function() {
        //console.log(this.get('controller'))
        var ap = EntitiesController.create({
            "content": []
        });
        ap.pushObjects(this.get("entitiesdefault").slice().map(function(obj) {
            return Entity.create().setProperties(obj);
        }));

        this.set("extractedentities", ap);



    }

});
