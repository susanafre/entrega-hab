////////REQUIRED MODULES///////////////////
const { getConnection } = require("./db");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { randomString } = require("./controllers/helpers");
////////Process argv/////////
/* Se inicia con npm initdb.js --data */
const args = process.argv;
const addData = args[2] === "--data";

async function main() {
  // Get reference to db
  const connection = await getConnection();

  //Drop Tables
  console.log("Dropping tables");

  await connection.query("SET FOREIGN_KEY_CHECKS = 0");
  await connection.query("DROP TABLE IF EXISTS coders");
  await connection.query("DROP TABLE IF EXISTS companies");
  await connection.query("DROP TABLE IF EXISTS projects");
  await connection.query("DROP TABLE IF EXISTS candidatures");
  await connection.query("SET FOREIGN_KEY_CHECKS = 1");

  // Create table Coders
  await connection.query(`
    CREATE TABLE coders (
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
      role enum("coder","admin") DEFAULT "coder" NOT NULL,
      active boolean default false not null,
      modification_date timestamp default current_timestamp(),
      creation_date timestamp default current_timestamp(),
      lastPasswordUpdate datetime not null,
      registrationCode VARCHAR(255)  
      )
      `);

  //Create tables Companies
  await connection.query(`
    CREATE TABLE companies (
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
      )
      `);

  //Create table Projects
  await connection.query(`
    CREATE TABLE projects (
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
    on delete cascade)`);

  //Create table Candidatures
  await connection.query(`
    CREATE TABLE candidatures (
      PK_candidature int primary key auto_increment,
      candidature_date timestamp default current_timestamp(),
      candidature_state enum("En curso","Cerrado","Interesado") default "En curso",
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
      on delete cascade)`);

  console.log("Adding admin user");

  //Insert data into tables
  if (addData) {
    console.log("Adding initial data");

    const password = await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD, 10);

    //Coders
    await connection.query(`INSERT INTO coders(name,surname,phone_number,province,email,password,photo,language,technology,architecture,role,lastPasswordUpdate,active)
      VALUES
      ("Administrador","Administrator User","605037965","Lugo","sfraga@gmail.com","${password}","7ce3b8a0-b937-11ea-945b-05e4d047facf.jpg","SQL","mysql","back","admin",NOW(),true),
      ("Felipe","Dieguez Moz","295296290","A Coruña","enim@cubilia.com","${await bcrypt.hash(
        "",
        10
      )}","63d12840-b7a5-11ea-9666-b565c5d4c11d.jpg","HTML, CSS, Javascript","Bootstrap","Front End","coder",NOW(),true),
      ("Manuel","Goñi Portero","992749718","Pontevedra","arcu.vel.quam@NulladignissimMaecenas.net","${await bcrypt.hash(
        "",
        10
      )}","a5140160-b7a5-11ea-9666-b565c5d4c11d.jpg","SQL","MySQL Workbench","FrontEnd","coder",NOW(),true)`);

    //Companies
    await connection.query(`
    INSERT INTO companies(name,description,province,phone_number,email,password,photo,role,web,lastPasswordUpdate,active) 
      VALUES 
      ("Dentipol","Somos un equipo humano de dentistas liderado por el Doctor D. Eliseo Ferrán que trabajamos con el fin de ofrecer a nuestros pacientes la mejor atención odontológica y el asesoramiento necesario para guiar sus tratamientos. Contamos además con una sólida estructura que nos permite ofrecerte la mejor solución adaptada a cada caso, de manera inmediata. En Dentipol brindamos la mejor atención al paciente con experiencia de más de 20 años en el sector dental y profesionales cualificados que te ayudarán y guiarán a lo largo de tu tratamiento. En Dentipol nuestro objetivo es ofrecer a nuestros pacientes la mejor calidad en los tratamientos más innovadores para todas las áreas de la odontología: cirugía, ortodoncia, implantología, periodoncia, estética y blanqueamientos, endodoncia, etc. Buscando siempre como objetivo la solución que más se adapte a tus necesidades, contando siempre con alta tecnología en equipamiento médico. Dentipol pone a tu disposición las mejores clínicas dentales cerca de ti. Puedes encontrarnos a lo largo de todo el país, incluso en Italia y Portugal. Además tendrás la posibilidad de obtener una primera consulta gratuita. Queremos que nuestros pacientes se sientan a gusto, en un entorno de cuidado y calidad de servicio. Nuestra prioridad es tu salud dental y la de tu familia.","A Coruña",615890861,"kiseppotty-6384@yopmail.com","${await bcrypt.hash(
        "",
        10
      )}","e11dd3f0-b9e1-11ea-9bdd-59c90d128de0.jpg","company","http://www.dentipol.com",NOW(),true),
      ("Mis Rizos","Mis Rizos, somos un centro de peluquería y estética de Pontevedra abierto en el año 1970. En nuestro salón de belleza ofrecemos un trato familiar, los profesionales que trabajamos en Mis Rizos estamos siempre pendientes de las nuevas tendencias para ofrecer servicios de calidad. 
En nuestra peluquería trabajamos con los mejores productos para conseguir excelentes resultados y la satisfacción de nuestros clientes. Lo más importante para nosotros, lo que nos hace crecer eres tú, nuestro cliente. 
¡Te esperamos! ","Pontevedra",300956234,"jyrarrojix-6865@yopmail.com","${await bcrypt.hash(
      "",
      10
    )}","4f092070-b7a0-11ea-9666-b565c5d4c11d.jpg","company","http://www.misrizos.com",NOW(),true)`);

    //Projects
    await connection.query(`
    INSERT INTO projects(name,description,province,delivery_date,language,technology, architecture,FK_project_company) 
      VALUES ("Crear aplicación de recetas","Crear aplicación de recetas","A Coruña","2020-12-31","HTML, CSS, Javascript","Angular","FrontEnd",1),
      ("Cambio de página web","Cambio de página web","A Coruña","2020-10-20","HTML, CSS, Javascript","React JS","Front End",2),
      ("Crear base de datos de clientes","Crear base de datos de clientes","A Coruña","2020-07-10","SQL","MySQL Workbench","FrontEnd",1),
      ("Creación de página web de empresa","Creación de página web de empresa","A Coruña","2021-01-01","HTML, CSS, Javascript","Bootstrap","Front End",1),
      ("Aplicación de mensajes para empresa de mensajería","Aplicación de mensajes para empresa de mensajería","A Coruña","2020-09-30","HTML, CSS, Javascript","Redux","Front End",2),
      ("Creación de un videojuego de arcade","Creación de un videojuego de arcade","A Coruña","2022-01-01","Python","Django","Back End",2),
      ("Crear nueva página web Back","Crear nueva página web Back","A Coruña","2020-10-01","Javascript node","Node js","Back End",1),
      ("Crear nueva página web End","Crear nueva página web End","A Coruña","2020-10-01","HTML, CSS, Javascript","Vue js","Front End",2),
      ("Crear aplicación de subida de archivos a nube","Crear aplicación de subida de archivos a nube","A Coruña","2022-03-01","Python","Django","Back End",1),
      ("Crear tienda online","Crear tienda online","A Coruña","2020-10-01","PHP","Laravel","Back End",3)`);

    //Candidatures
    await connection.query(`
    INSERT INTO candidatures(FK_candidature_coder,FK_candidature_project) 
      VALUES (2,2),(2,3),(3,3)`);

    console.log("Adding admin user");

    connection.release();
    process.exit();
  }
}
main();
