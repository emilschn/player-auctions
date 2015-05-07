var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    passport = require('passport'),
//    passportLocal = require('passport-local'),
    flash = require('connect-flash'),
//    morgan = require('morgan'), //Log requests to the console
    cookieParser = require('cookie-parser'), //Cookies (for auth)
    bodyParser = require('body-parser'), //Get info from html forms
    async = require('async'),
    session = require('express-session'); //Sessions

//DB
var dbConf = require('./app/config.js');
mongoose.connect(dbConf.url);

//Passport setup
require('./app/passport.js')(passport);

//Express setup
app.use("/assets", express.static(__dirname + "/assets"));
app.use(cookieParser());
app.use(bodyParser());
app.set('view engine', 'ejs');

//Session setup
app.use(session({ secret: dbConf.sessionsecret }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes.js')(app, passport, async);

app.listen(dbConf.port);