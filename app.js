var createError = require('http-errors');

var cors = require('cors')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const gamesCont = require('./routes/games')
const expressLayouts = require('express-ejs-layouts');

const mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const users = require('./routes/users');
const games = require('./routes/games');
const sports = require('./routes/sports');
const userWantsToPlayGames = require('./routes/userWantToPlayGames');
const userWantsToPlaySports = require('./routes/userWantToPlaySports');
const GameRequestMessages = require('./routes/gameRequestMessages');
const SportRequestMessages = require('./routes/sportRequestMessages');

var app = express();

// app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static('public'));
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Database
mongoose.connect('mongodb://localhost/SportsBuddyApi');
mongoose.connection.on('open', () => {
    console.log('MongoDB: Connected');
});
mongoose.connection.on('error', (err) => {
    console.log('MongoDB: Error', err);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, 'public'), {redirect: false}));


app.use(cors())
app.use('/', indexRouter);
app.use('/users', users);
app.use('/games', games);
app.use('/sports', sports);
app.use('/userWantToPlayGames', userWantsToPlayGames);
app.use('/userWantToPlaySports', userWantsToPlaySports);
app.use('/gameRequestMessages', GameRequestMessages);
app.use('/sportRequestMessages', SportRequestMessages);


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
  // res.render('error');
});

module.exports = app;