const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
const User = require('./schemas/User')
const mongoose = require('mongoose')


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());

app.get('/get', (req,res,next) => {
	User.find({},'email', function(err,results) {
        if (err || !results) res.send({ success: false})
        res.send({ success: true, results: results })
    })
});

app.post('/post', (req,res, next) => {
	 var newUser = new User(req.body);

    newUser.createUser(req,res,next);
})

app.listen(4000, () => mongoose.connect('mongodb://localhost/test'));
