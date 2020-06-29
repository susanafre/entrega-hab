////////////////MODULES////////////

require("dotenv").config();

//////////////Functions imported////////////

const { getConnection } = require("../../db");

const { generateError } = require("../helpers");

///////////viewCompanies/////////////

//GET - /companies
async function viewCompanies(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const [companies] = await connection.query(
      "select * from companies order by name  limit 4;"
    );

    //console.log("Esto es companies:", companies);

    if (!companies) {
      const error = new Error("There's no companies.");
      error.httpCode = 404;
      throw error;
    }

    connection.release();
    res.send({
      status: "ok",
      data: companies,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  viewCompanies,
};
