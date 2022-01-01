'use strict';

const { Model } = require('objection');

class VenmoCredentialsModel extends Model {
  static get tableName() {
    return 'venmo_accounts';
  }

  static get relationMappings() {
    return {};
  }
}

module.exports = VenmoCredentialsModel;