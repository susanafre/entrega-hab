//IMPORTANDO LO QUE NECESITO PARA LA CONEXIÓN/API: express, cors, bodyparser, mysql

const express = require("express");

const cors = require("cors");

const bodyParser = require("body-parser");

const mysql = require("mysql");

//JSONWEBTOKEN DEPENDENCIAS

const jwt = require("jsonwebtoken");
const config = require("./config");

//DECLARO LA "APP"

const app = express();

//APP USES

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("llave", config.llave);

// DATOS DE CONEXIÓN

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "KiraParrus2019.",
  database: "hackamarket",
});

// CONEXIÓN

connection.connect((error) => {
  if (error) throw error; //SI HAY ERROR
  console.log("CONEXIÓN ESTABLECIDA"); // SI NO HAY ERROR
});

// PUERTO DE LA API

const PORT = 3050;

//ESCUCHA EL PUERTO

app.listen(PORT, () => console.log(`ESCUCHANDO DESDE EL PUERTO ${PORT}`));

//LLAMADA DE PRUEBA

app.get("/", (req, res) => {
  res.send("Llamada de prueba");
});

//########################################################//
//################### CLIENTES ###########################//
//########################################################//

//FUNCIÓN PARA RECUPERAR TODOS LOS CLIENTES DE LA BBDD

app.get("/clientes", (req, res) => {
  // SECUENCIA SQL
  const sql = "SELECT * FROM clientes";
  //CONEXIÓN
  connection.query(sql, (error, results) => {
    // SI SALE MAL
    if (error) throw error;
    //SI HAY RESULTADOS
    if (results.length > 0) {
      res.json(results);
    }
    //SI NO HAY NADA
    else {
      res.send("No hay clientes");
    }
  });
});

//FUNCIÓN PARA EDITAR CLIENTES

app.put("/clientes/update/:id", (req, res) => {
  //Texto que nos llega
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const ciudad = req.body.ciudad;
  const empresa = req.body.empresa;
  //ID que nos llega
  const id = req.body.id;
  //Secuencia SQL
  const sql = `UPDATE clientes SET nombre='${nombre}',apellido='${apellido}',ciudad='${ciudad}',empresa='${empresa}' WHERE id=${id}`;
  connection.query(sql, (error) => {
    if (error) throw error;
    res.send("CLIENTE ACTUALIZADO");
  });
});

//FUNCIÓN PARA BORRAR CLIENTES

app.delete("/clientes/del/:id", (req, res) => {
  const id = req.params.id;
  // SECUENCIA SQL
  const sql = `DELETE FROM clientes WHERE id=${id}`;

  //CONEXIÓN
  connection.query(sql, (error) => {
    // SI SALE MAL
    if (error) throw error;
    res.send("Cliente borrado");
  });
});

//FUNCIÓN PARA AÑADIR CLIENTES

app.post("/clientes/add", (req, res) => {
  // SECUENCIA SQL
  const sql = "INSERT INTO clientes SET ?";

  const newClient = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    ciudad: req.body.ciudad,
    empresa: req.body.empresa,
  };

  //CONEXIÓN
  connection.query(sql, newClient, (error) => {
    // SI SALE MAL
    if (error) throw error;
    res.send("Cliente creado");
  });
});

//########################################################//
//################### PRODUCTOS ##########################//
//########################################################//

//FUNCIÓN PARA RECUPERAR TODOS LOS PRODUCTOS DE LA BBDD

app.get("/productos", (req, res) => {
  // SECUENCIA SQL
  const sql = "SELECT * FROM productos";
  //CONEXIÓN
  connection.query(sql, (error, results) => {
    // SI SALE MAL
    if (error) throw error;
    //SI HAY RESULTADOS
    if (results.length > 0) {
      res.json(results);
    }
    //SI NO HAY NADA
    else {
      res.send("No hay productos");
    }
  });
});

//########################################################//
//################### USUARIOS ##########################//
//########################################################//

app.post("/usuarios/add", (req, res) => {
  // SECUENCIA SQL
  const sql = "INSERT INTO usuarios SET ?";

  const newClient = {
    email: req.body.email,
    password: req.body.password,
    admin: 0,
  };

  //CONEXIÓN
  connection.query(sql, newClient, (error) => {
    // SI SALE MAL
    if (error) throw error;
    res.send("Usuario creado");
  });
});

//############################################//
//############### LOGIN ######################//
//###########################################//

// MÉTODO LOGIN QUE CREA EL TOKEN
app.post("/auth", (req, res) => {
  //EL CAMPO USUARIO DEBERÍA SER EL EMAIL

  //DATOS QUE LLEGAN, USER Y PASSWORD

  const email = req.body.email;
  const password = req.body.password;

  //SECUENCIA SQL

  const sql = `SELECT * FROM usuarios WHERE email='${email}' AND password='${password}'`;

  //CONEXIÓN A LA BBDD

  connection.query(sql, (error, results) => {
    let admin = null;

    console.log(results);
    if (error) throw error;

    if (results.length > 0) {
      const payload = {
        check: true,
      };
      if (results[0].admin === 1) {
        admin = true;
      } else {
        admin = false;
      }
      const token = jwt.sign(payload, app.get("llave"), {
        expiresIn: "1 day",
      });
      res.json({
        mensaje: "Autenticación correcta",
        token: token,
        admin: admin,
      });
    } else {
      console.log("Datos incorrectos");
    }
  });
});
