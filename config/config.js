require('dotenv').config({ silent: true });

const config = {
  DATABASE_CONN_DETAILS: process.env.DATABASE_URI
};

module.exports = config;
