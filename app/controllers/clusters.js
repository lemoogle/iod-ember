import Ember from "ember";

/** Array controller for the clusters returned from the find releated concepts api on each individual search

    @class ClustersController



    @TODO 
**/

export
default Ember.ArrayController.extend({
    content: [],
    waiting: 0,


    // This class is the only one which puts the callback in a separate callbacks attribute rather
    // than in the function that calls IOD. 
    // drawback to this is that scope variables need to be passed and hence another function that matches
    // jquery callback needs to be returned
    callbacks: {

        // handles the returned clusters from the find related concepts API
        load: function(self,waiting) {
            //returns another function for jquery callback
            return function(response) {
                // hacky way to handle multiple clicks. 
                if (self.get('waiting') !== waiting) {
                    return;
                }

                var clusters = {};
                // for every entity, group them in clusters.

                for (var i = 0; i < response.entities.length; i++) {
                    var el = response.entities[i];
                    //console.log(el);
                    cluster = clusters[el.cluster];
                    if (el.cluster >= 0) {
                        if (cluster) {
                            cluster.totaldocs += el.docs_with_phrase;
                            cluster.docs.push(el);
                        } else {
                            clusters[el.cluster] = {
                                totaldocs: el.docs_with_phrase,
                                docs: [el]
                            };
                        }
                    }
                }

                var sortableclusters = [];

                var sortfunction = function(a, b) {
                    return b.docs_with_phrase - a.docs_with_phrase;
                };

                // sort the entities in each cluster and limit to 5 results
                // @TODO make cluster limit configurable
                for (var clusterid in clusters) {
                    var cluster = clusters[clusterid];
                    cluster.docs = cluster.docs.sort(sortfunction).slice(0, 5);
                    sortableclusters.push(cluster);
                }

                // sort the list of clusters
                sortableclusters = sortableclusters.sort(function(a, b) {
                    return b.totaldocs - a.totaldocs;
                });

                // add object to concent
                for (i = 0; i < sortableclusters.length; i++) {
                    self.pushObject(sortableclusters[i]);
                }

            };
        }

    },

    // function that gets called when a search is ran
    // calls find related concept with iodadapter.

    loadClusters: function(search) {
        var self = this;
        self.set('content', []);
        var waiting = Math.floor(Math.random() * 100) + 1;
        this.set("waiting", waiting);
        var params = {
            'text': search.text,
            'field_text': search.facets,
            'sample_size': 1000,
        };
        this.get('iodadapter').call('findrelatedconcepts', params, this.get('callbacks.load')(self,waiting));


    }

});