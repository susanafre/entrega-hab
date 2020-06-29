//////////////Modules required////////////

require("dotenv").config();

/////////////Functions required////////////

const { getConnection } = require("../../db");

const { generateError } = require("../helpers");

////////////////////SEARCHCOMPANIES//////////////////
//GET - /companies/:id

async function searchCompanies(req, res, next) {
  let connection;
  try {
    const { id } = req.params;
    connection = await getConnection();

    //Check if company is on the DB
    const [
      companies,
    ] = await connection.query("SELECT * from companies WHERE PK_company=?", [
      id,
    ]);

    //If company is not on the DB, give an error
    if (!companies.length) {
      throw generateError(`The entry with id ${id} does not exist`, 404);
    }

    const [companyData] = companies;

    /* //Check if the loged user is the same to see profile
    if (companyData.PK_coder !== req.auth.id && req.auth.role !== "admin") {
      throw generateError("You don't have privileges to edit this user", 401);
    } */

    const payload = {
      name: companyData.name,
      description: companyData.description,
      province: companyData.province,
      phone_number: companyData.phone_number,
      web: companyData.web,
      photo: companyData.photo,
      role: companyData.role,
    };

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
  viewProfileCompany,
};
