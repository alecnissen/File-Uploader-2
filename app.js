// require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const createUserRouter = require('./routes/create_user');
const logOutRouter = require('./routes/log_out');
const createFileRouter = require('./routes/create_a_file');
const createFolderRouter = require('./routes/create_a_folder');
const viewFolders = require('./routes/view_folders');

var app = express();

app.use(session({
  secret: process.env.SECRET_KEY_SESSION, 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  console.log("Request received, body:", req.body);
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/create_user', createUserRouter);
app.use('/log_out', logOutRouter);
app.use('/create_a_file', createFileRouter);
app.use('/create_a_folder', createFolderRouter);
app.use('/view_folders', viewFolders);

app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});


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
