////////REQUIRED MODULES///////////////////

require("dotenv").config();

const { format } = require("date-fns");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs-extra");
const uuid = require("uuid");
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");

//Path for uploaded images
const imageUploadPath = path.join(__dirname, process.env.UPLOADS_DIR);

///////////////FormatDateToDB//////////////////
// Format a date to DB
function formatDateToDB(creation_date) {
  return format(creation_date, "yyyy-MM-dd HH:mm:ss");
}

///////////////ProcessAndSavePhoto//////////////////
// Save a photo and get filename
async function processAndSavePhoto(uploadedImage) {
  // Random File name to be saved
  const savedFileName = `${uuid.v1()}.jpg`;

  // Ensure the uploads path exists
  await fs.ensureDir(imageUploadPath);

  // Process image
  const finalImage = sharp(uploadedImage.data);

  // Check image size
  const imageInfo = await finalImage.metadata();

  // If image is wider than 500px resize it
  if (imageInfo.width > 500) {
    finalImage.resize(500);
  }

  // Save image
  await finalImage.toFile(path.join(imageUploadPath, savedFileName));

  return savedFileName;
}

///////////////DeletePhoto////////////
// Delete a photo
async function deletePhoto(imagePath) {
  await fs.unlink(path.join(imageUploadPath, imagePath));
}

/////////////generateError//////////////
//Generate an error
function generateError(message, code) {
  const error = new Error(message);
  if (code) error.httpCode = code;
  return error;
}

///////////////RandomString////////////////
//Create a random string for activation code
function randomString(size = 20) {
  return crypto.randomBytes(size).toString("hex").slice(0, size);
}

//////////SendEmailValidation//////////////////
//email validation account
async function sendEmailValidation({ email, title, content }) {
  sgMail.setApiKey(process.env.SENDGRID_KEY);

  const msg = {
    to: email,
    from: "sfraga2009@gmail.com",
    subject: title,
    text: content,
    html: `<div>
    <h1>Valida tu cuenta de email</h1>
    <p>${content}</p>
    </div>`,
  };

  await sgMail.send(msg);
}

///////////////SendEmailCandidature/////////////////
//send an email when a candidature is created
async function sendEmailCandidature({ email, title, content }) {
  sgMail.setApiKey(process.env.SENDGRID_KEY);

  const msg = {
    to: email,
    from: "sfraga2009@gmail.com",
    subject: title,
    text: content,
    html: `<div>
    <h1>Has presentado tu candidatura a un proyecto</h1>
    <p>${content}</p>
    </div>`,
  };

  await sgMail.send(msg);
}

///////////////SendEmailCloseCandidature////////////////
//send email when the candidatures are closed
async function sendEmailCloseCandidature({ email, title, content }) {
  sgMail.setApiKey(process.env.SENDGRID_KEY);

  const msg = {
    to: email,
    from: "sfraga2009@gmail.com",
    subject: title,
    text: content,
    html: `<div>
    <h1>El proceso ha finalizado</h1>
    <p>${content}</p>
    </div>`,
  };

  await sgMail.send(msg);
}

///////////////SendEmailCloseCandidature////////////////
//send email when the candidatures are closed
async function sendEmailInterested({ email, title, content }) {
  sgMail.setApiKey(process.env.SENDGRID_KEY);

  const msg = {
    to: email,
    from: "sfraga2009@gmail.com",
    subject: title,
    text: content,
    html: `<div>
    <h1>La empresa está interesada en tu perfil</h1>
    <p>${content}</p>
    </div>`,
  };

  await sgMail.send(msg);
}

module.exports = {
  formatDateToDB,
  processAndSavePhoto,
  deletePhoto,
  generateError,
  randomString,
  sendEmailValidation,
  sendEmailCandidature,
  sendEmailCloseCandidature,
  sendEmailInterested,
};
