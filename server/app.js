// Importing Express
var express = require("express");

// Node Modules
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan"); //Logger
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

// Express app
var app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cookieParser());

// DB Connection
var db = require("./database/connection");

// Mongoose Models
var User = require("./database/models/userModel");
//var postSchema = require('./database/models/postModel');

app.get("/", (req, res) => {
  res.send({
    message: "Hello World!"
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

module.exports = app;
