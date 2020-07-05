////////////////MODULES////////////

require("dotenv").config();

//////////////Functions imported////////////

const { getConnection } = require("../../db");

const { generateError } = require("../helpers");

////////////SHOWCANDIDATURES//////////////
//GET - /coders/candidatures/:id

async function showCandidatures(req, res, next) {
  let connection;
  try {
    const { id } = req.params;
    connection = await getConnection();
    //Check if coder is on the DB

    const [
      coder,
    ] = await connection.query("SELECT * from coders where PK_coder=?", [id]);

    if (!coder[0]) {
      const error = new Error(`The coder with id ${id} does not exist`);
      error.httpCode = 404;
      throw error;
    }

    const [
      candidature,
    ] = await connection.query(
      "SELECT ca.PK_candidature as PK_candidature,cod.name as name_coder,cod.surname as surname_coder,po.description as description, po.name as project_name,co.name as company_name,po.PK_project as PK_project, ca.candidature_state as state, ca.creation_date as creation_date from candidatures ca inner join projects po on ca.FK_candidature_project=po.PK_project inner join companies co on po.FK_project_company=co.PK_company inner join coders cod on ca.FK_candidature_coder=cod.PK_coder where cod.PK_coder=?",
      [id]
    );
    console.log("Esto es Coder de Back", candidature);
    if (!candidature.length) {
      const error = new Error(
        `The coder with id ${id} does not have candidatures`
      );
      error.httpCode = 404;
      throw error;
    }
    /*  //Chec if the user is coder or admin
    if (coder[0].PK_coder !== req.auth.id && req.auth.role !== "admin") {
      throw generateError("You don't have privileges to see this user", 401);
    } */

    /* const payload = [];

    for (const coders of coder) {
      payload.push(`name:${coders.name}, description: ${coders.description}`);
    } */

    res.send({
      status: "ok",
      data: candidature,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  showCandidatures,
};
