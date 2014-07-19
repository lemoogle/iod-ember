TODO


* look into initializers for what i'm currently doing in routes for the controller injection.

* Controllers hold too many individual attributes? should hold Objects/Models that combine these?
	* Fix the fact that application controller contains the search text but search controller contains the facets etc.
	* This was done like this due to the fact that the search box is bound to the search text value in application controller, searchcontroller doesn't exist on non search routes? should it? Think about injecting search controller into application controller
	* Transform search into a search adapter that handles that logic and returns a search object?

* search result, each result observes the results controller to run things like sentiment or entity, probably shouldnt be done like this.

* currently disabled is implementation of a feature which displays content as HTML using a non-index field that contains unparsed HTML. Dependent on data so future feature. You would have in your data a field called "content" with the clean text used for weights, and maybe a field called "content_html" for the html.

##Controllers

**Application controller**

* Fix autocompletion and make the autocompletion field configurable

**Document Controller **

*  use highlight function with parameter for entity type rather than duplicate code.

