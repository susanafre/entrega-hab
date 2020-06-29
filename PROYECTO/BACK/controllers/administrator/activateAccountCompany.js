//////////////Modules required////////////

const { getConnection } = require("../../db");

const { formatDateToDB, generateError } = require("../helpers");

////////////activateAccountCompany////////////

/* app.put("/account/company/:id", activateAccountCompany); */
async function activateAccountCompany(req, res, next) {
  let connection;
  try {
    const { id } = req.params;

    connection = await getConnection();

    //Check that the candidature exist
    const [
      current,
    ] = await connection.query("select * from companies where PK_company=?", [
      id,
    ]);

    if (!current.length) {
      throw generateError(`This user doesn't exist`, 404);
    }

    //Change the field candidature_finished
    const date = formatDateToDB(new Date());
    const [
      companies,
    ] = await connection.query(
      "UPDATE companies SET active=1,modification_date=? WHERE PK_company=?",
      [date, id]
    );

    res.send({
      status: "ok",
      data: companies,
      message: "This account has been activated.",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  activateAccountCompany,
};
