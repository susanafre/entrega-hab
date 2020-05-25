////////////////MODULES////////////

require("dotenv").config();
const bcrypt = require("bcrypt");

//////////////Functions imported////////////

const { getConnection } = require("../../db");
const { entrySchemaCoder } = require("../../validations/validations");

const {
  formatDateToDB,
  processAndSavePhoto,
  generateError,
  randomString,
  sendEmailValidation,
} = require("../helpers");

////////////////CREATECODERS/////////////////
//POST - /coders
async function createCoders(req, res, next) {
  let connection;
  try {
    //Validate body payload
    await entrySchemaCoder.validateAsync(req.body);

    //Create connection
    connection = await getConnection();

    const {
      email,
      password,
      name,
      surname,
      phone_number,
      province,
      language,
      technology,
      architecture,
    } = req.body;

    //check if user is on the DB

    const [
      existing,
    ] = await connection.query("SELECT PK_coder from coders where email=?", [
      email,
    ]);

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
      "INSERT INTO coders(name,surname,phone_number,province,email,password,photo,language,technology,architecture,modification_date,role,lastPasswordUpdate,registrationCode) VALUES(?,?,?,?,?,?,?,?,?,?,?,'coder',NOW(),?)",
      [
        name,
        surname,
        phone_number,
        province,
        email,
        dbPassword,
        savedFileName,
        language,
        technology,
        architecture,
        date,
        registrationCode,
      ]
    );

    //Create validation URL
    const validationURL = `${process.env.PUBLIC_HOST}/coders/${result.insertId}/validate?code=${registrationCode}`;

    //Send email validation
    try {
      await sendEmailValidation({
        email: email,
        title: "Validate your account for the app match coder",
        content: `Please paste the following link into your browser: ${validationURL}`,
      });
    } catch (error) {
      console.error(error.response.body);
      throw new Error("Error sending email. Please try again later.");
    }

    res.send({
      status: "ok",
      message:
        "Coder profile created correctly. You have to validate your account.",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  createCoders,
};
