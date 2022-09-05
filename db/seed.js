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

async function seed() {
  let insertObj = {
    username: 'bshelor',
    email: 'bshelor24@gmail.com',
    phone: '3176399465'
  };
  const user = await UsersInternalModel.query().insert(insertObj).returning('id');

  insertObj = {
    user_id: user.id,
    username: 'bshelor',
    password: 'testPassword',
    access_token: 'testAccessToken',
    active: true,
    external_id: 'THKCH23',
    email: 'bshelor24@gmail.com',
    phone: '3176399465'
  };
  await VenmoAccountsModel.query().insert(insertObj);

  insertObj = {
    username: 'nwilloughby',
    external_id: user.id
  };
  const venmoUserOne = await VenmoUsersModel.query().insert(insertObj);
  insertObj.username = 'cshelor';
  const venmoUserTwo = await VenmoUsersModel.query().insert(insertObj);

  insertObj = {
    user_id: user.id,
    type: 'payment',
    recurrence: 'monthly',
    amount: 36.00,
    description: 'Housing {{month}} thx for letting me live here',
    dynamic_text: ['month'],
    first_execution_timestamp: '2022-02-05',
    final_execution_timestamp: '2022-04-05',
  };
  const scheduleDefOne = await ScheduleDefinitionModel.query().insert(insertObj).returning('id');

  await TransactionUsersModel.query().insert({ venmo_users_id: venmoUserOne.id, schedule_definition_id: scheduleDefOne.id });
  await TransactionUsersModel.query().insert({ venmo_users_id: venmoUserTwo.id, schedule_definition_id: scheduleDefOne.id });

  insertObj = {
    schedule_definition_id: scheduleDefOne.id,
    execution_timestamp: '2021-02-05',
    status: SchedulesModel.statuses.SUCCESS,
    executed_at: '2022-02-05T01:00:00Z',
    details: {
      message: 'Payment sent successfully'
    }
  };

  await SchedulesModel.query().insert(insertObj);
  insertObj.execution_timestamp = '2021-03-05';
  insertObj.executed_at = '2021-03-05T01:00:00Z';
  await SchedulesModel.query().insert(insertObj);
  insertObj.execution_timestamp = '2021-04-05';
  insertObj.executed_at = null;
  insertObj.status = SchedulesModel.statuses.QUEUED;
  insertObj.details = null;
  await SchedulesModel.query().insert(insertObj);
  

  // schedule definition 2
  insertObj = {
    user_id: user.id,
    type: 'request',
    recurrence: 'yearly',
    amount: 42.00,
    description: 'Random recurring generosity',
    first_execution_timestamp: '2022-01-01',
    final_execution_timestamp: '2023-01-01',
  };
  const scheduleDefTwo = await ScheduleDefinitionModel.query().insert(insertObj).returning('id');

  await TransactionUsersModel.query().insert({ venmo_users_id: venmoUserOne.id, schedule_definition_id: scheduleDefTwo.id });

  insertObj = {
    schedule_definition_id: scheduleDefTwo.id,
    execution_timestamp: '2022-01-01',
    status: SchedulesModel.statuses.SUCCESS,
    executed_at: '2022-01-01T01:00:00Z',
    details: {
      message: 'Requested payment successfully'
    }
  };
  await SchedulesModel.query().insert(insertObj);
  insertObj.execution_timestamp = '2023-01-01';
  insertObj.executed_at = '2023-01-01T01:00:00Z';
  insertObj.executed_at = null;
  insertObj.status = SchedulesModel.statuses.QUEUED;
  insertObj.details = null;
  await SchedulesModel.query().insert(insertObj);
}

async function clearDb() {
  for (let i = 0; i < Models.length; i++) {
    const model = Models[i];
    await model.query().delete();
  }
}

async function main() {
  try {
    await seed();
  } catch (err) {
    logger.error('Error occurred while seeding...clearing any created data before exiting');
    await clearDb();
    throw err;
  }
}

main()
  .then((res) => {
    logger.info('Seeded small amount of demo data into database.');
    process.exit(0);
  })
  .catch((err) => {
    logger.error(err);
    process.exit(1);
  });
