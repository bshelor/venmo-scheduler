const express = require('express');
const app = express();
const router = express.Router();
require('./db/initializeDb');
const UserModel = require('./src/models/UserModel');
const ScheduleModel = require('./src/models/ScheduleModel');


router.get('/home', (req,res) => {
  res.send("Hello World");
});

router.get('/profile', (req,res) => {
  res.send('Hello World, This is profile router');
});

router.get('/users', (req, res) => {
  UserModel.query().select()
    .then(result => {
      res.send(result);
    })
    .catch(err => { throw err; });
});

router.get('/schedules', (req, res) => {
  ScheduleModel.query().select()
    .then(result => {
      res.send(result);
    }).catch(err => { throw err; });
});

router.get('/info', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
})

app.use('/', router);

// locally, different port due to other processes on 3000
app.listen(process.env.PORT || 3005);
console.log('Web Server is listening at port '+ (process.env.PORT || 3002));