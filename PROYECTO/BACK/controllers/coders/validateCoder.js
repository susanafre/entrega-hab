////////////////MODULES////////////

require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//////////////Functions imported////////////

const { getConnection } = require("../../db");

const { generateError } = require("../helpers");

///////////////////VALIDATECODER/////////
async function validateCoder(req, res, next) {
  let connection;

  try {
    const { code } = req.query;

    connection = await getConnection();

    const [
      result,
    ] = await connection.query(
      "UPDATE coders SET active=1,registrationCode=NULL where registrationCode=?",
      [code]
    );

    if (result.affectedRows === 0) {
      throw generateError("Incorrect validation", 400);
    }

    res.send({
      status: "ok",
      message: "User account validated, now you can login",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  validateCoder,
};
