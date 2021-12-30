'use strict';

const { Model } = require('objection');

class VenmoAccountInfoModel extends Model {
  static get tableName() {
    return 'venmo_account_info';
  }

  static get relationMappings() {
    return {};
  }
}

module.exports = VenmoAccountInfoModel;