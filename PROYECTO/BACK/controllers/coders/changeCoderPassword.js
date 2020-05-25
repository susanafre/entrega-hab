////////////////MODULES////////////

require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//////////////Functions imported////////////

const { getConnection } = require("../../db");
const { editPasswordSchema } = require("../../validations/validations");
const { generateError } = require("../helpers");

//////////////CHANGEPASSWORD//////////////
async function changeCoderPassword(req, res, next) {
  let connection;

  try {
    const { id } = req.params;

    connection = await getConnection();

    await editPasswordSchema.validateAsync(req.body);

    const { oldPassword, newPassword, newPasswordRepeat } = req.body;

    //The coder must be the same as his profile
    if (Number(id) !== req.auth.id) {
      throw generateError(
        "You don't have privileges to edit this coder's password",
        401
      );
    }
    //The new password must be different from the old password
    if (oldPassword === newPassword) {
      throw generateError(
        "The new password cannot be the same as the old password",
        400
      );
    }

    //Select the coder id
    const [
      currentCoder,
    ] = await connection.query(
      "SELECT PK_coder,password FROM coders WHERE PK_coder=?",
      [id]
    );

    if (!currentCoder) {
      throw generateError("This coders doesn't exist", 404);
    }

    const [dbCoder] = currentCoder;

    //check if the new password and repetition are the same
    if (newPasswordRepeat && newPassword !== newPasswordRepeat) {
      throw generateError(
        "The new password and its repetition must agree",
        400
      );
    }

    const passwordsMatch = await bcrypt.compare(oldPassword, dbCoder.password);

    //Check if the old password is correct
    if (!passwordsMatch) {
      throw generateError("Your old password is incorrect", 401);
    }

    const dbNewPassword = await bcrypt.hash(newPassword, 10);

    //Change the password and update lastPasswordUpdate
    await connection.query(
      `UPDATE coders SET password=?,lastPasswordUpdate=NOW() WHERE PK_coder=?`,
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
  changeCoderPassword,
};
