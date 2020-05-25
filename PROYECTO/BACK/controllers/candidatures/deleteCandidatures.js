//////////////Modules required////////////

const { getConnection } = require("../../db");

const { generateError } = require("../helpers");

///////DELETE CANDIDATURE///////////
//DELETE - /candidatures/:id
async function deleteCandidatures(req, res, next) {
  let connection;
  try {
    const { id1, id2 } = req.params;

    connection = await getConnection();

    const [
      current,
    ] = await connection.query(
      "select * from candidatures where FK_candidature_coder=? AND FK_candidature_project=?",
      [id1, id2]
    );

    if (!current.length) {
      throw generateError(`This candidature does not exists`, 404);
    }

    if (
      current.FK_candidature_coder !== req.auth.id1 &&
      req.auth.role !== "admin"
    ) {
      throw generateError(
        "You don't have privileges to delete this candidature"
      );
    }
    await connection.query(
      "DELETE from candidatures WHERE FK_candidature_coder=? AND FK_candidature_project=?",
      [id1, id2]
    );

    connection.release();

    res.send({
      status: "ok",
      message: `The candidature had been deleted`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  deleteCandidatures,
};
