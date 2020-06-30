//////////////Modules required////////////

const { getConnection } = require("../../db");

const {
  formatDateToDB,
  sendEmailCloseCandidature,
  generateError,
} = require("../helpers");

/////////////CLOSEALLCANDIDATURES//////////
//PUT - companies/:id/candidatures/all
async function closeAllCandidatures(req, res, next) {
  let connection;
  try {
    const { id1, id2 } = req.params;

    connection = await getConnection();

    const [
      current,
    ] = await connection.query(
      "select * from candidatures ca inner join projects po on ca.FK_candidature_project=po.PK_project inner join companies co on po.FK_project_company=co.PK_company where po.FK_project_company=? and ca.FK_candidature_project=?",
      [id1, id2]
    );

    const [
      coders,
    ] = await connection.query(
      "select co.email from coders co inner join candidatures ca on co.PK_coder=ca.FK_candidature_coder where ca.FK_candidature_project=?",
      [id2]
    );

    /*  console.log("esto es req.auth.id1:", req.auth.id); */
    console.log("Esto es current:", current[0].PK_company);

    /*  if (current[0].PK_company !== req.auth.id && req.auth.role !== "admin") {
      throw generateError(
        "You don't have privileges to change this information",
        401
      );
    }
    if (!current.length) {
      throw generateError(`This project has no candidatures`, 404);
    } */

    const date = formatDateToDB(new Date());
    const [
      candidatures,
    ] = await connection.query(
      "UPDATE candidatures ca inner join projects po on ca.FK_candidature_project=po.PK_project inner join companies co on po.FK_project_company=co.PK_company SET ca.candidature_state='Proceso cerrado',ca.modification_date=? WHERE po.FK_project_company=? and ca.FK_candidature_project=?",
      [date, id1, id2]
    );

    for (const coder of coders) {
      try {
        await sendEmailCloseCandidature({
          email: coder.email,
          title: "The selection process has been closed",
          content: `The company has closed this process`,
        });
      } catch (error) {
        console.error(error.response.body);
        throw new Error("Error sending mail. Please try again later");
      }
    }

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
  closeAllCandidatures,
};
