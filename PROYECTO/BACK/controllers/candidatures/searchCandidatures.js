//////////////Modules required////////////

const { getConnection } = require("../../db");

const { generateError } = require("../helpers");

///////////SEARCHCANDIDATURES////////////
//GET - /candidatures/:id
async function searchCandidatures(req, res, next) {
  let connection;
  try {
    const { id1, id2 } = req.params;
    connection = await getConnection();

    const [
      candidature,
    ] = await connection.query(
      "select co.name as nombre_candidato,co.surname as apellidos_candidato, po.name as nombre_proyecto from coders co inner join candidatures ca on co.PK_coder=FK_candidature_coder inner join projects po on po.PK_project=ca.FK_candidature_project where po.PK_project=?",
      [id1]
    );

    const [
      company,
    ] = await connection.query("select * from companies where PK_company=?", [
      id2,
    ]);

    console.log("Esto es company:", company[0].name);

    if (!company[0].name) {
      throw generateError("This company is not on the DB");
    }

    if (!candidature.length) {
      const error = new Error(`The project with id ${id1} does not exist`);
      error.httpCode = 404;
      throw error;
    }

    if (company[0].PK_company !== req.auth.id1 && req.auth.role !== "admin") {
      throw generateError(
        "You don't have privileges to see this information",
        401
      );
    }

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
