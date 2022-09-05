'use strict';

const { Model } = require('objection');

class TransactionUsersModel extends Model {
  static get tableName() {
    return 'transaction_users';
  }

  static get relationMappings() {
    return {};
  }

  static get idColumn() {
    return ['venmo_users_id', 'schedule_definition_id'];
  }
}

module.exports = TransactionUsersModel;