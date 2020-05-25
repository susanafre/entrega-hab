////////////////MODULES////////////

require("dotenv").config();

//////////////Functions imported////////////

const { getConnection } = require("../../db");

const { generateError } = require("../helpers");

////////////SHOWCANDIDATURES//////////////
//GET - /coders/:id/candidatures

async function showCandidatures(req, res, next) {
  let connection;
  try {
    const { id } = req.params;
    connection = await getConnection();
    //Check if coder is on the DB
    const [
      coder,
    ] = await connection.query(
      "SELECT p.name,p.description,c.PK_coder,c.role,ca.PK_candidature from candidatures ca INNER JOIN projects p ON ca.FK_candidature_project=p.PK_project INNER JOIN coders c ON ca.FK_candidature_coder=c.PK_coder WHERE c.PK_coder=?",
      [id]
    );

    if (!coder.length) {
      const error = new Error(`The coder with id ${id} does not exist`);
      error.httpCode = 404;
      throw error;
    }
    //Chec if the user is coder or admin
    if (coder[0].PK_coder !== req.auth.id && req.auth.role !== "admin") {
      throw generateError("You don't have privileges to see this user", 401);
    }

    const payload = [];

    for (const coders of coder) {
      payload.push(`name:${coders.name}, description: ${coders.description}`);
    }

    res.send({
      status: "ok",
      data: payload,
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
