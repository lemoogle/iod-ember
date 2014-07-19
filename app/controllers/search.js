import Ember from "ember";

/**
    @class SearchController

    contains the 3 controllers required for the search, results, clusters and facets.
    propagates search command to the others
**/
export
default Ember.ObjectController.extend({
    results: null,
    clusters: null,
    facets: null,
    recentsearches: null,
    currentfacet: "",
    needs: "application",

    actions: {

        clustersearch: function(e) {
            var query = this.get('controllers.application.text') + " AND " + '"' + e + '"';
            this.transitionToRoute('search', {
                query: query,
            });
        },
        search: function(obj) {

            console.log(obj);
            //if (obj) 
            //   {console.log(obj.facet)}
            var facets = obj && obj.facet || "";

            var query = {
                'text': this.get('controllers.application.text'),
                'facets': facets
            };
            this.get('recentsearches').addSearch(query.text);

            this.get('results').loadResults(query); 
            this.get('clusters').loadClusters(query);
            this.get('facets').loadFacets(query);
        },

        facetsearch: function(e) {
            var facet;
            if (e === "reset") {
                facet = "";
            } else {
                facet = "MATCH{" + e + "}:" + this.get('iodadapter.parametric_field');
            }
            this.send('search', {
                'facet': facet
            });
        }
    }
});