var createError = require('http-errors');


var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const ejs = require("ejs");

const mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//const Games = require('./models/Games');

const users = require('./routes/users');
const games = require('./routes/games');
const sports = require('./routes/sports');
const userWantsToPlayGames = require('./routes/userWantToPlayGames');
const userWantsToPlaySports = require('./routes/userWantToPlaySports');

var app = express();



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));


//Database
mongoose.connect('mongodb://localhost/SportsBuddyApi');
mongoose.connection.on('open', () => {
    console.log('MongoDB: Connected');
});
mongoose.connection.on('error', (err) => {
    console.log('MongoDB: Error', err);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', users);
app.use('/games', games);
app.use('/sports', sports);
app.use('/userWantToPlayGames', userWantsToPlayGames);
app.use('/userWantToPlaySports', userWantsToPlaySports);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;