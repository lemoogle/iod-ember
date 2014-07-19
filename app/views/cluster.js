import Ember from "ember";
 
export default Ember.View.extend({
    tagName: "li",

    pos: function() {
        return "asasda";
    }.property('contentIndex'),

    templateName: "cluster"
});
