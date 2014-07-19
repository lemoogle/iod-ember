import IODAdapter from "../models/IODAdapter";


export default {
  name: "IODAdapter",

  initialize: function(container, application) {
    container.typeInjection('component', 'store', 'store:main');
    application.register('iod:adapter', IODAdapter, {singleton: true});
    application.inject('controller', 'iodadapter', 'iod:adapter');
  }
};