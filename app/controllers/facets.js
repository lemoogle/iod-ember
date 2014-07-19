import Ember from "ember";


export default Ember.ArrayController.extend({
    content: [],
    waiting: 0,

    loadFacets: function(search) {
        var me = this;
        //var search = App.SearchController.get('query');
        //App.RecentUsersController.addUser(search);
        me.set('content', []);
        var waiting = Math.floor(Math.random() * 100) + 1;
        this.set("waiting", waiting);

        var callback= function(data) {
            if (me.get('waiting') !== waiting) {
                return;
            }


            var values=data[me.get('iodadapter.parametric_field').toUpperCase()];
            for (var key in values){
                me.pushObject({'value':key,'count':values[key]});
            }
            //console.log(me)
        };


        var data=
            {'text': search.text,
            'field_text': search.facets,
            'field_name': this.get('iodadapter.parametric_field'),
            'sort':'document_count',
            };

        this.get('iodadapter').call('getparametricvalues',data,callback);

/*
        Ember.$.post(CONFIG.apiurl + "/1/api/sync/getparametricvalues/v1", {
            'apikey': CONFIG.apikey,
            'text': search.text,
            'field_text': search.facets,
            'indexes': CONFIG.apiindex,
            'sort':'document_count',
            'field_name': CONFIG.parametric_field,
        }, function(data) {
            if (me.get('waiting') !== waiting) {
                return;
            }
        var values=data[CONFIG.parametric_field.toUpperCase()];
        for (var key in values){
            console.log("PUSHING KEY");
            me.pushObject({'value':key,'count':values[key]});
        }
            //console.log(me)
        }, "json");


    */
    }
});

