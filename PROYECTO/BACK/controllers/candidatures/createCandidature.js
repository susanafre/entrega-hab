//////////////Modules required////////////

const { getConnection } = require("../../db");

const { formatDateToDB, sendEmailCandidature } = require("../helpers");

//////////CREATE CANDIDATURE///////////////////
//POST - /users/:id1/candidatures/:id2
async function createCandidatures(req, res, next) {
  let connection;
  try {
    const { id1, id2 } = req.params;

    connection = await getConnection();

    //Select information from coder and if exists
    const [
      coders,
    ] = await connection.query("SELECT * FROM coders WHERE PK_coder=?;", [id1]);

    if (!coders[0]) {
      const error = new Error(`El usuario con id ${id1} no existe`);
      error.httpCode = 404;
      throw error;
    }
    /*  //Token must belog to the coder who apply or an admin user
    if (coders[0].PK_coder !== req.auth.id && req.auth.role !== "admin") {
      throw generateError("The candidature must be applied by the coder", 401);
    } */

    //Select information from the project the coder wants to apply for
    const [
      projects,
    ] = await connection.query("SELECT * FROM projects WHERE PK_project=?;", [
      id2,
    ]);

    if (!projects[0]) {
      const error = new Error(`The proyect with id ${id2} does not exist`);
      error.httpCode = 404;
      throw error;
    }

    //If there's a candidature for the same proyect and same coder, cannot apply again

    const [
      candidatures,
    ] = await connection.query(
      "select * from candidatures where FK_candidature_coder=? AND FK_candidature_project=?;",
      [id1, id2]
    );

    if (candidatures[0]) {
      const error = new Error(`This candidature aleready exists`);
      error.httpCode = 404;
      throw error;
    }
    const date = formatDateToDB(new Date());

    //Create candidature
    const [
      result,
    ] = await connection.query(
      "INSERT INTO candidatures(candidature_date,modification_date,FK_candidature_coder,FK_candidature_project) VALUES(?,?,?,?)",
      [date, date, id1, id2]
    );

    //Send email
    try {
      await sendEmailCandidature({
        email: coders[0].email,
        title: `Your candidatures has been applies for the project: ${projects[0].name}`,
        content: `You can follow this candidature on the website`,
      });
    } catch (error) {
      console.error(error);
      throw new Error("Error sending email. Please, try later.");
    }

    res.send({
      status: "ok",
      message: "This candidature has been applied correctly",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  createCandidatures,
};
