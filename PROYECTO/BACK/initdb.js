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
      candidature_finished enum("En curso","Cerrado","Interesado") default "En curso",
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
      ("Susana","Fraga Rego","605037965","Lugo","sfraga@gmail.com","${password}","7ce3b8a0-b937-11ea-945b-05e4d047facf.jpg","SQL","mysql","back","admin",NOW(),true),
      ("Felipe","Dieguez Moz","295296290","A Coruña","enim@cubilia.com","${await bcrypt.hash(
        "usuariocoder1",
        10
      )}","","HTML, CSS, Javascript","Bootstrap","Front End","coder",NOW(),true),
      ("Manuel","Goñi Portero","992749718","Pontevedra","arcu.vel.quam@NulladignissimMaecenas.net","${await bcrypt.hash(
        "yFym0O3VJL",
        10
      )}","","SQL","MySQL Workbench","FrontEnd","coder",NOW(),true),

("Ángel","Llacer de Blas",213163343,"Ourense","nunc.interdum@leo.ca","${await bcrypt.hash(
      "exlCOmnV8R",
      10
    )}","","Python","Django","Back End","coder",NOW(),true),
("Jose Francisco","Moran Poveda",432557486,"Lugo","suscipit@adipiscing.edu","${await bcrypt.hash(
      "BoLU7iowyh",
      10
    )}","","PHP","Laravel","Back End","coder",NOW(),true),
("Teresa","Moscoso Lozano",662294548,"A Coruña","Suspendeque@vestibulum.org","${await bcrypt.hash(
      "wJhDHnsFnA",
      10
    )}","","Ruby","Ruby on Rails","Back End","coder",NOW(),true),
("Tomás","Vilalta Arribas",119331335,"A Coruña","elit.pharetra.ut@pretiumaliquetmetus.com","${await bcrypt.hash(
      "fy96ftDdRA",
      10
    )}","","Javascript Node","Node JS","Back End","coder",NOW(),true),
("Emilio","Sala Recio",414722645,"A Coruña","nascetur.ridiculus@rhoncusProin.co.uk","${await bcrypt.hash(
      "jWhhp42ZIt",
      10
    )}","","HTML, CSS, Javascript","React js","Front End","coder",NOW(),true),
("Víctor","Jordán Larrea",567517188,"Pontevedra","convallis.ligula@ac.com","${await bcrypt.hash(
      "vnglNY9ZS1",
      10
    )}","","HTML, CSS, Javascript","Redux","Front End","coder",NOW(),true),
("Carlos","Tercero Tomas",877985868,"Pontevedra","eros@ornare.org","${await bcrypt.hash(
      "Hu2i1dBJYy",
      10
    )}","","HTML, CSS, Javascript","Angular","Front End","coder",NOW(),true),
("Victoria","Ripoll Lorite",355823854,"Lugo","mauris@ametorci.ca","${await bcrypt.hash(
      "eysgJUwZH7",
      10
    )}","","HTML, CSS, Javascript","Bootstrap","Front End","coder",NOW(),true),
("Mario","Baez Anton",143137432,"Ourense","erat@lacusNullatincidunt.edu","${await bcrypt.hash(
      "x45OGjZCTf",
      10
    )}","","HTML, CSS, Javascript","Foundation","Front End","coder",NOW(),true),
("Luis Miguel","Balde Riesco",499966645,"A Coruña","ligula@ornareelitelit.com","${await bcrypt.hash(
      "tkaJdqDv8E",
      10
    )}","","Python","Django","Back End","coder",NOW(),true) 

