const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'postgres',
  database: 'venmo-scheduler',
  password: 'postgresd',
  port: 5432,
});

module.exports = pool;