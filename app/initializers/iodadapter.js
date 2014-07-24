import IODAdapter from "../models/iodadapter";


export default {
  name: "iodadapter",

  initialize: function(container, application) {
    container.typeInjection('component', 'store', 'store:main');
    application.register('iod:adapter', IODAdapter, {singleton: true});
    application.inject('controller', 'iodadapter', 'iod:adapter');
  }
};