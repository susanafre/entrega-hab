////////////////MODULES////////////

require("dotenv").config();

//////////////Functions imported////////////

const { getConnection } = require("../../db");

const { generateError } = require("../helpers");

/* app.get("/all/coders", seeAllCoders) */

async function seeAllCoders(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const [coders] = await connection.query("SELECT * from coders");

    if (!coders.length) {
      throw generateError(`There's no any coders`, 404);
    }

    /*  //Check if the loged user is the same to see profile
        if (coderData.PK_coder !== req.auth.id && req.auth.role !== "admin") {
          throw generateError("You don't have privileges to edit this user", 401);
        } */

    res.send({
      status: "ok",
      data: coders,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  seeAllCoders,
};
