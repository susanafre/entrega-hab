////////////////MODULES////////////

require("dotenv").config();

//////////////Functions imported////////////

const { getConnection } = require("../../db");

const { generateError } = require("../helpers");

/* app.get("/all/candidatures",seeAllCandidatures); */

async function seeAllCandidatures(req, res, next) {
  const { id } = req.params;
  let connection;
  try {
    connection = await getConnection();

    const [
      candidatures,
    ] = await connection.query(
      "SELECT cod.name as name_coder,cod.surname as surname_coder, po.name as project_name,co.name as company_name,po.PK_project as PK_project, ca.candidature_state as state, ca.creation_date as creation_date from candidatures ca inner join projects po on ca.FK_candidature_project=po.PK_project inner join companies co on po.FK_project_company=co.PK_company inner join coders cod on ca.FK_candidature_coder=cod.PK_coder where po.PK_project=?",
      [id]
    );

    if (!candidatures.length) {
      throw generateError(`There's no any coders`, 404);
    }

    /*  //Check if the loged user is the same to see profile
                if (coderData.PK_coder !== req.auth.id && req.auth.role !== "admin") {
                  throw generateError("You don't have privileges to edit this user", 401);
                } */

    res.send({
      status: "ok",
      data: candidatures,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  seeAllCandidatures,
};
