//////////////Modules required////////////

const { getConnection } = require("../../db");

const { formatDateToDB, generateError } = require("../helpers");

////////////activateAccountCoder////////////

/* app.put("/account/coder/:id", activateAccountCoder); */
async function activateAccountCoder(req, res, next) {
  let connection;
  try {
    const { id } = req.params;

    connection = await getConnection();

    //Check that the candidature exist
    const [
      current,
    ] = await connection.query("select * from coders where PK_coder=?", [id]);

    if (!current.length) {
      throw generateError(`This user doesn't exist`, 404);
    }

    //Change the field candidature_finished
    const date = formatDateToDB(new Date());
    const [
      coders,
    ] = await connection.query(
      "UPDATE coders SET active=1,modification_date=? WHERE PK_coder=?",
      [date, id]
    );

    res.send({
      status: "ok",
      data: coders,
      message: "This account has been activated.",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  activateAccountCoder,
};
