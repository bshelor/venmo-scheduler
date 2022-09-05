'use strict';

const { LOGGING_LEVEL, LOG_FILE } = require('../../../config/config');
const winston = require('winston');
const fs = require('fs');

// if (!fs.existsSync('../../../logs')) {
//   fs.mkdirSync('../../../logs');
// }

const logger = new winston.createLogger({
  transports: [
    new winston.transports.File({
      level: LOGGING_LEVEL,
      filename: LOG_FILE,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
      timestamp: true
    }),
    new winston.transports.Console({
      level: LOGGING_LEVEL,
      handleExceptions: true,
      json: true,
      stringify: true,
      colorize: true,
      timestamp: true
    })],
  format: winston.format.combine(
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.colorize(),
    winston.format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
  ),
  exitOnError: false
});

module.exports = logger;
