//////////////Modules required////////////

const { getConnection } = require("../../db");
const { entrySchemaProject } = require("../../validations/validations");
const { formatDateToDB } = require("../helpers");

////////////EDITPROJECTS//////////////////////////
//PUT - /projects/:id
async function editProjects(req, res, next) {
  let connection;
  try {
    const {
      name,
      description,
      province,
      delivery_date,
      language,
      technology,
      architecture,
    } = req.body;

    const { id } = req.params;

    await entrySchemaProject.validateAsync(req.body);

    connection = await getConnection();

    const [
      current,
    ] = await connection.query("SELECT * FROM projects WHERE PK_project=?", [
      id,
    ]);

    if (!current.length) {
      const error = new Error(`The entry with id ${id} does not exist`);
      error.httpCode = 404;
      throw error;
    }
    /* if (
      current[0].FK_project_company !== req.auth.id &&
      req.auth.role !== "admin"
    ) {
      throw generateError("You don't have privileges to edit this user", 401);
    } */
    const date = formatDateToDB(new Date());
    await connection.query(
      "UPDATE projects SET name=?,description=?,province=?,delivery_date=?,language=?,technology=?,architecture=? WHERE PK_project=?",
      [
        name,
        description,
        province,
        delivery_date,
        language,
        technology,
        architecture,
        id,
      ]
    );

    connection.release();

    res.send({
      status: "ok",
      data: {
        id,
        name,
        description,
        province,
        delivery_date,
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
  editProjects,
};
