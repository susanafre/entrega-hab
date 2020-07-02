//////////////Modules required////////////

require("dotenv").config();
const bcrypt = require("bcrypt");

/////////////Functions required////////////

const { getConnection } = require("../../db");
const { entrySchemaCompany } = require("../../validations/validations");
const {
  formatDateToDB,
  processAndSavePhoto,
  randomString,
  sendEmailValidation,
  generateError,
} = require("../helpers");

////////CREATECOMPANIES//////////////////////////////////////////////////
////-POST - /companies
async function createCompanies(req, res, next) {
  let connection;
  try {
    //Validate body pauload
    await entrySchemaCompany.validateAsync(req.body);

    //Create connection
    connection = await getConnection();

    const {
      name,
      description,
      province,
      phone_number,
      email,
      password,
      web,
    } = req.body;

    //check if user is on the DB

    const [
      existing,
    ] = await connection.query(
      "SELECT PK_company from companies where email=?",
      [email]
    );

    if (existing.lenght) {
      throw generateError("This email is already on the DB", 409);
    }

    //Process photo
    let savedFileName;

    if (req.files && req.files.photo) {
      try {
        savedFileName = await processAndSavePhoto(req.files.photo);
      } catch (error) {
        const imageError = new Error(
          "Can not process upload image. Try again."
        );
        imageError.httpCode = 400;
        throw imageError;
      }
    }

    //Date
    const date = formatDateToDB(new Date());

    //Hash password
    const dbPassword = await bcrypt.hash(password, 10);

    //Create a registrationCode
    const registrationCode = randomString(30);

    const [
      result,
    ] = await connection.query(
      "INSERT INTO companies(name,description,province,phone_number,email,password,web,photo,modification_date,role,lastPasswordUpdate,registrationCode) VALUES(?,?,?,?,?,?,?,?,?,'company',NOW(),?)",
      [
        name,
        description,
        province,
        phone_number,
        email,
        dbPassword,
        web,
        savedFileName,
        date,
        registrationCode,
      ]
    );

    const validationURL = `${process.env.PUBLIC_HOST}/companies/${result.insertId}/validate?code=${registrationCode}`;

    try {
      await sendEmailValidation({
        email: email,
        title: "Valida tu cuenta para poder acceder a la aplicación FI.Coder",
        content: `Pega este link en tu navegador: ${validationURL}`,
      });
    } catch (error) {
      console.error(error.response.body);
      throw new Error("Error sending email. Please try again later.");
    }

    res.send({
      status: "ok",
      message:
        "Company profile created correctly. You have to validate your account",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  createCompanies,
};
