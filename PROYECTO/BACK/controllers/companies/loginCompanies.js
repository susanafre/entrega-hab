////////////////MODULES////////////

require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//////////////Functions imported////////////

const { getConnection } = require("../../db");
const { loggedSchema } = require("../../validations/validations");
const { generateError } = require("../helpers");

/////////////////LOGINCOMPANIES///////////////////////
async function loginCompanies(req, res, next) {
  let connection;
  try {
    // Validate body payload
    await loggedSchema.validateAsync(req.body);

    const { email, password } = req.body;
    connection = await getConnection();

    // Find the company in the db by email

    const [
      dbCompany,
    ] = await connection.query(
      "SELECT PK_company, email, password, role,name,photo from companies where email=? AND active=1",
      [email]
    );

    //Check if the mail belongs to coders
    const [
      dbCoder,
    ] = await connection.query(
      "SELECT PK_coder, email, password, role,photo from coders where email=?",
      [email]
    );

    //If user is a coder, respond with a message
    // If there is no user with that email respond with error
    if (!dbCompany.length) {
      if (dbCoder.role !== "admin") {
        throw generateError(
          "You are not a company, please log in as a coder",
          403
        );
      }
      throw generateError("There is no user with that email on the DB", 404);
    }

    // Check if the provided password matches the stored password
    const [company] = dbCompany;

    const passwordsMatch = await bcrypt.compare(password, company.password);

    if (!passwordsMatch) {
      throw generateError("Password incorrect", 401);
    }

    //If all is correct, respond with the token

    // Build jsonwebtoken
    const tokenPayload = {
      id: company.PK_company,
      role: company.role,
      photo: company.photo,
    };
    const token = jwt.sign(tokenPayload, process.env.SECRET, {
      expiresIn: "30d",
    });

    // Create response
    res.send({
      status: "ok",
      message: "Login succesful",
      data: {
        token: token,
        role: company.role,
        id: company.PK_company,
        name: company.name,
        photo: company.photo,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  loginCompanies,
};
