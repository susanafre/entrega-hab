# MATCH CODER

El proyecto asignado es el 5 MATCH ENTRE CODERS Y PROYECTOS DE EMPRESAS

He decidido crear 4 entidades, una para la empresa, otra para los coders, otra para los proyectos que tienen las empresas y otro para las candidaturas.

Para las candidaturas he decidido que la empresa deberá gestionar quien va a colaborar en un proyecto ya que sino no tendría mucho sentido que un coder

pudiera sin ningún tipo de filtro participar en un proyecto.

La primera entidad que voy a crear será la de coder, en ella solicitaré datos como nombre, apellidos y un nombre de usuario que se usará a la hora de loguearse.

Ya que el campo de username se generará con la parte de backend, he decidido añadir un campo que sea username y contraseña que estarán vacíos por ahora.

Un desarrollador va a poder presentarse a varios proyectos y una empresa puede tener más de un proyecto por lo que no he añadido a estas instancias alguna clave foránea.

Para saber a quién pertenece cada proyecto he añadido una clave foránea dentro de la entidad de proyecto. Para saber a qué proyecto se presenta cada coder, he añadido la

clave foránea de coder dentro de la entidad candidatura. Creo que así es más fácil de manejar y no se duplican los datos.

En la entidad proyecto he decidido añadir los atributos de lenguaje, arquitectura y tecnologías en lugar de crear una entidad lenguaje o similar.

Dentro de la entidad candidatura, al ser para un proyecto y enviarla un desarrollador, he decidido añadir las claves foráneas de cada uno en dicha entidad.
