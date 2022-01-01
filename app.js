const express = require('express');
const app = express();
const async = require('async');
require('./db/initializeDb');

const swaggerUi = require('swagger-tools/middleware/swagger-ui');
const swaggerMetadata = require('swagger-tools/middleware/swagger-metadata');
const swaggerRouter = require('swagger-tools/middleware/swagger-router');
const swaggerValidator = require('swagger-tools/middleware/swagger-validator');
const swaggerParser = require('swagger-parser');

console.log('Configuring middleware and generating swagger docs...');
async.waterfall([
  cb => swaggerParser.validate('./src/api/swagger/swagger.yaml', cb)
], (err, api) => {
  if (err) throw err;
  
  app.use(swaggerMetadata(api));
  app.use(swaggerValidator());
  const options = {
    controllers: './src/api/controllers'
  };
  app.use(swaggerRouter(options));
  if (process.env.NODE_ENV === 'development') app.use(swaggerUi(api));

  // locally, different port due to other processes on 3000
  app.listen(process.env.PORT || 3005);
  console.log('Web Server is listening at port '+ (process.env.PORT || 3002));
});
