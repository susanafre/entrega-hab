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
    //Check if the user id is the same as the authorized
    if (current[0].PK_company !== req.auth.id && req.auth.role !== "admin") {
      throw generateError("You don't have privileges to edit this user", 401);
    }

    //Process photo
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
    await connection.query(
      "UPDATE companies SET name=?,description=?,province=?,phone_number=?,email=?,web=?,photo=? WHERE PK_company=?",
      [name, description, province, phone_number, email, web, savedFileName, id]
    );

    connection.release();

    res.send({
      status: "ok",
      data: {
        PK_company: id,
        name,
        description,
        province,
        phone_number,
        email,
        web,
        photo: savedFileName,
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
  editCompanies,
};
