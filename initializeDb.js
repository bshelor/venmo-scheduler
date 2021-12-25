'use strict';

const _ = require('lodash');
const configObj = require('./config/config');
const massive = require('massive');
const knex = require('knex');

class DB {
  constructor() {
    this._modelNames = [];
    this.massive = massive.connectSync({
      connectionString: configObj.DATABASE_CONN_DETAILS
    });

    // setup the objection connection for the main venmo-scheduler database
    this.objection = knex({
      client: 'pg',
      connection: configObj.DATABASE_CONN_DETAILS
    });
  }
}

const globalDb = new DB();

module.exports = globalDb;
