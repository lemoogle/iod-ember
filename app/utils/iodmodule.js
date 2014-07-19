import Ember from 'ember';

/* jshint node: true */

export default Ember.Object.extend({
 	name:"hello",
	printname: function() {

		console.log(this.name);

	}

});
