////////////////MODULES////////////

require("dotenv").config();

//////////////Functions imported////////////

const { getConnection } = require("../../db");
const { editSchemaCoder } = require("../../validations/validations");

const {
  formatDateToDB,
  processAndSavePhoto,
  deletePhoto,
  generateError,
} = require("../helpers");

/////////////EDITCODERS/////////////////
//PUT - /coders/:id
async function editCoders(req, res, next) {
  let connection;

  try {
    const {
      name,
      surname,
      phone_number,
      province,
      email,
      language,
      technology,
      architecture,
      photo,
    } = req.body;

    const { id } = req.params;

    //validate schema
    await editSchemaCoder.validateAsync(req.body);

    connection = await getConnection();

    //Check if user with the id exists
    const [
      current,
    ] = await connection.query(
      "SELECT PK_coder,photo FROM coders WHERE PK_coder=?",
      [id]
    );

    console.log("Esto es current.photo", current[0].photo);

    if (!current.length) {
      throw generateError(`The entry with id ${id} does not exist`, 404);
    }

    console.log("esto es req.auth", req.auth);

    //Check if the user id is the same as the authorized

    /* if (current[0].PK_coder !== req.auth.id && req.auth.role !== "admin") {
      throw generateError("You don't have privileges to edit this user", 401);
    }
 */
    //Process Photo

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

    //Update the information
    await connection.query(
      "UPDATE coders SET name=?,surname=?,phone_number=?,province=?,email=?,photo=?,language=?,technology=?,architecture=? WHERE PK_coder=?",
      [
        name,
        surname,
        phone_number,
        province,
        email,
        savedFileName,
        language,
        technology,
        architecture,
        id,
      ]
    );

    if (name) {
      await connection.query("UPDATE coders SET name=? WHERE PK_coder=?", [
        name,
        id,
      ]);
    }
    if (surname) {
      await connection.query("UPDATE coders SET surname=? WHERE PK_coder=?", [
        surname,
        id,
      ]);
    }

    if (phone_number) {
      await connection.query(
        "UPDATE coders SET phone_number=? WHERE PK_coder=?",
        [phone_number, id]
      );
    }

    if (province) {
      await connection.query("UPDATE coders SET province=? WHERE PK_coder=?", [
        province,
        id,
      ]);
    }
    if (email) {
      await connection.query("UPDATE coders SET email=? WHERE PK_coder=?", [
        email,
        id,
      ]);
    }

    if (language) {
      await connection.query("UPDATE coders SET language=? WHERE PK_coder=?", [
        language,
        id,
      ]);
    }

    if (technology) {
      await connection.query(
        "UPDATE coders SET technology=? WHERE PK_coder=?",
        [technology, id]
      );
    }

    if (architecture) {
      await connection.query(
        "UPDATE coders SET architecture=? WHERE PK_coder=?",
        [architecture, id]
      );
    }

    console.log("Esto es req.files", req.files);
    if (req.files && req.files.photo) {
      await connection.query("UPDATE coders SET photo=? WHERE PK_coder=?", [
        savedFileName,
        id,
      ]);
    } else {
      savedFileName = current[0].photo;
    }

    connection.release();

    res.send({
      status: "ok",
      message: "The information has been updated",

      /* data: {
        PK_coder: id,
        name,
        surname,
        phone_number,
        province,
        email,
        photo: savedFileName,
        language,
        technology,
        architecture,
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
  editCoders,
};
