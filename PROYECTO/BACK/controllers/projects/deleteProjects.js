//////////////Modules required////////////

const { getConnection } = require("../../db");
const {
  searchSchema,
  entrySchemaProject,
} = require("../../validations/validations");
const { formatDateToDB } = require("../helpers");

/////////////////////////DELETEPROJECTS///////////////
//DELETE - /projects/:id

async function deleteProjects(req, res, next) {
  let connection;
  try {
    const { id } = req.params;

    connection = await getConnection();

    const [
      current,
    ] = await connection.query("SELECT * from projects where PK_project=?", [
      id,
    ]);

    if (!current.length) {
      const error = new Error(`There is no entry with id ${id}`);
      error.httpCode = 400;
      throw error;
    }

    await connection.query("DELETE from projects WHERE PK_project=?", [id]);
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
  deleteProjects,
};
