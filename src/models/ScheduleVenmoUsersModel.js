'use strict';

const { Model } = require('objection');

class ScheduleVenmoUsersModel extends Model {
  static get tableName() {
    return 'schedule_venmo_users';
  }

  static get relationMappings() {
    return {};
  }

  static get idColumn() {
    return ['venmo_user_id', 'schedule_id'];
  }
}

module.exports = ScheduleVenmoUsersModel;