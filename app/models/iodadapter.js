import Ember from "ember";

export
default Ember.Object.extend({
    apikey: "yourapikeyhere",
    apiurl: "https://api.idolondemand.com",
    // The index we created and indexed into
    apiindex: "news_eng",

    parametric_field: "rss_category",
    // Fields we'll want to display in individual document results
    printfields: ["Category", "Author", "rss_category"],


    call: function(handler, data, callback) {
        data.apikey = this.get('apikey');
        data.indexes = this.get('apiindex');
        var apiurl = this.get('apiurl') + "/1/api/sync/" + handler + "/v1";
        return Ember.$.post(apiurl, data, callback, "json");
    },

    callhtml: function(handler, data, callback) {
        data.apikey = this.get('apikey');
        data.indexes = this.get('apiindex');
        var apiurl = this.get('apiurl') + "/1/api/sync/" + handler + "/v1";
        return Ember.$.post(apiurl, data, callback, "html");
    },

    formcall: function(handler, fd, callback) {
        fd.append('apikey', this.get('apikey'));
        return Ember.$.ajax({
            url: this.get('apiurl') + '/1/api/sync/'+handler+'/v1',
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            success: callback
        });
    }
});