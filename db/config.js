const Pool = require('pg').Pool;
const parse = require('pg-connection-string').parse;

const { LOCAL_DATABASE_URI } = require('../config/config');

const dbConnectionStringParsed = parse(process.env.DATABASE_URL || LOCAL_DATABASE_URI);
const pool = new Pool(dbConnectionStringParsed);

module.exports = pool;