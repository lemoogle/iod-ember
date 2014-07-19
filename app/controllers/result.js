import Ember from "ember";



export default Ember.ObjectController.extend({
    //sentimentvalue: null,
    needs: ["results"],

    encodedRef: function() {
        return encodeURIComponent(this.get('reference'));

    }.property('reference'),
    titleLength: function() {
        return this.get('title').length;
    }.property('title'),

    actions: {
        sentiment: function() {
            var text = this.get('summary') + " "+ this.get('title');
            var self = this;

            var data = {
                'text': text
            };
            var callback = function(data) {
                //console.log(data.entities);
                self.set('content.sentimentvalue', data);

            };

            this.get('iodadapter').call('analyzesentiment',data,callback);
            
        },

    },
    allSentimentObserver: function() {
        this.send("sentiment");
    }.observes("controllers.results.sentiment")

});