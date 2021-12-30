'use strict';

const { Model } = require('objection');

class ScheduleExecutionModel extends Model {
  static get tableName() {
    return 'schedule_executions';
  }

  static get relationMappings() {
    return {};
  }
}

module.exports = ScheduleExecutionModel;