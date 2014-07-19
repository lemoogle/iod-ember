import Ember from "ember";
 
export default Ember.View.extend({
    templateName: "result",

    pos: function() {
        return this.get('contentIndex') + 1;
    }.property('contentIndex'),


});
