const express = require('express');
const app = express();
const router = express.Router();

router.get('/home', (req,res) => {
  res.send("Hello World");
});

router.get('/profile', (req,res) => {
  res.send('Hello World, This is profile router');
});

router.get('/users', (req, res) => {
  res.send('In progress. working on connecting the database');
});

app.use('/', router);
// locally, different port due to other processes on 3000
app.listen(process.env.PORT || 3005);
console.log(app);
console.log('Web Server is listening at port '+ (process.env.PORT || 3005));