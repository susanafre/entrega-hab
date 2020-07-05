//////////////Modules required////////////

require("dotenv").config();

/////////////Functions required////////////

const { getConnection } = require("../../db");
const { editSchemaCompany } = require("../../validations/validations");
const {
  formatDateToDB,
  processAndSavePhoto,
  deletePhoto,
  generateError,
} = require("../helpers");

//////////////////////EDITCOMPANIES//////////////////////
//PUT - /companies/:id
async function editCompanies(req, res, next) {
  let connection;
  try {
    const {
      name,
      description,
      province,
      phone_number,
      email,
      web,
      photo,
    } = req.body;

    const { id } = req.params;

    //Validate schema
    await editSchemaCompany.validateAsync(req.body);

    connection = await getConnection();

    //Check if company is on the DB
    const [
      current,
    ] = await connection.query(
      "SELECT PK_company,photo FROM companies WHERE PK_company=?",
      [id]
    );

    console.log(current);

    if (!current.length) {
      throw generateError(`The entry with id ${id} does not exist`, 404);
    }
    console.log("Esto es current.photo", current[0].photo);
    console.log("esto es req.auth", req.auth);

    //Check if the user id is the same as the authorized
    /* if (current.PK_company !== req.auth.id && req.auth.role !== "admin") {
      throw generateError("You don't have privileges to edit this user", 401);
    } */

    //Process photo
    let savedFileName;
    console.log("Esto es req.files", req.files);

    if (req.files && req.files.photo) {
      try {
        savedFileName = await processAndSavePhoto(req.files.photo);

        if (current && current.photo) {
          await deletePhoto(current.photo);
        }
      } catch (error) {
        const imageError = new Error(
          "Can not process upload image. Try again."
        );
        imageError.httpCode = 400;
        throw imageError;
      }
    } else {
      savedFileName = current[0].photo;
    }

    const date = formatDateToDB(new Date());

    if (name) {
      await connection.query("UPDATE companies SET name=? WHERE PK_company=?", [
        name,
        id,
      ]);
    }
    if (description) {
      await connection.query(
        "UPDATE companies SET description=? WHERE PK_company=?",
        [description, id]
      );
    }

    if (province) {
      await connection.query(
        "UPDATE companies SET province=? WHERE PK_company=?",
        [province, id]
      );
    }

    if (phone_number) {
      await connection.query(
        "UPDATE companies SET phone_number=? WHERE PK_company=?",
        [phone_number, id]
      );
    }

    if (email) {
      await connection.query(
        "UPDATE companies SET email=? WHERE PK_company=?",
        [email, id]
      );
    }

    if (web) {
      await connection.query("UPDATE companies SET web=? WHERE PK_company=?", [
        web,
        id,
      ]);
    }
    console.log("Esto es req.files", req.files);
    if (req.files && req.files.photo) {
      await connection.query(
        "UPDATE companies SET photo=? WHERE PK_company=?",
        [savedFileName, id]
      );
    } else {
      savedFileName = current[0].photo;
    }

    connection.release();

    res.send({
      status: "ok",
      message: "The information has been updated",

      /* data: {
        PK_company: id,
        name,
        description,
        province,
        phone_number,
        email,
        web,
        photo: savedFileName,
        modification_date: date,
      }, */
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  editCompanies,
};
