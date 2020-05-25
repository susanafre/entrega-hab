////////////////MODULES////////////

require("dotenv").config();

//////////////Functions imported////////////

const { getConnection } = require("../../db");

const { deletePhoto, generateError } = require("../helpers");

////////////////DELETECODERS//////////////
//DELETE - /coders/:id
async function deleteCoders(req, res, next) {
  let connection;

  try {
    const { id } = req.params;

    connection = await getConnection();

    //Check if coder is on DB
    const [
      current,
    ] = await connection.query("SELECT photo from coders where PK_coder=?", [
      id,
    ]);

    if (!current.length) {
      throw generateError(`There is no entry with id ${id}`, 400);
    }
    // Delete image if exists!

    if (current[0].PK_coder !== req.auth.id && req.auth.role !== "admin") {
      throw generateError("You don't have privileges to edit this user", 401);
    }

    if (current.photo) {
      await deletePhoto(current.photo);
    }

    await connection.query("DELETE from coders WHERE PK_coder=?", [id]);
    //Take into account that candidatures has been deleted too

    connection.release();

    res.send({
      status: "ok",
      message: `The entry with id ${id} and their candidatures has been deleted`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  deleteCoders,
};
