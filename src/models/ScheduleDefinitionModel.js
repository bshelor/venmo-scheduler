'use strict';

const { Model } = require('objection');

class ScheduleDefinitionModel extends Model {
  static get tableName() {
    return 'schedule_definitions';
  }

  static get relationMappings() {
    return {};
  }
}

module.exports = ScheduleDefinitionModel;