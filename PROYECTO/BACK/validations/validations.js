//////////////////Required modules/////////////

const Joi = require("@hapi/joi");

//////////////Search//////////

const searchSchema = Joi.string()

  .min(2)
  .required()
  .error(new Error("This field must have more than 2 characters"));

///////Coders////

const entrySchemaCoder = Joi.object().keys({
  name: Joi.string()
    .min(2)
    .max(20)
    .required()
    .error(
      new Error(
        "The field Name is required and must have more than 2 characters"
      )
    ),
  surname: Joi.string()
    .min(2)
    .max(40)
    .required()
    .error(
      new Error(
        "The field Surname is required and must have more than 2 characters"
      )
    ),
  phone_number: Joi.string()
    .min(9)
    .required()
    .max(13)
    .error(
      new Error(
        "The field Phone is required and must have more than 9 characters"
      )
    ),
  province: Joi.string()
    .min(2)
    .error(
      new Error(
        "The field Province is required and must have more than 2 characters"
      )
    ),
  email: Joi.string()
    .required()
    .email()
    .error(
      new Error("The field email is required and must have a correct format")
    ),
  photo: Joi.string(),
  language: Joi.string()
    .min(2)
    .required()
    .max(100)
    .error(
      new Error(
        "The field Language is required and must have more than 2 characters"
      )
    ),
  technology: Joi.string()
    .min(2)
    .required()
    .max(100)
    .error(
      new Error(
        "The field Technology is required and must have more than 2 characters"
      )
    ),
  architecture: Joi.string()
    .min(2)
    .required()
    .max(100)
    .error(
      new Error(
        "The field Architecture is required and must have more than 2 characters"
      )
    ),
  password: Joi.string()
    .min(6)
    .max(100)
    .required()
    .error(new Error("The password must have 6 characters or more.")),
});

const editSchemaCoder = Joi.object().keys({
  name: Joi.string()
    .min(2)
    .max(20)
    .required()
    .error(
      new Error(
        "The field Name is required and must have more than 2 characters"
      )
    ),
  surname: Joi.string()
    .min(2)
    .max(40)
    .required()
    .error(
      new Error(
        "The field Surname is required and must have more than 2 characters"
      )
    ),
  phone_number: Joi.string()
    .min(9)
    .required()
    .max(13)
    .error(
      new Error(
        "The field Phone is required and must have more than 9 characters"
      )
    ),
  province: Joi.string()
    .min(2)
    .max(30)
    .error(
      new Error(
        "The field Province is required and must have more than 2 characters"
      )
    ),
  email: Joi.string()
    .required()
    .email()
    .error(
      new Error("The field Email is required and must have a correct format")
    ),
  photo: Joi.string(),
  language: Joi.string()
    .required()
    .min(2)
    .max(100)
    .error(
      new Error(
        "The field Language is required and must have more than 2 characters"
      )
    ),
  technology: Joi.string()
    .required()
    .min(2)
    .max(100)
    .error(
      new Error(
        "The field Technology is required and must have more than 2 characters"
      )
    ),
  architecture: Joi.string()
    .required()
    .min(2)
    .max(100)
    .error(
      new Error(
        "The field Architecture is required and must have more than 2 characters"
      )
    ),
});

///////////////////Companies////////////////////////////////////////////////
const entrySchemaCompany = Joi.object().keys({
  name: Joi.string()
    .min(2)
    .max(20)
    .required()
    .error(
      new Error(
        "The field Name is required and must have more than 2 characters"
      )
    ),
  description: Joi.string()
    .min(20)
    .error(
      new Error("The field Description must have more than 20 characters")
    ),
  phone_number: Joi.string()
    .min(9)
    .required()
    .max(13)
    .error(
      new Error(
        "The field Phone is required and must have more than 9 characters"
      )
    ),
  province: Joi.string()
    .min(2)
    .error(new Error("The field Province must have more than 2 characters")),
  email: Joi.string()
    .required()
    .email()
    .error(
      new Error("The field Email is required and must have a correct format")
    ),

  web: Joi.string()
    .uri()
    .error(new Error("The field Web must have the following format: https://")),
  photo: Joi.string(),
  password: Joi.string()
    .min(6)
    .max(100)
    .required()
    .error(new Error("The password must have 6 characters or more.")),
});
///////////////////////////////////////////////////////7
const editSchemaCompany = Joi.object().keys({
  name: Joi.string()
    .min(2)
    .max(20)
    .required()
    .error(
      new Error(
        "The field Name is required and must have more than 2 characters"
      )
    ),
  description: Joi.string()
    .min(20)
    .error(
      new Error("The field Description must have more than 20 characters")
    ),
  phone_number: Joi.string()
    .min(9)
    .required()
    .max(13)
    .error(
      new Error(
        "The field Phone is required and must have more than 9 characters"
      )
    ),
  province: Joi.string()
    .min(2)
    .error(new Error("The field Province must have more than 2 characters")),
  email: Joi.string()
    .required()
    .email()
    .error(
      new Error("The field Email is required and must have a correct format")
    ),

  web: Joi.string()
    .uri()
    .error(new Error("The field Web must have the following format: https://")),
  photo: Joi.string(),
});

////////////////////Project////////////////////////////////////////////
const minDate = new Date();

const entrySchemaProject = Joi.object().keys({
  name: Joi.string()
    .min(2)
    .max(200)
    .required()
    .error(
      new Error(
        "The field Name is required and must have more than 2 characters"
      )
    ),
  description: Joi.string()
    .min(20)
    .error(
      new Error("The field Description must have more than 20 characters")
    ),
  delivery_date: Joi.date()
    .min(minDate)
    .iso()
    .required()
    .error(
      new Error(
        "The field Delivery Date must be older the current date and must have the following format: yyyy-mm-dd"
      )
    ),
  province: Joi.string()
    .min(2)
    .error(new Error("The field Province must have more than 2 characters")),
  language: Joi.string()
    .min(2)
    .required()
    .max(100)
    .error(
      new Error(
        "The field Language is required and must have more than 2 characters"
      )
    ),
  technology: Joi.string()
    .min(2)
    .required()
    .max(100)
    .error(
      new Error(
        "The field Technology is required and must have more than 2 characters"
      )
    ),
  architecture: Joi.string()
    .min(2)
    .required()
    .max(100)
    .error(
      new Error(
        "The field Architecture is required and must have more than 2 characters"
      )
    ),
});

///////////////////Login////////////////////////
const loggedSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required()
    .error(new Error("The provided email is not well formed.")),
  password: Joi.string()
    .min(6)
    .max(100)
    .required()
    .error(new Error("The password must have 6 characters or more.")),
});

///////////EditPasswordSchema/////////////////
const editPasswordSchema = Joi.object().keys({
  oldPassword: Joi.string()
    .min(6)
    .max(100)
    .required()
    .error(new Error("The password must have 6 characters or more.")),
  newPassword: Joi.string()
    .min(6)
    .max(100)
    .required()
    .error(new Error("The password must have 6 characters or more.")),
  newPasswordRepeat: Joi.string()
    .min(6)
    .max(100)
    .required()
    .error(new Error("The password must have 6 characters or more.")),
});

module.exports = {
  searchSchema,
  entrySchemaCoder,
  entrySchemaCompany,
  entrySchemaProject,
  loggedSchema,
  editPasswordSchema,
  editSchemaCoder,
  editSchemaCompany,
};
