//////////////Modules required////////////

const { getConnection } = require("../../db");

const { generateError } = require("../helpers");

///////DELETE CANDIDATURE///////////
//DELETE - /candidatures/:id
async function deleteCandidatures(req, res, next) {
  let connection;
  try {
    const { id1 } = req.params;

    connection = await getConnection();

    const [
      current,
    ] = await connection.query(
      "select * from candidatures where PK_candidature=?",
      [id1]
    );
    console.log("Esto es current", current);
    if (!current.length) {
      throw generateError(`This candidature does not exists`, 404);
    }

    /* if (
      current.FK_candidature_coder !== req.auth.id1 &&
      req.auth.role !== "admin"
    ) {
      throw generateError(
        "You don't have privileges to delete this candidature"
      );
    } */
    await connection.query("DELETE from candidatures WHERE PK_candidature=?", [
      id1,
    ]);

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
