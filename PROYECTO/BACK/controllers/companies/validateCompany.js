//////////////Modules required////////////

require("dotenv").config();

/////////////Functions required////////////

const { getConnection } = require("../../db");

const { generateError } = require("../helpers");

////////////////////VALIDATECOMPANIES/////////////////
//GET - /companies/:id/validate

async function validateCompany(req, res, next) {
  let connection;

  try {
    const { code } = req.query;

    connection = await getConnection();

    const [
      result,
    ] = await connection.query(
      "UPDATE companies SET active=1,registrationCode=NULL where registrationCode=?",
      [code]
    );

    if (result.affectedRows === 0) {
      throw generateError("Incorrect validation", 400);
    }

    res.send({
      status: "ok",
      message: "User account validated, now you can login",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  validateCompany,
};
