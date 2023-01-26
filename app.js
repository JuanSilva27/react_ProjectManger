var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');

const auth = require("./routes/auth")
const users = require("./routes/users")
const projects = require("./routes/projects")
const task = require("./routes/task")

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth",auth)
app.use("/api/users",users)
app.use("/api/projects",projects)
app.use("/api/task",task)


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
  res.status(err.status || 500).json({
    ok : false,
    msg : err.message ? err.message : 'Upss, hubo un error!'
  })
});

module.exports = app;
