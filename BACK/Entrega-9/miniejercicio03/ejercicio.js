//MÓDULOS REQUERIDOS

require("dotenv").config();
const express = require("express");
const app = express();

app.use(function (req, res, next) {
  if (
    //Si la hora es entre las 8 y las 15 devolverá el mensaje
    new Date().getHours() > 8 &&
    new Date().getHours() < 15 &&
    req.url === "/"
  ) {
    res.statusCode = 200;
    res.end("Buenos días");
  } else {
    //Si no es entre esas horas, devolverá Page not Found
    res.statusCode = 404;
    res.end("Page not found!");
  }
});

app.listen(process.env.PORT);
