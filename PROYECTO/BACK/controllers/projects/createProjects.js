//////////////Modules required////////////

const { getConnection } = require("../../db");
const {
  searchSchema,
  entrySchemaProject,
} = require("../../validations/validations");
const { formatDateToDB } = require("../helpers");

/////////CREATEPROJECTS//////////////////////////////
//POST - /projects/:id
async function createProjects(req, res, next) {
  let connection;
  try {
    const { id } = req.params;
    const {
      name,
      description,
      delivery_date,
      province,
      language,
      technology,
      architecture,
    } = req.body;

    await entrySchemaProject.validateAsync(req.body);

    connection = await getConnection();
    //Check if the company is on the DB
    const [
      current,
    ] = await connection.query(
      "SELECT * FROM projects p LEFT JOIN companies c ON p.FK_project_company = c.PK_company WHERE PK_company=?;",
      [id]
    );
    console.log(current[0]);
    if (!current[0]) {
      const error = new Error(`La empresa con id ${id} no existe`);
      error.httpCode = 404;
      throw error;
    }

    const date = formatDateToDB(new Date());

    const [
      result,
    ] = await connection.query(
      "INSERT INTO projects(name,description,delivery_date,province,language,technology,architecture,modification_date,FK_project_company) VALUES(?,?,?,?,?,?,?,?,?)",
      [
        name,
        description,
        delivery_date,
        province,
        language,
        technology,
        architecture,
        date,
        id,
      ]
    );

    connection.release();

    res.send({
      status: "ok",
      data: {
        PK_project: result.insertId,
        name,
        description,
        delivery_date,
        province,
        language,
        technology,
        architecture,
        date,
        FK_project_company: id,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  createProjects,
};
