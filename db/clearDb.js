'use strict';

require('./initializeDb');
const logger = require('../src/api/helpers/logger');

const SchedulesModel = require('../src/models/SchedulesModel');
const ScheduleDefinitionModel = require('../src/models/ScheduleDefinitionModel');
const TransactionUsersModel = require('../src/models/TransactionUsersModel');
const UsersInternalModel = require('../src/models/UsersInternalModel');
const VenmoUsersModel = require('../src/models/VenmoUsersModel');
const VenmoAccountsModel = require('../src/models/VenmoAccountsModel');

const Models = [
  TransactionUsersModel, SchedulesModel, ScheduleDefinitionModel, VenmoAccountsModel, VenmoUsersModel, UsersInternalModel
]

async function clearDb() {
  for (let i = 0; i < Models.length; i++) {
    const model = Models[i];
    await model.query().delete();
  }
}

/**
 * Never use this on prod after the app/db is up and running
 */
async function main() {
  logger.info('Deleting all data from database!');
  await clearDb();
}

main()
  .then((res) => {
    logger.info('Cleared all data from database');
    process.exit(0);
  })
  .catch((err) => {
    logger.error(err);
    process.exit(1);
  });