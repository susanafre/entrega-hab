/*El proyecto asignado es el 5 MATCH ENTRE CODERS Y PROYECTOS DE EMPRESAS
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
*/

drop database db_match_coder_prueba;

create database if not exists db_match_coder_prueba;

use db_match_coder_prueba;

 CREATE TABLE if not exists coders (
      PK_coder int primary key auto_increment,
      name varchar(20) not null,
      surname varchar(40) not null,
      phone_number varchar(13) not null,
      province varchar(30),
      email varchar(50) unique not null,
      password varchar(200) not null,
      photo varchar(255),
      language varchar(100) not null,
      technology varchar(100) not null,
      architecture varchar(100) not null,
      role enum('coder','admin') DEFAULT 'coder' NOT NULL,
      active boolean default false not null,
      modification_date timestamp default current_timestamp(),
      creation_date timestamp default current_timestamp(),
      lastPasswordUpdate datetime not null,
      registrationCode VARCHAR(255)  
      );

create table if not exists companies(

PK_company int primary key auto_increment,
      name varchar(30) not null,
      description text,
      province varchar(30),
      phone_number varchar(13) not null,
      email varchar(50) unique not null,
      password varchar(200) not null,
      web varchar(100),
      photo varchar(255),
      role enum("company","admin") DEFAULT "company" NOT NULL,
      active boolean default false not null,
      modification_date timestamp default current_timestamp(),
      creation_date timestamp default current_timestamp(),
      lastPasswordUpdate datetime not null,
       registrationCode VARCHAR(255)  
);

create table if not exists projects(

PK_project int primary key auto_increment,
    name varchar(200) not null,
    description text not null,
    delivery_date date not null,
    province varchar(30),
    language varchar(100) not null,
    technology varchar(100) not null,
    architecture varchar(100) not null,
    modification_date timestamp default current_timestamp(),
    creation_date timestamp default current_timestamp(),
    FK_project_company int,
    constraint FK_project_company
    FOREIGN KEY (FK_project_company)
    REFERENCES companies(PK_company)
    on delete cascade

);


create table if not exists candidatures(

 PK_candidature int primary key auto_increment,
      candidature_date timestamp default current_timestamp(),
      candidature_finished enum('En curso','Cerrado','Interesado') default 'En curso',
      creation_date timestamp default current_timestamp(),
      modification_date timestamp default current_timestamp(),
      FK_candidature_coder int,
      constraint FK_candidature_coder
      FOREIGN KEY (FK_candidature_coder)
      REFERENCES coders(PK_coder)
      on delete cascade,
      FK_candidature_project int,
      constraint FK_candidature_project 
      FOREIGN KEY (FK_candidature_project )
      REFERENCES projects(PK_project)
      on delete cascade

);



insert into coders(name,surname,phone_number,province,email,password,photo,language,technology,architecture,role,lastPasswordUpdate,active) values 
 ('Administrador','Administrator User',605037965,'Lugo','sfraga@gmail.com','','7ce3b8a0-b937-11ea-945b-05e4d047facf.jpg','SQL','mysql','back','admin',NOW(),true),
      ('Felipe','Dieguez Moz',295296290,'A Coruña','enim@cubilia.com','','63d12840-b7a5-11ea-9666-b565c5d4c11d.jpg','HTML, CSS, Javascript','Bootstrap','Front End','coder',NOW(),true),
      ('Manuel','Goñi Portero',992749718,'Pontevedra','arcu.vel.quam@NulladignissimMaecenas.net','a5140160-b7a5-11ea-9666-b565c5d4c11d.jpg','SQL','MySQL Workbench','FrontEnd','coder',NOW(),true);


