const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require("body-parser");
const session = require('express-session');
const routManager = require('./router/routes.js');
const port = 3000
const app = express()
dotenv.config();


app.use(bodyParser.urlencoded({extended: true}))



//session setup
app.use(session({
  secret: process.env.SECRET,
  saveUninitialized:false,
  resave: false
}));

mongoose.set('strictQuery', true);

//passport initialization
app.use(passport.initialize());

// passport session middleware
app.use(passport.session());

//Database connection
mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("database connected")).catch(err => console.log(err))


app.use('/',routManager);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})