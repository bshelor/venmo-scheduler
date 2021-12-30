'use strict';

const { Model } = require('objection');

class UserModel extends Model {
  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    return {};
  }
}

module.exports = UserModel;