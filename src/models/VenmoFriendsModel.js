'use strict';

const { Model } = require('objection');

class VenmoFriendsModel extends Model {
  static get tableName() {
    return 'venmo_friends';
  }

  static get relationMappings() {
    return {};
  }
}

module.exports = VenmoFriendsModel;