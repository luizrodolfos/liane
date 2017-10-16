// Initializes the `people` service on path `/people`
const createService = require('feathers-sequelize');
const createModel = require('./model');
const hooks = require('./hooks');
const filters = require('./filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'people',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/people', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('people');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};