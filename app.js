var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileUpload = require('express-fileupload');
var { execSync } = require('child_process');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(fileUpload());

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.post('/upload/imagenet', (req, res) => {
  if (!req.files) {
    res.status(400).send();
  }
  const result = req.files.imagenet.data.toString();
  const resultpath = 'tmp/imagenet_result.json';
  fs.promises.mkdir('tmp', {recursive:true})
  .then(res => {
    fs.promises.writeFile(resultpath, result);
  })
  .then(res => {
    console.log(`Imagenet result is stored in ${resultpath}`);
    const eval = execSync(`python ./eval.py -p ../${resultpath}`, { cwd: './eval' });
    print(eval);
    res.status(200).send();
  })
  .catch(err => {
    console.error(err);
    res.status(500).send();
  });
});

app.post('/upload/coco', (req, res) => {

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
