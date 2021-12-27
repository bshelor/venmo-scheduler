require('dotenv').config({ silent: true });

const config = {
  LOCAL_DATABASE_URI: process.env.LOCAL_DATABASE_URI
};

module.exports = config;
