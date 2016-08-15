var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
<<<<<<< HEAD
var busboy = require('connect-busboy');
=======
>>>>>>> 9d2c945ac55304ce69e717f7268be2b63b4e933d

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/BingComics');

var routes = require('./routes/index');
var profile = require('./routes/profile');
var comics = require('./routes/comics');
<<<<<<< HEAD
=======
var artwork = require('./routes/artwork');
>>>>>>> 9d2c945ac55304ce69e717f7268be2b63b4e933d
var error = require('./routes/error');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
<<<<<<< HEAD
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(busboy());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(err, req, res, next) {
  console.error(err.stack);
  next(err);
});
app.use('/', routes);
app.use('/profile', profile);
app.use('/comics', comics);
=======
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/profile', profile);
app.use('/comics', comics);
app.use('/artwork', artwork);
>>>>>>> 9d2c945ac55304ce69e717f7268be2b63b4e933d
//if no pages exist
app.use(function(req, res, next) {
  res.render('error', {})
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
