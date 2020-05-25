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
const { createCompanies } = require("./controllers/companies/createCompanies");
const { editCompanies } = require("./controllers/companies/editCompanies");
const { validateCompany } = require("./controllers/companies/validateCompany");
const { searchCompanies } = require("./controllers/companies/searchCompanies");
const { deleteCompanies } = require("./controllers/companies/deleteCompanies");

/////PROJECTS

const { createProjects } = require("./controllers/projects/createProjects");
const { filterProjects } = require("./controllers/projects/filterProjects");
const { searchProjects } = require("./controllers/projects/searchProjects");
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
  deleteCandidatures,
} = require("./controllers/candidatures/deleteCandidatures");

const { userIsCoder, userIsCompany } = require("./middlewares/auth");

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
app.get("/coders/:id", userIsCoder, viewProfileCoder);
app.put("/coders/:id", userIsCoder, editCoders);
app.post("/coders/:id/password", userIsCoder, changeCoderPassword);
app.delete("/coders/:id", userIsCoder, deleteCoders);
app.get("/coders/:id/validate", validateCoder);

/*Companies */

app.post("/companies/login", loginCompanies);
app.post("/companies", createCompanies);
app.get("/companies/:id", searchCompanies);
app.put("/companies/:id", userIsCompany, editCompanies);
app.post("/companies/:id/password", userIsCompany, changeCompanyPassword);
app.delete("/companies/:id", userIsCompany, deleteCompanies);
app.get("/companies/:id/validate", userIsCompany, validateCompany);

/*Projects*/

app.post("/projects/:id", userIsCompany, createProjects);
app.get("/projects", filterProjects);
app.get("/projects/:id", searchProjects);
app.put("/projects/:id", userIsCompany, editProjects);
app.delete("/projects/:id", userIsCompany, deleteProjects);

/*Candidature*/
app.post("/users/:id1/candidatures/:id2", userIsCoder, createCandidatures);
app.get("/coders/:id/candidatures", userIsCoder, showCandidatures);
app.get("/companies/:id1/candidatures/:id2", userIsCompany, searchCandidatures);
app.put(
  "/companies/:id1/candidatures/:id2/all",
  userIsCompany,
  closeAllCandidatures
);
app.put(
  "/companies/:id1/candidatures/:id2/:id3",
  userIsCompany,
  closeCandidature
);
app.delete("/coders/:id1/candidatures/:id2", userIsCoder, deleteCandidatures);

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
  console.log("Server connected");
});
