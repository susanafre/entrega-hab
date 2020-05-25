//////////////Modules required////////////

const { getConnection } = require("../db");
const {
  searchSchema,
  entrySchemaUser,
  entrySchemaCompany,
  entrySchemaProject,
} = require("../validations/validations.js");
const {
  formatDateToDB,
  processAndSavePhoto,
  deletePhoto,
} = require("./helpers");

module.exports = {
  searchProjects,
  createProjects,
  deleteProjects,
  editProjects,
  searchCoders,
  createCoders,
  editCoders,
  deleteCoders,
  createCompanies,
  editCompanies,
  deleteCompanies,
  createCandidatures,
  deleteCandidatures,
};
