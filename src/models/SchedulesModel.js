'use strict';

const { Model } = require('objection');

class SchedulesModel extends Model {
  static get tableName() {
    return 'schedules';
  }

  static get relationMappings() {
    return {};
  }

  static get statuses() {
    return {
      SUCCESS: 'Succeeded',
      ERROR: 'Failed',
      RUNNING: 'Running',
      QUEUED: 'Queued'
    };
  }
}

module.exports = SchedulesModel;