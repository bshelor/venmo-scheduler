'use strict';

const { Model } = require('objection');

class ScheduleExecutionModel extends Model {
  static get tableName() {
    return 'schedule_executions';
  }

  static get relationMappings() {
    return {};
  }

  static get status() {
    return {
      SUCCESS: 'Succeeded',
      ERROR: 'Failed',
      RUNNING: 'Running'
    };
  }
}

module.exports = ScheduleExecutionModel;