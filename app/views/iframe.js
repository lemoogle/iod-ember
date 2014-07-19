import Ember from "ember";
 
export default Ember.View.extend({
    tagName: "iframe",
    sandbox: "allow-same-origin",
    attributeBindings: ['style', 'srcdoc', 'sandbox'],
    style: "width:100%; height:100%",
    srcdoc: function() {
        //        console.log(this)
        //       console.log(this.get('controller'))
        return this.get('controller.content').html();
        //return "data:text/html;charset=utf-8," + escape(this.get('controller.content').html());
    }.property('controller.content'),
    highlightSentiment: function() {
        //test=this
        console.log("SENTIMENT");
        var iframebody;
        iframebody = this.$().contents().find('body');
        Ember.$(this.get('controller.sentimentvalue.positive')).each(function() {
            iframebody.highlight(this.original_text, {
                'element': 'span',
                'className': "highlight positive"
            });

            //  self.set('content', highlight(self.get('content'), this.original_text, false, 'mark', 'style="background-color:green;"'))
        });
        Ember.$(this.get('controller.sentimentvalue.negative')).each(function() {
            iframebody.highlight(this.original_text, {
                'element': 'span',
                'className': "highlight negative"
            });
            //self.set('content', highlight(self.get('content'), this.original_text, false, 'mark', 'style="background-color:red;"'))
        });

        //console.log(this.$('body'))
        //console.log("I AM DOING STUFF")
    }.observes('controller.sentimentvalue'),
    highlightEntities: function() {
        //test=this
        var iframebody;
        console.log("Entities");
        iframebody = this.$().contents().find('body');


        var entities = this.get('controller.entities');
        Ember.$(entities).each(function() {
            iframebody.highlight(this.original_text, {
                'element': 'span',
                'className': "highlight " + this.type
            });

        });
        //console.log(this.$('body'))
        //console.log("I AM DOING STUFF")
    }.observes('controller.entities.length')


});