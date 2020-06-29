////////////////MODULES////////////

require("dotenv").config();

//////////////Functions imported////////////

const { getConnection } = require("../../db");

const { generateError } = require("../helpers");

///////////viewProfileCoder/////////////
//GET - /coders/:id
async function viewProfileCoder(req, res, next) {
  let connection;
  try {
    const { id } = req.params;
    connection = await getConnection();

    //Check if user exists
    const [
      coders,
    ] = await connection.query("SELECT * from coders WHERE PK_coder=?", [id]);

    if (!coders.length) {
      throw generateError(`The entry with id ${id} does not exist`, 404);
    }

    const [coderData] = coders;

    /*  //Check if the loged user is the same to see profile
    if (coderData.PK_coder !== req.auth.id && req.auth.role !== "admin") {
      throw generateError("You don't have privileges to edit this user", 401);
    } */

    const payload = {
      id: coderData.PK_coder,
      name: coderData.name,
      surname: coderData.surname,
      phone_number: coderData.phone_number,
      province: coderData.province,
      photo: coderData.photo,
      language: coderData.language,
      technology: coderData.technology,
      architecture: coderData.architecture,
      email: coderData.email,
      role: coderData.role,
    };

    res.send({
      status: "ok",
      data: payload,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  viewProfileCoder,
};
