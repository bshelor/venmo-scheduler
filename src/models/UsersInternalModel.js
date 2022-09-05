'use strict';

const { Model } = require('objection');

class UsersInternalModel extends Model {
  static get tableName() {
    return 'users_internal';
  }

  static get relationMappings() {
    return {};
  }
}

module.exports = UsersInternalModel;