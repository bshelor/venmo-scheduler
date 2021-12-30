'use strict';

const { Model } = require('objection');

class VenmoCredentialsModel extends Model {
  static get tableName() {
    return 'venmo_credentials';
  }

  static get relationMappings() {
    return {};
  }
}

module.exports = VenmoCredentialsModel;