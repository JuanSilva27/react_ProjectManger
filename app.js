const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const connection = require("./database/config")

const auth = require("./routes/auth")
const users = require("./routes/users")
const projects = require("./routes/projects")
const task = require("./routes/task")

const app = express();
const cors = require("cors");
const checkToken = require('./middlewares/checkToken');
const whiteList = [process.env.URL_FRONT]
const corsOptions = {
  origin : function (origin, cb){
    if(whiteList.includes(origin)){
      cb(null,true)
    }else{
      cb(new Error("Error de Cors"))
    }
  }
}

connection()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use("/api/auth",auth)
app.use("/api/users",users)
app.use("/api/projects",checkToken,projects)
app.use("/api/task",checkToken,task)


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
