# Iod-ember

This is an [Ember.js](http://emberjs.com/)application stup that is meant to provide a simple extendable javascript query interface for public and custom [IDOL OnDemand](http://idolondemand.com) dataset.

This application was created as an experimentation with Ember and a lot of stuff is probably not done in the appropriate way. As my understanding of ember grows I will hopefully improve on this code base. 
As an example for this, all the data being loaded from idol ondemand does not use ember-data or even a Store, rather it injects a custom JSON adapter into each controller who then load data.

Any best practice advice is very welcome and do not hesitate to branch/contribute.


## Installation

This application requires ember-cli to be run and built.
For more information on using ember-cli, visit [http://iamstef.net/ember-cli/](http://iamstef.net/ember-cli/).

* `git clone` this repository
* `npm install`
* `bower install`
The bower install will create and populate the vendor directories with the various JS and CSS libraries required.


## Configuration

Edit `app/models/iodadapter.js` to set your apikey and other configuration parameters.

* Apikey : set this to your apikey . Register on http://idolondemand.com to get one

The below values have defaults that will point to the public news dataset of IDOL OnDemand but will need to be changed once you point the application to one of your public datasets.

* Apiurl : Make sure this is set to "http://api.idolondemand.com"
* Apiindex : Make sure this is set to the index you want to query. If you don't have an index yet, try news-eng
* parametric_field : Beta Feature - Currently only the category field is supported for custom indexes
* printfields : Beta Feature - The fields that will diplay in the document view

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

**Note:** no current tests.

* `ember test`
* `ember test --server`

## Building

* `ember build`
This will put the files required in dist.js

