const express = require('express');
const app = express();
const router = express.Router();

router.get('/home', (req,res) => {
  res.send("Hello World");
});

router.get('/profile', (req,res) => {
  res.send('Hello World, This is profile router');
});

app.use('/', router);
// different port due to other processes on 3000
app.listen(process.env.port || 3005);
console.log('Web Server is listening at port '+ (process.env.port || 3005));