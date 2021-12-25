const express = require('express');
const app = express();
const router = express.Router();
// const db = require('./config/initializeDb');
const db = require('./db/config');


router.get('/home', (req,res) => {
  res.send("Hello World");
});

router.get('/profile', (req,res) => {
  res.send('Hello World, This is profile router');
});

router.get('/users', (req, res) => {
  // res.send('In progress. working on connecting the database');
  db.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    console.log('results -- ', results);
    res.send(results.rows);
  })
});

router.get('/info', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
})

app.use('/', router);
// app.use(bodyParser.json())
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// )
// locally, different port due to other processes on 3000
app.listen(process.env.PORT || 3005);
console.log(app);
console.log('Web Server is listening at port '+ (process.env.PORT || 3002));