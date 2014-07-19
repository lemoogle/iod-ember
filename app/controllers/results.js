import Ember from "ember";

import Result from "../models/result";

export default Ember.ArrayController.extend({
    content: [],
    username: '',
    waiting: 0,
    needs: ["application"],
    entities: [],
    sentiment: false,
    itemController: 'result',
    actions: {
        loadentities: function(e) {
            //   //console.log(this.get("entities"))
            //if (!(e.type  in this.get("entities"))){ 
            var entities = this.get("entities");
            if (!(e.type in this.get("entities"))) {
                entities.pushObject(e.type);
            }
            //this.set("entities",entities.toArray)


        },
        sentimentAll: function() {
            this.set("sentiment", true);
        },
    },
    loadResults: function(search) {
        var me = this;

        //ar search = App.SearchController.get('query');
        var waiting = Math.floor(Math.random() * 100) + 1;
        this.set("waiting", waiting);

        //console.log("RESULTS")
        var entitiesdefault = this.get("controllers.application.entitiesdefault");
        //var api = "f272e588-7808-4fbf-a5e3-0c67d3c70eb2"
        //App.RecentUsersController.addUser(search);
        //console.log("posting");
        me.set('content', []);
        var data={
            'text': search.text,
            'field_text': search.facets,
            'summary': 'quick',
                'print':'all'};

        var callback= function(response) {

            var doc;
            if (me.get('waiting') !== waiting) {
                return;
            }
            for (var i = 0; i < response.documents.length; i++) {
                doc = response.documents[i];
                doc["data"] = doc["content"];
                doc["entitiesdefault"] = entitiesdefault;
                if (!(doc["summary"])) {
                    if (doc["content"]){
                            if (doc["content"]["DESCRIPTION"]){
                                doc["summary"] = doc["content"]["DESCRIPTION"];
                            }
                            else{
                               doc["summary"] = doc["content"]["DESCRIPTION"];

                            }

                            doc["summary"]= htmlDecode(htmlDecode(doc["summary"]));
                    }
                    else {
                        doc["summary"]="";
                    }
                }       
                //doc["text"] = htmlDecode(htmlDecode(doc["content"]["DESCRIPTION"]))
                delete doc["content"];

                me.pushObject(Result.create(doc));
            }
        };
            //console.log(search);
        this.get('iodadapter').call('querytextindex',data,callback);



    }

});