import Ember from "ember";

/**
    @class DocumentController
    
    Controller for the individual document view.
    a lot of terrible code in there, needs to be cleaned up and engineered better.

    Holds jquery objects as well as pure text for highlighting using jquery highlighting as an alternative to IOD highlighting.
**/
export
default Ember.ObjectController.extend({
    reference: null,
    content: null,
    cleancontent: '',
    o_cleancontent: '',
    o_content: '',
    jquery_content: '',
    similardocs:[],
    sentimentvalue: null,
    entities: [],
    needs: ['application'],

    // check if Reference is a link currently escaped due to iframe view needing to be reengineered.
    islink: function() {
        return false;
        //return (this.get('reference').indexOf("http://") !== -1) || (this.get('reference').indexOf("https://") !== -1);
    }.property(),


    // returns html content for view.
    content_html: function() {
        var data = this.get('content');
        if (!data) {
            return "";
        }
        return (this.get('jquery_content').html());
    }.property('jquery_content'),

    // returns formatted custom fields and values for view
    customfields: function() {
        var fields = [];
        var data = this.get('content');
        if (!data) {
            return [];
        }
        var printfields = this.get('iodadapter.printfields');
        for (var i = 0; i < printfields.length; i++) {
            var fieldname = printfields[i];
            var fieldval = data[fieldname.toLowerCase()];
            if (fieldval) {
                fields.push({
                    'name': fieldname,
                    'value': fieldval
                });
            }
        }

        return fields;

    }.property('content'),

    // actions are called from the view.
    actions: {
        // highlights in the content using IOD highlighting.
        // we pass it the plain text html of what we're displaying.
        // limitations when words to highlight present in the markup
        highlight: function() {
            var self = this;

            var jquery_content = self.get('jquery_content');
            var fd = new FormData();

            fd.append('text', jquery_content.html());
            fd.append('highlight_expression', this.get('highlighttext'));
            fd.append('start_Tag', '<span class="highlight">');

            // sets the new html as content
            var callback = function(response) {
                var doc = jquery_content.clone();

                doc.html(response["text"]);
                self.set('jquery_content', doc);
            };

            this.get('iodadapter').formcall('highlighttext', fd, callback);

        },

        // extracts entities and highlights using IOD highlighting
        // @TODO, use highlight function with parameter for entity type rather than duplicate code.
        entity: function(entity) {
            // result = this.get("parentController");
            var self = this;

            var fd = new FormData();
            fd.append('text', self.get('content.content'));
            fd.append('entity_type', entity.type);


            var callback = function(response) {
                var doc = self.get('jquery_content').clone();
                self.get('entities').pushObjects(response["entities"]);
                var entitytext = [];
                for (var i = 0; i < response["entities"].length; i++) {

                    entitytext.push('"' + response["entities"][i].normalized_text + '"');

                }
                //var self=self
                if (entitytext.length > 0) {
                    console.log(entitytext.length);

                    var callback = function(response) {
                        //doc = self.get('content').clone();

                        doc.html(response["text"]);
                        self.set('jquery_content', doc);

                    };
                    var fd = new FormData();
                    fd.append('text', doc.html());
                    fd.append('highlight_expression', entitytext.join());
                    fd.append('start_Tag', '<span class="highlight ' + entity.type + '">');

                    self.get('iodadapter').formcall('highlighttext', fd, callback);


                }
            };

            this.get('iodadapter').formcall('extractentities', fd, callback);

        },
        /*
    entitygood: function(entity) {
        // result = this.get("parentController");
        var self = this;
        Ember.$.post(apiurl + "/1/api/sync/extractentities/v1", {
            'apikey': apikey,
            'text': this.get('content').html(),
            'entity_type': entity.type,
        }, function(response) {
            var results = [];
            console.log(response);
            doc = self.get('jquery_content').clone();
            self.get('entities').pushObjects(response["entities"]);

            for (var i = 0; i < response["entities"].length; i++) {
 

                doc = doc.highlight(response["entities"][i].normalized_text, {
                    'elemnent': 'span',
                    'className': "highlight " + entity.type
                });

            }
            console.log("hello");
            console.log(self.get('entities'));
            self.set('jquery_content',doc);

            //self.set("returnedEntities", results.join(", "))

            //  self.returnedEntities = results.join(", ");
            //extractedentities.pushObject(entity);

        }, "json");
    },
    */

        // Same as entity extraction but does sentiment analysis.
        // Users jquery highlighting instead of IOD highlighting.
        sentiment: function() {
            //text = this.get('content');
            var self = this;

            var jquery_content = self.get('jquery_content');
            var fd = new FormData();
            fd.append('text', self.get('content.content'));
            var callback = function(data) {

                self.set('sentimentvalue', data);

                var doc = jquery_content.clone();
                Ember.$(data.positive).each(function() {
                    doc = doc.highlight(this.original_text, {
                        'elenment': 'span',
                        'className': "highlight positive"
                    });

                    //  self.set('content', highlight(self.get('content'), this.original_text, false, 'mark', 'style="background-color:green;"'))
                });
                Ember.$(data.negative).each(function() {
                    doc = doc.highlight(this.original_text, {
                        'elenment': 'span',
                        'className': "highlight negative"
                    });
                    //self.set('content', highlight(self.get('content'), this.original_text, false, 'mark', 'style="background-color:red;"'))
                });
                self.set('jquery_content', doc);
            };

            this.get('iodadapter').formcall('analyzesentiment', fd, callback);



            // this.set('content', highlight(this.get('content'), "b"))
        },

    },
    // Loads data using print all for now. 
    loadData: function() {
        var self = this;

        var data, callback;
        if (!this.get('islink')) {
            //this.set('content', "OTHER")

            data = {
                'index_reference': unescape(this.get('reference')),
                'print': 'all'
            };
            callback = function(response) {
                var content = Ember.$('<div></div>');
                var data = response["documents"][0];

                if (data["content"].length < 3) {
                    data["content"] = data["title"];
                }
                self.set('content', data);

                var html = data["htmlcontent"] || data["content"];
                self.set('jquery_content', content.append(html));

                /* WITH HTML CONTENT STUFF
                // this is if there is a fied 
                content.append(response["documents"][0]["htmlcontent"])
                self.set('cleancontent',response["documents"][0]["content"])
                self.set('o_cleancontent',response["documents"][0]["content"])
                self.set('content',content)
                self.set('o_content',content)
                self.set('data',response["documents"][0])
                */
            };

            this.get('iodadapter').call('getcontent', data, callback);

            data = {
                'index_reference': unescape(this.get('reference')),
               // 'print': 'all',
                'summary':'quick',
            };
            callback = function(response) {

                
                var similardocs=[];
                similardocs=response["documents"];
                self.set('similardocs', similardocs);
                self.propertyDidChange('similardocs');
                /* WITH HTML CONTENT STUFF
                // this is if there is a fied 
                content.append(response["documents"][0]["htmlcontent"])
                self.set('cleancontent',response["documents"][0]["content"])
                self.set('o_cleancontent',response["documents"][0]["content"])
                self.set('content',content)
                self.set('o_content',content)
                self.set('data',response["documents"][0])
                */
            };

            this.get('iodadapter').call('findsimilar', data, callback);

        } else {
            // this else case if for the iframe stuff but this will be reengineered. 
            //CSS was injected for highlight tags, not the best way at all
            callback = function(response) {
                var content = Ember.$('<html/>').html(response);
                console.log(content);

                Ember.$.when(Ember.$.get("css/highlight.css"))
                    .done(function(response) {
                        console.log("DONE");
                        Ember.$('<style />').text(response).appendTo(content);
                        self.set('content', content);

                        //a=$('div').html(response);
                        //content.append(a);
                    });

                // testcontent=response;
            };

            data = {
                'url': decodeURIComponent(this.get('reference'))
            };

            this.get('iodadapter').callhtml('view', data, callback);
        }

    },

    /*
    sentimentgood   : function() {

        //text = this.get('content');
        var self = this;
        console.log(self.get('content').html());



        Ember.$.post(apiurl + '/1/api/sync/analyzesentiment/v1', {'apikey':apikey,'text':self.get('content').html()}, function(data) {
            
            self.set('sentimentvalue', data);

            doc = self.get('content').clone();
            console.log(data);
            $(data.positive).each(function() {
                doc = doc.highlight(this.original_text, {
                    'elenment': 'span',
                    'className': "highlight positive"
                });

                //  self.set('content', highlight(self.get('content'), this.original_text, false, 'mark', 'style="background-color:green;"'))
            });
            $(data.negative).each(function() {
                doc = doc.highlight(this.original_text, {
                    'elenment': 'span',
                    'className': "highlight negative"
                });
                //self.set('content', highlight(self.get('content'), this.original_text, false, 'mark', 'style="background-color:red;"'))
            });
            self.set('content',doc);
            //  self.set('content.sentimentvalue', data);
            
        }, 'json');
        
        // this.set('content', highlight(this.get('content'), "b"))
    }
    */
});