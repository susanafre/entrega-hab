//////////////////Required modules/////////////

const Joi = require("@hapi/joi");

//////////////Search//////////

const searchSchema = Joi.string()

  .min(2)
  .required()
  .error(new Error("El campo de búsqueda debe de ser de más de 2 caracteres"));

///////Coders////
const editSchemaUser = Joi.object().keys({
  name: Joi.string()
    .min(2)
    .max(20)
    .required()
    .error(
      new Error(
        "El campo Nombre es obligatorio y debe tener al menos 2 caracteres"
      )
    ),
  surname: Joi.string()
    .min(2)
    .max(40)
    .required()
    .error(
      new Error(
        "El campo Apellidos es obligatorio y debe tener al menos 2 caracteres"
      )
    ),
  phone_number: Joi.string()
    .min(9)
    .required()
    .max(13)
    .error(
      new Error(
        "El campo Teléfono es obligatio y debe contener un mínimo de 9 caracteres"
      )
    ),
  province: Joi.string()
    .min(2)
    .max(30)
    .error(new Error("El campo Provincia debe contener al menos 2 caracteres")),
  email: Joi.string()
    .required()
    .email()
    .error(
      new Error(
        "El campo email es obligatorio y debe tener un formato correcto"
      )
    ),
  photo: Joi.string(),
  language: Joi.string()
    .required()
    .max(100)
    .error(new Error('El campo "lenguage" es obligatorio')),
  technology: Joi.string()
    .required()
    .max(100)
    .error(new Error('El campo "tecnología" es obligatorio')),
  architecture: Joi.string()
    .required()
    .max(100)
    .error(new Error('El campo "arquitectura" es obligatorio')),
});

const entrySchemaUser = Joi.object().keys({
  name: Joi.string()
    .min(2)
    .max(20)
    .required()
    .error(
      new Error(
        "El campo Nombre es obligatorio y debe tener al menos 2 caracteres"
      )
    ),
  surname: Joi.string()
    .min(2)
    .max(40)
    .required()
    .error(
      new Error(
        "El campo Apellidos es obligatorio y debe tener al menos 2 caracteres"
      )
    ),
  phone_number: Joi.string()
    .min(9)
    .required()
    .max(13)
    .error(
      new Error(
        "El campo Teléfono es obligatio y debe contener un mínimo de 9 caracteres"
      )
    ),
  province: Joi.string()
    .min(2)
    .error(new Error("El campo Provincia debe contener al menos 2 caracteres")),
  email: Joi.string()
    .required()
    .email()
    .error(
      new Error(
        "El campo email es obligatorio y debe tener un formato correcto"
      )
    ),
  photo: Joi.string(),
  language: Joi.string()
    .required()
    .max(100)
    .error(new Error('El campo "lenguage" es obligatorio')),
  technology: Joi.string()
    .required()
    .max(100)
    .error(new Error('El campo "tecnología" es obligatorio')),
  architecture: Joi.string()
    .required()
    .max(100)
    .error(new Error('El campo "arquitectura" es obligatorio')),
  password: Joi.string()
    .min(6)
    .max(100)
    .required()
    .error(new Error("The password must have 6 characters or more.")),
});
///////////////////Companies////////////////////////////////////////////////
const entrySchemaCompany = Joi.object().keys({
  name: Joi.string()
    .min(2)
    .max(20)
    .required()
    .error(
      new Error(
        "El campo Nombre es obligatorio y debe tener al menos 2 caracteres"
      )
    ),
  description: Joi.string()
    .min(20)
    .error(
      new Error("El campo Descripción debe contener al menos 20 caracteres")
    ),
  phone_number: Joi.string()
    .min(9)
    .required()
    .max(13)
    .error(
      new Error(
        "El campo Teléfono es obligatio y debe contener un mínimo de 9 caracteres"
      )
    ),
  province: Joi.string()
    .min(2)
    .error(new Error("El campo Provincia debe contener al menos 2 caracteres")),
  email: Joi.string()
    .required()
    .email()
    .error(
      new Error(
        "El campo email es obligatorio y debe tener un formato correcto"
      )
    ),

  web: Joi.string()
    .uri()
    .error(new Error("El campo Web debe tener el formato https://")),
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
        "El campo Nombre es obligatorio y debe tener al menos 2 caracteres"
      )
    ),
  description: Joi.string()
    .min(20)
    .error(
      new Error("El campo Descripción debe contener al menos 20 caracteres")
    ),
  phone_number: Joi.string()
    .min(9)
    .required()
    .max(13)
    .error(
      new Error(
        "El campo Teléfono es obligatio y debe contener un mínimo de 9 caracteres"
      )
    ),
  province: Joi.string()
    .min(2)
    .error(new Error("El campo Provincia debe contener al menos 2 caracteres")),
  email: Joi.string()
    .required()
    .email()
    .error(
      new Error(
        "El campo email es obligatorio y debe tener un formato correcto"
      )
    ),

  web: Joi.string()
    .uri()
    .error(new Error("El campo Web debe tener el formato https://")),
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
        "El campo Nombre es obligatorio y debe tener al menos 2 caracteres"
      )
    ),
  description: Joi.string()
    .min(20)
    .error(
      new Error("El campo Descripción debe contener al menos 20 caracteres")
    ),
  delivery_date: Joi.date()
    .min(minDate)
    .iso()
    .required()
    .error(
      new Error(
        "El campo Fecha debe ser mayor que la fecha actual y tener el siguiente formato yyyy-mm-dd"
      )
    ),
  province: Joi.string()
    .min(2)
    .error(new Error("El campo Provincia debe contener al menos 2 caracteres")),
  language: Joi.string()
    .required()
    .max(100)
    .error(new Error('El campo "lenguage" es obligatorio')),
  technology: Joi.string()
    .required()
    .max(100)
    .error(new Error('El campo "tecnología" es obligatorio')),
  architecture: Joi.string()
    .required()
    .max(100)
    .error(new Error('El campo "arquitectura" es obligatorio')),
});

const entrySchemaCandidature = Joi.object().keys({});

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
    .error(new Error("The password must have 6 characters or more.")),
});

module.exports = {
  searchSchema,
  entrySchemaUser,
  entrySchemaCompany,
  entrySchemaProject,
  entrySchemaCandidature,
  loggedSchema,
  editPasswordSchema,
  editSchemaUser,
  editSchemaCompany,
};
