var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { execSync } = require('child_process');
var multer = require('multer');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(fileUpload());

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});

var upload = multer({ storage : storage });

app.post('/upload/imagenet', upload.single('file'), (req, res) => {
  if (!req.file) {
    res.status(400).send();
    return;
  }

  console.log(req.file);
  try {
    const eval = execSync(`python3 ./eval.py -p ../../${req.file.path}`, { cwd: './eval/imagenet' }).toString();
    console.log(eval);
    res.status(200).json({ eval });
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

app.post('/upload/coco', upload.single('file'), (req, res) => {
  if (!req.file) {
    res.status(400).send();
    return;
  }

  console.log(req.file);
  try {
    const eval = execSync(`python3 ./eval.py -p ../../${req.file.path}`, { cwd: './eval/coco' }).toString();
    console.log(eval);
    res.status(200).send({ eval });
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
