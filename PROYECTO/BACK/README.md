# MATCH CODER

## Descripción

### Plataforma para que empresas publiquen proyectos en lo que necesiten desarrolladores (especificando arquitectura, lenguajes, herramientas...) . Los desarrolladores seleccionarán los proyectos en los que participar.

## Pasos

Primero crearemos un archivo .env donde se añadirá la información de la base de datos, puertos y contraseñas...
Crearemos el archivo db.js que creará las conexiones a la base de datos. En este caso hemos añadido un máximo de 10 usuarios.
Posteriormente creamos un archivo initdb.js que nos creará la base de datos y unos datos iniciales. Sería recomendable usarlo únicamente para desarrollo.
Se creará una carpeta validations donde se añaden los archivos que ayudarán a validar los datos antes de añadirlos a la BBDD.
En helpers.js añadiremos funciones que se usarán en varias rutas y ayudarán a procesar y borrar fotos de avatar de los usuarios así como añadir fechas, generar errores o enviar mails a los usuarios.
En server.js se usarán los middlewares que necesitamos. También se especificarán las rutas, funcionalidades y que tipo de usuarios podrán realizar cada acción.
Hay una carpeta controllers donde se encuentran los controladores de cada entidad.

## Rutas

Se crearán en la carpeta de controllers las funciones de cada ruta. Se han divido en 4, una por cada entidad.

### CODERS

#### POST - /coders/login - se ejecutará la función "loginCoders"

La función loginCoders permite a los desarrolladores loguearse y devolverá un token válido. Si un usuario no está registrado saltará un error y si el usuario que intenta registrarse está registrado como empresa, saltará un mensaje para que se loguee como empresa.

#### POST - /coders - se ejecutará la función "createCoders"

La función createCoders permite a los desarrolladores crear un perfil. Habrá varios campos obligatiorios y los que no son obligatorios podrán rellenarse una vez creado el perfil. Se enviará un mail para validar la cuenta y activarla.

#### GET - /coders/:id - se ejecutará la función "viewProfileCoder"

Esta función permite ver el perfil a un desarrollador su propio perfil.

#### PUT - /coders/:id - se ejecutará la función "editCoders"

Permite a los usuarios editar el perfil de usuario.

#### POST -/coders/:id/password - se ejecutará la función "changeCoderPassword"

Esta función permite cambiar a los usuarios la contraseña actual. Para realizar la modificación es necesario repetir la nueva contraseña.

#### DELETE - /coders/:id - se ejecutará la función "deleteCoders"

Permite borrar el perfil de un desarrollador.

#### GET - /coders/:id/validate - se ejecutará la función "validateCoder"

Permite validar y activar la cuenta de un usuario con lo que podrá hacer login una vez realizada esta acción.

### COMPANIES

#### POST - /companies/login - se ejecutará la función "loginCompanies"

La función loginCompanies permite loguearse a las empresas y devolverá un token válido. Si un usuario no está registrado saltará un error y si el usuario que intenta registrarse está registrado como desarrollador, saltará un mensaje para que se loguee como tal.

#### POST - /companies - se ejecutará la función "createCompanies"

Permite a las empresas crear un perfil. Habrá varios campos obligatiorios y los que no son obligatorios podrán rellenarse una vez creado el perfil. Se enviará un mail para validar la cuenta y activarla.

#### GET - /companies/:id - se ejecutará la función "searchCompanies"

Permite a todos los usuarios (registrados o no) ver el perfil de una empresa.

#### PUT - /companies/:id - se ejecutará la función "editCompanies"

Permite editar el perfil de usuario de una empresa.

#### POST - /companies/:id/password - se ejecutará la función "changeCompanyPassword"

Permite cambiar la contraseña del perfil. Para realizar dicho cambio debe repetirse la nueva contraseña.

#### DELETE - /companies/:id - se ejecutará la función "deleteCompanies"

Permite borrar el perfil de una empresa.

#### GET - /companies/:id/validate - se ejecutará la función "validateCompany"

Permite validar y activar la cuenta de una empresa para poder hacer log in posteriormente.

### PROJECTS

#### POST - /projects/:id - se ejecutará la función "createProjects"

Permite a las empresas crear proyectos.

#### GET - /projects - se ejecutará la función "filterProjects"

Se podrá filtrar por nombre de proyecto, tecnologías, lenguaje o fecha de entrega. No es necesario estar registrado.

#### GET - /projects/:id - se ejecutará la función "searchProjects"

Esta función permite ver los proyectos pertenecientes a una empresa. No es necesario estar registrado.

#### PUT - /projects/:id - se ejecutará la función "editProjects"

Permite a la empresa a la que pertenece el proyecto, modificar datos sobre el mismo.

#### DELETE - /projects/:id -se ejecutará la función "deleteProjects"

Permite borrar un proyecto.

### CANDIDATURES

#### POST - /users/:id1/candidatures/:id2 - se ejecutará la función "createCandidatures"

Permite a un desarrollador inscribirse y presentar una candidatura a un proyecto. Le llegará un mail conforme se ha inscrito para el proyecto.

#### GET - coders/:id/candidatures/ - se ejecutará la función "showCandidatures"

Permite a un desarrollador poder ver todas las candidaturas a las que se ha presentado.

#### GET - /companies/:id1/candidatures/:id2 - se ejecutará la función "SearchCandidatures"

Esta función permite a una empresa ver todas las candidaturas que se han hecho a un proyecto suyo.

#### PUT - /companies/:id/candidatures - se ejecutará la función "closeAllCandidatures"

Cambia a estado "cerrado" todas las candidaturas de un proyecto. Se enviará un mail a todos los candidatos informando del cierre de las candidaturas.

#### PUT - /companies/:id1/candidatures/:id2/:id3 - se ejecutará la función "CloseCandidature"

Esta función cambia a estado "cerrado" la candidatura de un usuario a un proyecto. Se enviará un mail al usuario informando del cierre de la candidatura.

#### DELETE - /candidatures/:id - se ejecutará la función "deleteCandidatures"

Permite a un desarrollador borrar la candidatura a un proyecto.
