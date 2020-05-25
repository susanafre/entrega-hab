////////////////MODULES////////////

require("dotenv").config();

//////////////Functions imported////////////

const { getConnection } = require("../../db");
const { editSchemaUser } = require("../../validations/validations");

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
    } = req.body;

    const { id } = req.params;

    //validate schema
    await editSchemaUser.validateAsync(req.body);

    connection = await getConnection();

    //Check if user with the id exists
    const [
      current,
    ] = await connection.query(
      "SELECT PK_coder,photo FROM coders WHERE PK_coder=?",
      [id]
    );

    if (!current.length) {
      throw generateError(`The entry with id ${id} does not exist`, 404);
    }

    //Check if the user id is the same as the authorized
    console.log(current[0].PK_coder);
    if (current[0].PK_coder !== req.auth.id && req.auth.role !== "admin") {
      throw generateError("You don't have privileges to edit this user", 401);
    }

    //Process Photo

    let savedFileName;

    if (req.files && req.files.photo) {
      try {
        savedFileName = await processAndSavePhoto(req.files.photo);

        if (current && current.image) {
          await deletePhoto(current.image);
        }
      } catch (error) {
        const imageError = new Error(
          "Can not process upload image. Try again."
        );
        imageError.httpCode = 400;
        throw imageError;
      }
    } else {
      savedFileName = current.photo;
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

    connection.release();

    res.send({
      status: "ok",
      message: "The information has been updated",

      data: {
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
      },
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