`);

    //Companies
    await connection.query(`
    INSERT INTO companies(name,description,province,phone_number,email,password,photo,role,web,lastPasswordUpdate,active) 
      VALUES ("Susana","Administrador","Lugo","605037965","sfraga@gmail.com","${password}","","admin","",NOW(),true),
      ("Dentipol","Clínica Odontológica","A Coruña",615890861,"kiseppotty-6384@yopmail.com","${await bcrypt.hash(
        "usuariocompany1",
        10
      )}","","company","http://www.dentipol.com",NOW(),true),
      ("Mis Rizos","Peluquería","Pontevedra",300956234,"jyrarrojix-6865@yopmail.com","${await bcrypt.hash(
        "7C4X46r9k2",
        10
      )}","","company","http://www.misrizos.com",NOW(),true),
      ("ConCos","Empresa conservera","Pontevedra",689976226,"esefisu-9205@yopmail.com","${await bcrypt.hash(
        "ndkKTBREOm",
        10
      )}","","company","http://www.concossl.com",NOW(),true),
      ("DaVila","Restaurante","Lugo",826406493,"errevemmuk-2203@yopmail.com","${await bcrypt.hash(
        "V7ri494r6W",
        10
      )}","","company","http://www.restaurantedavila.com",NOW(),true),
      ("Ainyx","Empresa Web Hosting","A Coruña",88623842,"fgerrets5@scribd.com","${await bcrypt.hash(
        "rssfm1sKLr",
        10
      )}","","company","http://www.ainyx.com",NOW(),true),
      ("Yodo","Empresa construcción","A Coruña",219130603,"bborzone6@drupal.org","${await bcrypt.hash(
        "X9UB3PnZZ8",
        10
      )}","","company","http://www.yodo.com",NOW(),true),
      ("Gabspot","Empresa mensajería","A Coruña",186589308,"atidswell7@va.gov","${await bcrypt.hash(
        "pjc8WqI9wP",
        10
      )}","","company","http://www.gabspot.com",NOW(),true),
      ("Feednation","Empresa videojuegos","Pontevedra",937331314,"slewsey8@nydailynews.com","${await bcrypt.hash(
        "tdqUYFTqZN",
        10
      )}","","company","http://www.feednation.com",NOW(),true),
      ("Eire","Tienda de ropa","A Coruña",922163917,"cwrightson9@blinklist.com","${await bcrypt.hash(
        "i1KChoddfw",
        10
      )}","","company","http://www.eire.com",NOW(),true)`);

    //Projects
    await connection.query(`
    INSERT INTO projects(name,description,province,delivery_date,language,technology, architecture,FK_project_company) 
      VALUES ("Crear aplicación de recetas","Crear aplicación de recetas","A Coruña","2020-12-31","HTML, CSS, Javascript","Angular","FrontEnd",1),
      ("Cambio de página web","Cambio de página web","A Coruña","2020-10-20","HTML, CSS, Javascript","React JS","Front End",2),
      ("Crear base de datos de clientes","Crear base de datos de clientes","A Coruña","2020-07-10","SQL","MySQL Workbench","FrontEnd",3),
      ("Creación de página web de empresa","Creación de página web de empresa","A Coruña","2021-01-01","HTML, CSS, Javascript","Bootstrap","Front End",4),
      ("Aplicación de mensajes para empresa de mensajería","Aplicación de mensajes para empresa de mensajería","A Coruña","2020-09-30","HTML, CSS, Javascript","Redux","Front End",5),
      ("Creación de un videojuego de arcade","Creación de un videojuego de arcade","A Coruña","2022-01-01","Python","Django","Back End",6),
      ("Crear nueva página web Back","Crear nueva página web Back","A Coruña","2020-10-01","Javascript node","Node js","Back End",7),
      ("Crear nueva página web End","Crear nueva página web End","A Coruña","2020-10-01","HTML, CSS, Javascript","Vue js","Front End",8),
      ("Crear aplicación de subida de archivos a nube","Crear aplicación de subida de archivos a nube","A Coruña","2022-03-01","Python","Django","Back End",9),
      ("Crear tienda online","Crear tienda online","A Coruña","2020-10-01","PHP","Laravel","Back End",1)`);

    //Candidatures
    await connection.query(`
    INSERT INTO candidatures(FK_candidature_coder,FK_candidature_project) 
      VALUES (1,3),(2,4),(3,5)`);

    console.log("Adding admin user");

    connection.release();
    process.exit();
  }
}
main();
