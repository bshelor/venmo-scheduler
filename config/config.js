require('dotenv').config({ silent: true });

const config = {
  LOCAL_DATABASE_URI: process.env.LOCAL_DATABASE_URI,

  /**
  * Configures Logging level for winston logger
  */
  LOGGING_LEVEL: process.env.LOGGING_LEVEL || 'info',

  /**
  * Configures logging file for winston logging
  */
  LOG_FILE: './logs/all-logs.log',

  ENV: process.env.NODE_ENV
};

module.exports = config;
