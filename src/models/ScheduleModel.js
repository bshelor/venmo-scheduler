'use strict';

const { Model } = require('objection');

class ScheduleModel extends Model {
  static get tableName() {
    return 'schedules';
  }

  static get relationMappings() {
    return {};
  }
}

module.exports = ScheduleModel;