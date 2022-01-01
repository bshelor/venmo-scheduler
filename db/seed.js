'use strict';

require('./initializeDb');
const logger = require('../src/api/helpers/logger');

const ScheduleExecutionModel = require('../src/models/ScheduleExecutionModel');
const ScheduleModel = require('../src/models/ScheduleModel');
const ScheduleVenmoUsersModel = require('../src/models/ScheduleVenmoUsersModel');
const UserModel = require('../src/models/UserModel');
const VenmoUsersModel = require('../src/models/VenmoUsersModel');
const VenmoAccountsModel = require('../src/models/VenmoAccountsModel');

async function main() {
  let insertObj = {
    username: 'bshelor',
    email: 'bshelor24@gmail.com',
    phone: '3176399465'
  };
  const user = await UserModel.query().insert(insertObj).returning('id');

  insertObj = {
    user_id: user.id,
    username: 'bshelor',
    password: 'testPassword',
    access_token: 'testAccessToken',
    active: true,
    external_account_id: 'THKCH23',
    email: 'bshelor24@gmail.com',
    phone: '3176399465'
  };
  await VenmoAccountsModel.query().insert(insertObj);

  insertObj = {
    user_id: user.id,
    username: 'nwilloughby'
  };
  const venmoUserOne = await VenmoUsersModel.query().insert(insertObj).returning('id');
  insertObj.username = 'cshelor';
  const venmoUserTwo = await VenmoUsersModel.query().insert(insertObj).returning('id');

  insertObj = {
    user_id: user.id,
    type: 'payment',
    recurrence: 'weekly',
    amount: 36.00,
    next_occurrence: '2022-01-05',
    final_occurrence: '2022-04-05',
    first_occurrence: '2021-01-05',
    repeat_days: ['Wednesday', 'Thursday']
  };
  const scheduleOne = await ScheduleModel.query().insert(insertObj).returning('id');
  insertObj = {
    ...insertObj,
    type: 'request',
    recurrence: 'monthly',
    amount: 48.15,
    next_occurrence: '2022-10-01',
    final_occurrence: '2023-05-01',
    first_occurrence: '2022-10-01',
    repeat_days: [29]
  };
  const scheduleTwo = await ScheduleModel.query().insert(insertObj).returning('id');

  await ScheduleVenmoUsersModel.query().insert({ venmo_user_id: venmoUserOne.id, schedule_id: scheduleOne.id });
  await ScheduleVenmoUsersModel.query().insert({ venmo_user_id: venmoUserTwo.id, schedule_id: scheduleTwo.id });

  insertObj = {
    schedule_id: scheduleOne.id,
    status: ScheduleExecutionModel.status.SUCCESS,
    executed_at: '2021-11-12 00:00:00',
    details: {
      message: 'Successful execution'
    }
  };
  await ScheduleExecutionModel.query().insert(insertObj);

  insertObj = {
    schedule_id: scheduleTwo.id,
    status: ScheduleExecutionModel.status.ERROR,
    executed_at: '2021-11-12 00:00:00',
    details: {
      message: 'Failed execution'
    }
  };
  await ScheduleExecutionModel.query().insert(insertObj);
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
