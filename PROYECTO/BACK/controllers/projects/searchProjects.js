//////////////Modules required////////////

const { getConnection } = require("../../db");

///////////SEARCHPROJECTS///////////////
//GET - /projects/:id
async function searchProjects(req, res, next) {
  let connection;
  try {
    const { id } = req.params;
    connection = await getConnection();

    //Check if the entry exists
    const [
      users,
    ] = await connection.query(
      "SELECT p.name as name_project,p.description,p.delivery_date,p.province,p.language,p.technology,p.architecture,co.name as name_company from projects p inner join companies co on p.FK_project_company=co.PK_company WHERE p.PK_project=? AND p.delivery_date>current_timestamp()",
      [id]
    );

    if (!users.length) {
      const error = new Error(`The entry with id ${id} does not exist`);
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
  searchProjects,
};
