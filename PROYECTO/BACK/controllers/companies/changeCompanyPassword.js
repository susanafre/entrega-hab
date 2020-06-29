//////////////Modules required////////////

require("dotenv").config();
const bcrypt = require("bcrypt");

/////////////Functions required////////////

const { getConnection } = require("../../db");
const { editPasswordSchema } = require("../../validations/validations");
const { generateError } = require("../helpers");

////////////////CHANGEPASSWORD///////////////////
async function changeCompanyPassword(req, res, next) {
  let connection;

  try {
    const { id } = req.params;

    connection = await getConnection();

    await editPasswordSchema.validateAsync(req.body);

    const { oldPassword, newPassword, newPasswordRepeat } = req.body;

    //The company must be the same as his profile
    /* if (Number(id) !== req.auth.id) {
      const error = new Error(
        "You don't have privileges to edit this company's password"
      );
      error.httpCode = 401;
      throw error;
    } */

    //The new password must be different from the old password
    if (oldPassword === newPassword) {
      throw generateError(
        "The new password cannot be the same as the old password",
        400
      );
    }

    //Select the coder id
    const [
      currentCompany,
    ] = await connection.query(
      "SELECT PK_company,password FROM companies WHERE PK_company=?",
      [id]
    );

    if (!currentCompany) {
      const error = new Error("This company doesn't exist");
      error.httpCode = 404;
      throw error;
    }

    const [dbCompany] = currentCompany;

    //check if the new password and repetition are the same
    if (newPasswordRepeat && newPassword !== newPasswordRepeat) {
      const error = new Error("The new password and its repetition must agree");
      error.httpCode = 400;
      throw error;
    }

    const passwordsMatch = await bcrypt.compare(
      oldPassword,
      dbCompany.password
    );

    //Check if the old password is correct
    if (!passwordsMatch) {
      throw generateError("Your old password is incorrect", 401);
    }

    const dbNewPassword = await bcrypt.hash(newPassword, 10);

    //Change the password and update lastPasswordUpdate
    await connection.query(
      `UPDATE companies SET password=?,lastPasswordUpdate=NOW() WHERE PK_company=?`,
      [dbNewPassword, id]
    );

    res.send({
      status: "ok",
      message: "Password has been changed",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  changeCompanyPassword,
};
