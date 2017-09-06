'use-strict';

const _ = require('lodash');

const migrations = {
  'AWS::ApiGateway::Resource': 'API',
  'AWS::ApiGateway::RestApi': 'API',
  'AWS::Lambda::Version': 'Versions',
  'AWS::Lambda::Permission': 'Permissions'
};

module.exports = function migrateResources() {
  _.each(this.resourcesById, (resource, logicalId) => {
    if (resource.Type in migrations) {
      const destination = migrations[resource.Type];
      this.migrate(logicalId, destination);
    }
  });
};
