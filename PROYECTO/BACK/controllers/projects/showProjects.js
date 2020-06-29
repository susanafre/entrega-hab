//////////////Modules required////////////

const { getConnection } = require("../../db");

///////////SEARCHPROJECTS///////////////
//GET - /projects/companies/:id
async function showProjects(req, res, next) {
  let connection;
  try {
    const { id1 } = req.params;
    connection = await getConnection();

    //Check if the entry exists
    const [
      users,
    ] = await connection.query(
      "SELECT * FROM projects WHERE FK_project_company=?",
      [id1]
    );
    console.log("Esto es users", users);
    if (!users.length) {
      const error = new Error(`The entry with id ${id1} does not exist`);
      error.httpCode = 404;
      throw error;
    }

    connection.release();

    res.send({
      status: "ok",
      data: users,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  showProjects,
};
