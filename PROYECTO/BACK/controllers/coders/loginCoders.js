////////////////MODULES////////////

require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//////////////Functions imported////////////

const { getConnection } = require("../../db");
const { loggedSchema } = require("../../validations/validations");
const { generateError } = require("../helpers");

////////////////LOGINCODERS////////////////
async function loginCoders(req, res, next) {
  let connection;
  try {
    // Validate body payload
    await loggedSchema.validateAsync(req.body);

    const { email, password } = req.body;
    connection = await getConnection();

    // Find the coder in the db by email
    const [
      dbCoder,
    ] = await connection.query(
      "SELECT PK_coder,email,password,role,name,photo from coders where email=? AND active=1",
      [email]
    );

    //Check if mail belongs to companies
    const [
      dbCompany,
    ] = await connection.query(
      "SELECT PK_company from companies where email=?",
      [email]
    );

    //If the user is registered as a company, respond with a message
    // If there is no user with that email respond with error
    if (!dbCoder.length) {
      if (dbCompany.length) {
        throw generateError(
          "You are not a coder, please log in as a company",
          403
        );
      }
      throw generateError("There is no user with that email on the DB", 404);
    }

    // Check if the provided password matches the stored password
    const [coder] = dbCoder;

    const passwordsMatch = await bcrypt.compare(password, coder.password);

    if (!passwordsMatch) {
      throw generateError("Password incorrect", 401);
    }

    //If all is correct, respond with the token

    // Build jsonwebtoken
    const tokenPayload = {
      id: coder.PK_coder,
      role: coder.role,
      name: coder.name,
      photo: coder.photo,
    };

    const token = jwt.sign(tokenPayload, process.env.SECRET, {
      expiresIn: "30d",
    });

    console.log("Esto es el token:", token);
    console.log("Esto es dbcoder", coder.role, coder.PK_coder, coder.name);

    // Create response
    res.json({
      status: "ok",
      message: "Login succesful",
      data: {
        token: token,
        role: coder.role,
        id: coder.PK_coder,
        name: coder.name,
        photo: coder.photo,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  loginCoders,
};
