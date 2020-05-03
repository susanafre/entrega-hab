require("dotenv").config();
const express = require("express");
const app = express();

app.use(function (req, res, next) {
  if (
    new Date().getHours() > 8 &&
    new Date().getHours() < 15 &&
    req.url === "/"
  ) {
    res.statusCode = 200;
    res.end("Hola");
  } else {
    res.statusCode = 404;
    res.end("Page not found!");
  }
});

app.listen(process.env.PORT);
