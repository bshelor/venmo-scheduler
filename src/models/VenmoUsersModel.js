'use strict';

const { Model } = require('objection');

class VenmoUsersModel extends Model {
  static get tableName() {
    return 'venmo_users';
  }

  static get relationMappings() {
    return {};
  }
}

module.exports = VenmoUsersModel;