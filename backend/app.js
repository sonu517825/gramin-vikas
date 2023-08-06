var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var app = express();

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

var mongoDB = require("./database/mongodb");
var indexRouter = require("./routes/index");

mongoDB.Connection();

app.use("/api", indexRouter);

app.get("/", (req, res) => {
  res.status(200).send("Gramin vikash App is working...");
});

app.get("*", (req, res) => {
  res.status(404).send("Gramin vikash Route not found...");
});
module.exports = app;
