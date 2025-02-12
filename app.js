require('dotenv').config();
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
const deleteFolders = require('./routes/delete_folder');
const updateFolders = require('./routes/update_folder');
const uploadFilesInFolders = require('./routes/view_folders');
const viewFileInformation = require('./routes/view_file_information');
const downloadFile = require('./routes/download_file');
const uploadFileToCloud = require('./routes/upload_file_to_cloud');
const filesInFolder = require('./routes/files_in_folder');
const deleteFile = require('./routes/delete_file');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  secure: true,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

var app = express();

app.use(
  session({
    secret: process.env.SECRET_KEY_SESSION,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  console.log('Request received, body:', req.body);
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
app.use('/delete_folder', deleteFolders);
app.use('/', updateFolders);
app.use('/view_folders', uploadFilesInFolders);
app.use('/view_file_information', viewFileInformation);
app.use('/download_file', downloadFile);
app.use('/upload_file_to_cloud', uploadFileToCloud);
app.use('/files_in_folder', filesInFolder);
app.use('/delete_file', deleteFile);

app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  next();
});

app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
