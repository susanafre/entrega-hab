////////////////MODULES////////////

require("dotenv").config();

//////////////Functions imported////////////

const { getConnection } = require("../../db");

const { generateError } = require("../helpers");

/* app.get("/all/projects",seeAllProjects); */

async function seeAllProjects(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const [projects] = await connection.query(
      "SELECT po.PK_project as id,po.name as name_project, po.description as description, co.name as company_name, po.creation_date as creation_date,po.architecture as architecture, po.language as language,po.technology as technology,po.province as province,po.delivery_date as delivery_date from projects po inner join companies co on po.FK_project_company=co.PK_company"
    );

    if (!projects.length) {
      throw generateError(`There's no any coders`, 404);
    }

    /*  //Check if the loged user is the same to see profile
            if (coderData.PK_coder !== req.auth.id && req.auth.role !== "admin") {
              throw generateError("You don't have privileges to edit this user", 401);
            } */

    res.send({
      status: "ok",
      data: projects,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  seeAllProjects,
};
