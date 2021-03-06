var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session=require('express-session');
var passport=require('passport');
var localStrategy=require('passport-local').Strateg;
var bodyParser=require('body-parser');
var multer=require('multer');
var uploads=multer({dest:'uploads/'});
var flash=require('connect-flash');
var mongo=require('mongodb');
var mongoose=require('mongoose');
var db=mongoose.connection;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { appendFile } = require('fs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//handle file uploads
//app.use(multer({dest:'./uploads'}));

app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

//handle express session
app.use(session({
  secret:'secret',
  saveUninitialized:true,
  resave:true,
}))

//Passport
app.use(passport.initialize());
app.use(passport.session());

// Validator
//include validator here 


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
