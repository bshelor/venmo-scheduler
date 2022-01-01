'use strict';

const { Model } = require('objection');

class VenmoFriendsModel extends Model {
  static get tableName() {
    return 'venmo_users';
  }

  static get relationMappings() {
    return {};
  }
}

module.exports = VenmoFriendsModel;