////////REQUIRED MODULES///////////////////

require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const path = require("path");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Calling to the port
const port = process.env.PORT;

////////////////EXPORT CONTROLLERS/////////////

////CODERS

const { loginCoders } = require("./controllers/coders/loginCoders");
const { createCoders } = require("./controllers/coders/createCoders");
const { validateCoder } = require("./controllers/coders/validateCoder");
const { editCoders } = require("./controllers/coders/editCoders");
const { viewProfileCoder } = require("./controllers/coders/viewProfile");
const {
  changeCoderPassword,
} = require("./controllers/coders/changeCoderPassword");
const { deleteCoders } = require("./controllers/coders/deleteCoder");

////COMPANIES

const { loginCompanies } = require("./controllers/companies/loginCompanies");
const {
  changeCompanyPassword,
} = require("./controllers/companies/changeCompanyPassword");
const { viewCompanies } = require("./controllers/companies/viewCompanies");
const { createCompanies } = require("./controllers/companies/createCompanies");
const { editCompanies } = require("./controllers/companies/editCompanies");
const { validateCompany } = require("./controllers/companies/validateCompany");
const { searchCompanies } = require("./controllers/companies/searchCompanies");
const { deleteCompanies } = require("./controllers/companies/deleteCompanies");

/////PROJECTS

const { createProjects } = require("./controllers/projects/createProjects");
const { filterProjects } = require("./controllers/projects/filterProjects");
const { searchProjects } = require("./controllers/projects/searchProjects");
const { showProjects } = require("./controllers/projects/showProjects");
const { editProjects } = require("./controllers/projects/editProjects");
const { deleteProjects } = require("./controllers/projects/deleteProjects");

////CANDIDATURES

const {
  showCandidatures,
} = require("./controllers/candidatures/showCandidatures");
const {
  createCandidatures,
} = require("./controllers/candidatures/createCandidature");
const {
  searchCandidatures,
} = require("./controllers/candidatures/searchCandidatures");
const {
  closeAllCandidatures,
} = require("./controllers/candidatures/closeAllCandidatures");
const {
  closeCandidature,
} = require("./controllers/candidatures/closeCandidature");

const {
  interestedCandidature,
} = require("./controllers/candidatures/interestedCandidatures");

const {
  deleteCandidatures,
} = require("./controllers/candidatures/deleteCandidatures");

const { userIsCoder, userIsCompany } = require("./middlewares/auth");

////////// ADMINISTRATOR FUNCTIONS

const { seeAllCoders } = require("./controllers/administrator/seeAllCoders");
const {
  seeAllCompanies,
} = require("./controllers/administrator/seeAllCompanies");
const {
  seeAllProjects,
} = require("./controllers/administrator/seeAllProjects");
const {
  seeAllCandidatures,
} = require("./controllers/administrator/seeAllCandidatures");
const {
  activateAccountCoder,
} = require("./controllers/administrator/activateAccountCoder");

const {
  activateAccountCompany,
} = require("./controllers/administrator/activateAccountCompany");

////////////////USED MIDDLEWARES/////////////////

//Using morgan middleware as developer
app.use(morgan("dev"));

//Body parsing middleware
app.use(bodyParser.json());

//Multipart parsing middleware
app.use(fileUpload());

//CORS Middleware
app.use(cors());

///////////ROUTES///////////////////

/*Coders*/
app.post("/coders/login", loginCoders);
app.post("/coders", createCoders);
app.get("/coders/:id", viewProfileCoder);
app.put("/coders/:id", editCoders);
app.post("/coders/:id/password", changeCoderPassword);
app.delete("/coders/:id", deleteCoders);
app.get("/coders/:id/validate", validateCoder);

/*Companies */

app.post("/companies/login", loginCompanies);
app.post("/companies", createCompanies);
app.get("/companies", viewCompanies);
app.get("/companies/:id", searchCompanies);

app.put("/companies/:id", editCompanies);
app.post("/companies/:id/password", changeCompanyPassword);
app.delete("/companies/:id", deleteCompanies);
app.get("/companies/:id/validate", validateCompany);

/*Projects*/

app.post("/projects/:id1", createProjects);
app.get("/projects", filterProjects);
app.get("/projects/:id", searchProjects);
app.get("/projects/companies/:id1", showProjects);
app.put("/projects/:id", editProjects);
app.delete("/projects/:id", deleteProjects);

/*Candidature*/
app.post("/users/:id1/candidatures/:id2", createCandidatures);
app.get("/coders/candidatures/:id", showCandidatures);
app.get("/companies/:id2/candidatures/:id1", searchCandidatures);
app.put(
  "/companies/:id1/candidatures/:id2/all",

  closeAllCandidatures
);
app.put(
  "/companies/:id1/candidatures/:id2/:id3",

  closeCandidature
);
app.put(
  "/companies/:id1/candidatures/interested/:id2/:id3",
  interestedCandidature
);
app.delete("/coders/candidatures/:id1", deleteCandidatures);

/* Administrator */

app.get("/all/coders", seeAllCoders);
app.get("/all/companies", seeAllCompanies);
app.get("/all/projects", seeAllProjects);
app.get("/all/candidatures/:id", seeAllCandidatures);
app.put("/account/coder/:id", activateAccountCoder);
app.put("/account/company/:id", activateAccountCompany);

//////////////ERRORS///////////////////
//Error middleware
app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.httpCode || 500).send({
    status: "error",
    message: error.message,
  });
});

//Not found error from routes
app.use((req, res) => {
  res.status(404).send({ status: "error", message: "Not found" });
});
/////////////////PORT///////////////////
//Port listening
app.listen(port, () => {
  console.log(`Server connected in ${port}`);
});
