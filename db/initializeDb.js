'use strict';

const knex = require('knex');
const { Model } = require('objection');

const { LOCAL_DATABASE_URI } = require('../config/config');

// setup the objection connection for the main venmo-scheduler database
const objection = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL || LOCAL_DATABASE_URI,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
  }
});

Model.knex(objection);