insert into companies(name,description,province,phone_number,email,password,photo,role,web,lastPasswordUpdate,active) values 
('Administrador','Administrator user','Lugo',605037965,'sfraga@gmail.com','','f8cabd50-b7a3-11ea-9666-b565c5d4c11d.jpg','admin','',NOW(),true),
      ('Dentipol','Somos un equipo humano de dentistas liderado por el Doctor D. Eliseo Ferrán que trabajamos con el fin de ofrecer a nuestros pacientes la mejor atención odontológica y el asesoramiento necesario para guiar sus tratamientos. Contamos además con una sólida estructura que nos permite ofrecerte la mejor solución adaptada a cada caso, de manera inmediata. En Dentipol brindamos la mejor atención al paciente con experiencia de más de 20 años en el sector dental y profesionales cualificados que te ayudarán y guiarán a lo largo de tu tratamiento. En Dentipol nuestro objetivo es ofrecer a nuestros pacientes la mejor calidad en los tratamientos más innovadores para todas las áreas de la odontología: cirugía, ortodoncia, implantología, periodoncia, estética y blanqueamientos, endodoncia, etc. Buscando siempre como objetivo la solución que más se adapte a tus necesidades, contando siempre con alta tecnología en equipamiento médico. Dentipol pone a tu disposición las mejores clínicas dentales cerca de ti. Puedes encontrarnos a lo largo de todo el país, incluso en Italia y Portugal. Además tendrás la posibilidad de obtener una primera consulta gratuita. Queremos que nuestros pacientes se sientan a gusto, en un entorno de cuidado y calidad de servicio. Nuestra prioridad es tu salud dental y la de tu familia.','A Coruña',615890861,'kiseppotty-6384@yopmail.com','','e11dd3f0-b9e1-11ea-9bdd-59c90d128de0.jpg','company','http://www.dentipol.com',NOW(),true),
      ('Mis Rizos','Mis Rizos, somos un centro de peluquería y estética de Pontevedra abierto en el año 1970. En nuestro salón de belleza ofrecemos un trato familiar, los profesionales que trabajamos en Mis Rizos estamos siempre pendientes de las nuevas tendencias para ofrecer servicios de calidad. 
En nuestra peluquería trabajamos con los mejores productos para conseguir excelentes resultados y la satisfacción de nuestros clientes. Lo más importante para nosotros, lo que nos hace crecer eres tú, nuestro cliente. 
¡Te esperamos! ','Pontevedra',300956234,'jyrarrojix-6865@yopmail.com','','4f092070-b7a0-11ea-9666-b565c5d4c11d.jpg','company','http://www.misrizos.com',NOW(),true);




insert into projects(name,description,province,delivery_date,language,technology, architecture,FK_project_company) values 
('Crear aplicación de recetas","Crear aplicación de recetas','A Coruña','2020-12-31','HTML, CSS, Javascript','Angular','FrontEnd',1),
      ('Cambio de página web','Cambio de página web','A Coruña','2020-10-20','HTML, CSS, Javascript','React JS','Front End',2),
      ('Crear base de datos de clientes','Crear base de datos de clientes','A Coruña','2020-07-10','SQL','MySQL Workbench','FrontEnd',3),
      ('Creación de página web de empresa','Creación de página web de empresa','A Coruña','2021-01-01','HTML, CSS, Javascript','Bootstrap','Front End',1),
      ('Aplicación de mensajes para empresa de mensajería","Aplicación de mensajes para empresa de mensajería','A Coruña','2020-09-30','HTML, CSS, Javascript','Redux','Front End',2),
      ('Creación de un videojuego de arcade','Creación de un videojuego de arcade','A Coruña','2022-01-01','Python','Django','Back End',3),
      ('Crear nueva página web Back','Crear nueva página web Back','A Coruña','2020-10-01','Javascript node','Node js','Back End',1),
      ('Crear nueva página web End','Crear nueva página web End','A Coruña','2020-10-01','HTML, CSS, Javascript','Vue js','Front End',2),
      ('Crear aplicación de subida de archivos a nube','Crear aplicación de subida de archivos a nube','A Coruña','2022-03-01','Python','Django','Back End',3),
      ('Crear tienda online','Crear tienda online','A Coruña','2020-10-01','PHP','Laravel','Back End',3);



insert into candidatures(FK_candidature_coder,FK_candidature_project) values (2,2),(2,3),(3,3);
