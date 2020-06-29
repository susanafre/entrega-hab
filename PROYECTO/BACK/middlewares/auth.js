require("dotenv").config();
const jwt = require("jsonwebtoken");

const { generateError } = require("../controllers/helpers");
const { getConnection } = require("../db");

async function userIsCoder(req, res, next) {
  let connection;

  try {
    // Get authorization header
    console.log("Esto es req.headers", req.headers);
    const { authorization } = req.headers;

    if (!authorization) {
      throw generateError("Headers are missing");
    }

    const authorizationParts = authorization.split(" ");

    let token;

    if (authorizationParts.length === 1) {
      token = authorization;
    } else if (authorizationParts[0] === "Bearer") {
      token = authorizationParts[1];
    } else {
      throw generateError("Cannot read token");
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.SECRET);
    } catch (error) {
      throw new Error("Invalid token");
    }

    const { id, iat } = decoded;

    connection = await getConnection();

    const [
      result,
    ] = await connection.query(
      "SELECT lastPasswordUpdate FROM coders WHERE PK_coder=?",
      [id]
    );

    if (!result) {
      throw new Error("User doesn't exist");
    }

    const [coder] = result;

    /* if (new Date(iat * 1000) < new Date(coder.lastPasswordUpdate)) {
      throw new Error(
        "This token is invalid, log in again or order to get a new one"
      );
    } */

    // Add token payload to request
    req.auth = decoded;
    console.log(req.auth);
    if (!req.auth || req.auth.role === "company") {
      const error = new Error(
        "You do not have admin privileges to access this resource"
      );
      error.httpCode = 401;
      return next(error);
    }

    // Continue
    next();
  } catch (error) {
    error.httpCode = 401;
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

async function userIsCompany(req, res, next) {
  let connection;
  try {
    // Get authorization header
    const { authorization } = req.headers;

    if (!authorization) {
      throw generateError("Headers are missing");
    }

    const authorizationParts = authorization.split(" ");

    let token;

    if (authorizationParts.length === 1) {
      token = authorization;
    } else if (authorizationParts[0] === "Bearer") {
      token = authorizationParts[1];
    } else {
      throw generateError("Cannot read token");
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.SECRET);
    } catch (error) {
      throw new Error("Invalid token");
    }

    const { id, iat } = decoded;

    connection = await getConnection();

    const [
      result,
    ] = await connection.query("SELECT * FROM companies WHERE PK_company=?", [
      id,
    ]);

    if (!result) {
      throw new Error("This user is not on the DB");
    }

    const [company] = result;

    // Add token payload to request
    req.auth = decoded;
    if (!req.auth || req.auth.role === "coder") {
      const error = new Error(
        "You do not have  privileges to access this resource"
      );
      error.httpCode = 401;
      return next(error);
    }

    /* if (new Date(iat * 1000) < new Date(company.lastPasswordUpdate)) {
      throw new Error(
        "This token is invalid. Please log in again to get a new one"
      );
    } */

    // Continue
    next();
  } catch (error) {
    error.httpCode = 401;
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  userIsCoder,
  userIsCompany,
};
