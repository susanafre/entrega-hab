//////////////Modules required////////////

const { getConnection } = require("../db");
const {
  searchSchema,
  entrySchemaUser,
  entrySchemaCompany,
  entrySchemaProject,
} = require("../validations/validations.js");
const {
  formatDateToDB,
  sendEmailCandidature,
  sendEmailCloseCandidature,
} = require("./helpers");

////////////CLOSECANDIDATURE////////////
//############NO SE USARÁ###########//
//PUT - /candidatures/:id
async function closeCandidature(req, res, next) {
  let connection;
  try {
    const { id } = req.params;

    connection = await getConnection();

    const [
      current,
    ] = await connection.query(
      "select * from candidatures where FK_candidature_coder=?",
      [id]
    );

    if (!current.length) {
      const error = new Error(`There's no candidatures with the id ${id}`);
      error.httpCode = 404;
      throw error;
    }

    const date = formatDateToDB(new Date());
    const [
      candidatures,
    ] = await connection.query(
      "UPDATE candidatures SET candidature_finished=1,modification_date=? WHERE FK_candidature_coder=?",
      [date, id]
    );

    res.send({
      status: "ok",
      data: candidatures.info,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  createCandidatures,
  searchCandidatures,
  closeCandidature,
  closeAllCandidatures,
  deleteCandidatures,
};
