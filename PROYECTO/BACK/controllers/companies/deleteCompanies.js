//////////////Modules required////////////

require("dotenv").config();

/////////////Functions required////////////

const { getConnection } = require("../../db");

const { deletePhoto } = require("../helpers");

//////////////////////DELETE COMPANY/////////////

async function deleteCompanies(req, res, next) {
  let connection;
  try {
    const { id } = req.params;

    connection = await getConnection();
    // Delete image if exists!
    const [
      current,
    ] = await connection.query(
      "SELECT photo from companies where PK_company=?",
      [id]
    );

    if (!current.length) {
      const error = new Error(`There is no entry with id ${id}`);
      error.httpCode = 400;
      throw error;
    }
    /* 
    if (current[0].PK_coder !== req.auth.id && req.auth.role !== "admin") {
      throw generateError("You don't have privileges to edit this user", 401);
    } */

    if (current.photo) {
      await deletePhoto(current.photo);
    }

    await connection.query("DELETE from companies WHERE PK_company=?", [id]);
    //Hay que tener en cuenta que los usuarios aparecerán en candidatura

    connection.release();

    res.send({
      status: "ok",
      message: `The entry with id ${id} has been deleted`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  deleteCompanies,
};
