# MATCH CODER

## Descripción

### Plataforma para que empresas publiquen proyectos en lo que necesiten desarrolladores (especificando arquitectura, lenguajes, herramientas...) . Los desarrolladores seleccionarán los proyectos en los que participar.

## PASOS

Primero crearemos el proyecto vue con create vue nombreproyecto y añadimos las vistas.

En este caso he creado varias carpetas según el tipo de usuario que pueda ver dichas vistas.

En la carpeta de vistas estará la landing page donde se podrán filtrar los proyectos, loguearse los usuarios y poder ver las empresas a las que pertenecen los proyectos.

Un usuario logueado como coder, también podrá presentar candidaturas a los proyectos en esta misma vista.

En la ventana de login aparecerá la opción de registrarse. Será un link que lleve a dicha vista.

## USUARIOS

La autorización será mediada a través del archivo index.js que permitirá acceder a unas vistas u otras dependiendo del rol del usuario.

En el archivo utils.js hay funciones para guardar datos en localstorage como el login, id del usuario, nombre y rol.

En la carpeta assets se encontrarán las imágenes y fuentes que se usarán.

En main.js se han declarado las librerías necesarias para poder usarlas.

### CODERS

Habrá una vista para ver el perfil del coder, editarlo y poder eliminar el perfil.

También estará la vista para que un usuario se pueda registrar.

en CandidaturesCoder.vue se podrán ver las candidaturas en las que está incluido el coder, ver el estado de las mismas y eliminarlas.

### EMPRESAS

Habrá una vista para ver el perfil de la empresa, editarlo y poder eliminar el perfil.

Una vista será será para ver, editar o eliminar proyectos pertenecientes a la misma empresa. Se ha añadido un botón donde se podrán crear nuevos proyectos.

También hay una vista para poder gestionar las candidaturas de los coders. Se podrá cambiar el estado a cerrado, interesado o cerrar todas las candidaturas.

### ADMINISTRADOR

El administrador podrá ver todos los proyectos, coders, empresas y candidaturas. Se ha habilitado un botón para poder activar la cuenta de un usuario automáticamente.

También se ha añadido la opción de poder abrir una candidatura en caso de que esté cerrada.
