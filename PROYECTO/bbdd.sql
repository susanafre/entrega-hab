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

Dentro de la entidad candidatura, al ser gestionada por la empresa, ser para un proyecto y enviarla un desarrollador, he decidido añadir las claves foráneas de cada uno en dicha entidad.


*/



create database if not exists db_match_coder;

use db_match_coder;

create table if not exists Coders(

PK_coder int primary key auto_increment,
name varchar(20) not null,
surname varchar(40) not null,
phone_number int not null,
province varchar(30),
email varchar(30) not null unique,
username varchar(20) unique,
password varchar(20),
photo varchar(200),
language varchar(100) not null,
technology varchar(100) not null,
architecture varchar(100) not null,
creation_date timestamp default current_timestamp(),
modification_date timestamp default current_timestamp()
);

create table if not exists Companies(

PK_company int primary key auto_increment,
name varchar(30) not null,
description text not null,
province varchar(30),
phone_number int not null,
email varchar(30) not null unique,
username varchar(20) unique,
password varchar(20),
web varchar(30),
photo varchar(200),
creation_date timestamp default current_timestamp(),
modification_date timestamp default current_timestamp()
);

create table if not exists Projects(

PK_project int primary key auto_increment,
name varchar(200) not null,
description text not null,
delivery_date date not null,
language varchar(100) not null,
technology varchar(100) not null,
architecture varchar(100) not null,
creation_date timestamp default current_timestamp(),
modification_date timestamp default current_timestamp(),
FK_project_company int,
constraint FK_project_company
FOREIGN KEY (FK_project_company) 
REFERENCES Companies(PK_company)
on delete cascade

);


create table if not exists Candidatures(

PK_candidature int primary key auto_increment,
candidature_date date not null,
finished boolean default false,
creation_date timestamp default current_timestamp(),
modification_date timestamp default current_timestamp(),
FK_candidature_coder int,

constraint FK_candidature_coder
FOREIGN KEY (FK_candidature_coder)
REFERENCES Coders(PK_coder)
on delete cascade,

FK_candidature_project int,

constraint FK_candidature_project 
FOREIGN KEY (FK_candidature_project )
REFERENCES Projects(PK_project)
on delete cascade,

FK_candidature_company int,

constraint FK_candidature_company
FOREIGN KEY (FK_candidature_company)
REFERENCES Companies(PK_company)
on delete cascade
);



insert into Coders(name,surname,phone_number,province,email,username,language,technology,architecture) values 
('Felipe','Dieguez Mozo',295296290,'A Coruña','lacerraryw-0055@yopmail.com','FelipeDM','HTML, CSS, Javascript','Bootstrap','Front End'),
('Manuel','Goñi Portero',992749718,'Pontevedra','xekalaffy-5466@yopmail.com','ManuelGM','SQL','MySQL Workbench','FrontEnd'),
('Milagros','Jaramillo Anguita',845552772,'A Coruña','aceqemi-3078@yopmail.com','MilagrosJA','HTML, CSS, Javascript','React JS','Front End'),
('Daniel','Milla Holguin',342972592,'Lugo','wallaffullatt-2432@yopmail.com','DanielMH','HTML, CSS, Javascript','Angular','FrontEnd');


insert into Companies(name,description,province,phone_number,email,username,web) values 
('Dentipol S.A.','','A Coruña',615890861,'kiseppotty-6384@yopmail.com','Dentisa','www.dentipol.com'),
('Mis Rizos','','Pontevedra',300956234,'jyrarrojix-6865@yopmail.com','MisRizos','www.misrizos.com'),
('ConCos S.L.','','Pontevedra',689976226,'esefisu-9205@yopmail.com','ConCos','www.concossl.com'),
('Restaurante Da Vila','','Lugo',826406493,'errevemmuk-2203@yopmail.com','DaVila','www.restaurantedavila.com');



insert into Projects(name,description,delivery_date,language,technology,architecture,FK_project_company) values 
('Crear aplicación de recetas','','2020-12-31','HTML, CSS, Javascript','Angular','FrontEnd',4),
('Cambio de página web','','2020-10-20','HTML, CSS, Javascript','React JS','Front End',3),
('Crear base de datos de clientes','','2020-07-10','SQL','MySQL Workbench','FrontEnd',2),
('Creación de página web de empresa','','2021-01-01','HTML, CSS, Javascript','Bootstrap','Front End',1);


insert into Candidatures(candidature_date,FK_candidature_coder,FK_candidature_project,FK_candidature_company) values 
('2020-04-18',1,4,1),
('2020-04-30',2,3,2),
('2020-05-04',3,2,3),
('2020-06-05',4,1,4);


