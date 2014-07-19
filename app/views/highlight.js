import Ember from "ember";
 
export default Ember.TextField.extend({


    insertNewline: function() {
        var controller = this.get('targetObject');
        controller.send('highlight');

    }
});