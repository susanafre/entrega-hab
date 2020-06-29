//////////////Modules required////////////

const { getConnection } = require("../../db");

const {
  formatDateToDB,
  generateError,
  sendEmailInterested,
} = require("../helpers");

////////////CLOSECANDIDATURE////////////

//PUT - /companies/:id1/candidatures/interested/:id2/:id3
async function interestedCandidature(req, res, next) {
  let connection;
  try {
    const { id1, id2, id3 } = req.params;

    connection = await getConnection();

    //Check that the candidature exist
    const [
      current,
    ] = await connection.query(
      "select * from candidatures where FK_candidature_coder=? and FK_candidature_project=?",
      [id3, id2]
    );

    if (!current.length) {
      throw generateError(`This project has no candidatures`, 404);
    }

    //Check that the company loged is the same the project
    const [
      company,
    ] = await connection.query(
      "select * from projects where PK_project=? and FK_project_company=?",
      [id2, id1]
    );

    //Change the field candidature_finished
    const date = formatDateToDB(new Date());
    const [
      candidatures,
    ] = await connection.query(
      "UPDATE candidatures SET candidature_state='Interesado',modification_date=? WHERE FK_candidature_coder=? and FK_candidature_project=?",
      [date, id3, id2]
    );

    //Get the coder's email
    const [
      coder,
    ] = await connection.query("select email from coders where PK_coder=?", [
      id3,
    ]);

    //Send an email

    try {
      await sendEmailInterested({
        email: coder[0].email,
        title: "La empresa está interesada en tu perfil",
        content: `En breves se pondrán en contacto contigo para poder darte más información.`,
      });
    } catch (error) {
      console.error(error.response.body);
      throw new Error("Error sending mail. Please try again later");
    }

    res.send({
      status: "ok",
      data: candidatures.info,
      message: "La empresa está interesada en tu perfil para su proyecto.",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  interestedCandidature,
};
