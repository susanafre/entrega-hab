//////////////Modules required////////////

const { getConnection } = require("../../db");
const {
  searchSchema,
  entrySchemaProject,
} = require("../../validations/validations");
const { formatDateToDB } = require("../helpers");

/////////////////////FILTERPROJECTS///////////
//GET - /projects/

async function filterProjects(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    console.log(req.query);
    const { search } = req.query;

    let result;

    if (search) {
      await searchSchema.validateAsync(search);

      result = await connection.query(
        `SELECT p.name as project_name,p.description,co.name as company_name FROM projects p INNER JOIN companies co ON p.FK_project_company=co.PK_company WHERE p.language LIKE ? OR p.name LIKE ? OR p.technology LIKE ? OR p.delivery_date LIKE ?
        ORDER BY p.creation_date DESC`,
        [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`]
      );
    } else {
      result = await connection.query(
        `SELECT name,description
        FROM projects 
        
        ORDER BY projects.creation_date DESC`
      );
    }

    const [entries] = result;

    connection.release();

    res.send({
      status: "ok",
      data: entries,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  filterProjects,
};
