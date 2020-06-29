//////////////Modules required////////////

const { getConnection } = require("../../db");

const { generateError } = require("../helpers");

///////////SEARCHCANDIDATURES////////////
//GET - /candidatures/:id
async function searchCandidatures(req, res, next) {
  let connection;
  try {
    const { id2, id1 } = req.params;
    connection = await getConnection();

    const [
      candidature,
    ] = await connection.query(
      "select co.name as nombre_candidato,co.surname as apellidos_candidato, po.name as nombre_proyecto,po.PK_project as id,co.PK_coder as id_coder,ca.candidature_state as finalizado from coders co inner join candidatures ca on co.PK_coder=FK_candidature_coder inner join projects po on po.PK_project=ca.FK_candidature_project where po.PK_project=?",
      [id2]
    );

    const [
      company,
    ] = await connection.query("select * from companies where PK_company=?", [
      id1,
    ]);

    const [
      project,
    ] = await connection.query("select * from projects where PK_project=?", [
      id2,
    ]);

    console.log("Esto es company:", company[0].name);
    console.log("Esto es candidatures de Back", candidature);
    if (!company[0].name) {
      throw generateError("This company is not on the DB");
    }

    if (!candidature.length) {
      const error = new Error(
        `The project with id ${id2} doesn't have candidatures`
      );
      error.httpCode = 404;
      throw error;
    }

    if (!project.length) {
      const error = new Error(`The project with id ${id2} doesn't exist`);
      error.httpCode = 404;
      throw error;
    }

    /*   console.log("esto es req.auth.id1", req.auth);
    console.log("esto es PK_company", company[0].PK_company);

    if (company[0].PK_company !== req.auth.id && req.auth.role !== "admin") {
      throw generateError(
        "You don't have privileges to see this information",
        401
      );
    }
 */
    connection.release();

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
  searchCandidatures,
};
