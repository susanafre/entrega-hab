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



create database if not exists db_match_coder;

use db_match_coder;

create table if not exists Coders(

PK_coder int primary key auto_increment,
name varchar(20) not null,
surname varchar(40) not null,
phone_number int not null,
province varchar(30),
email varchar(50) not null unique,
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
email varchar(50) not null unique,
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
on delete cascade

);



insert into Coders(name,surname,phone_number,province,email,username,language,technology,architecture) values 
('Felipe','Dieguez Mozo',295296290,'A Coruña','enim@cubilia.com','FelipeDM','HTML, CSS, Javascript','Bootstrap','Front End'),
('Manuel','Goñi Portero',992749718,'Pontevedra','arcu.vel.quam@NulladignissimMaecenas.net','ManuelGM','SQL','MySQL Workbench','FrontEnd'),
('Milagros','Jaramillo Anguita',845552772,'A Coruña','elit.a.feugiat@interdumenim.edu','MilagrosJA','HTML, CSS, Javascript','React JS','Front End'),
('Daniel','Milla Holguin',342972592,'Lugo','Aenean.eget@egestasAliquam.co.uk','DanielMH','HTML, CSS, Javascript','Angular','Front End'),
('Ángel','Llacer de Blas',213163343,'Ourense','nunc.interdum@leo.ca','AngelLB','Python','Django','Back End'),
('Jose Francisco','Moran Poveda',432557486,'Lugo','suscipit@adipiscing.edu','JoseFMP','PHP','Laravel','Back End'),
('Teresa','Moscoso Lozano',662294548,'A Coruña','Suspendeque@vestibulum.org','TeresaMP','Ruby','Ruby on Rails','Back End'),
('Tomás','Vilalta Arribas',119331335,'A Coruña','elit.pharetra.ut@pretiumaliquetmetus.com','TomasVA','Javascript Node','Node JS','Back End'),
('Emilio','Sala Recio',414722645,'A Coruña','nascetur.ridiculus@rhoncusProin.co.uk','EmilioSR','HTML, CSS, Javascript','React js','Front End'),
('Víctor','Jordán Larrea',567517188,'Pontevedra','convallis.ligula@ac.com','VictorJL','HTML, CSS, Javascript','Redux','Front End'),
('Carlos','Tercero Tomas',877985868,'Pontevedra','eros@ornare.org','CarlosTT','HTML, CSS, Javascript','Angular','Front End'),
('Victoria','Ripoll Lorite',355823854,'Lugo','mauris@ametorci.ca','VictoriaRL','HTML, CSS, Javascript','Bootstrap','Front End'),
('Mario','Baez Anton',143137432,'Ourense','erat@lacusNullatincidunt.edu','MarioBA','HTML, CSS, Javascript','Foundation','Front End'),
('Luis Miguel','Balde Riesco',499966645,'A Coruña','ligula@ornareelitelit.com','LuisMBR','Python','Django','Back End'),
('Antonio','Borrego Ivars',773376711,'A Coruña','feugiat.non@enimgravidasit.co.uk','AntonioBI','PHP','Laravel','Back End'),
('Jose Angel','Polanco Cubero',526144124,'A Coruña','sed.orci@semmolestie.org','JoseAPC','Ruby','Ruby on Rails','Back End'),
('María Elena','Juanquera Aranda',221171966,'Pontevedra','consequat.lectus@commodoipsumSuspendisse.com','MelenaJA','HTML, CSS, Javascript','Vue js','Front End'),
('Guillermo','Iglesias Viana',324812729,'Pontevedra','ipsum@quis.net','GuillermoIV','Javascript Node','Node JS','Back End'),
('Mariano','Llanos Abarca',435519485,'Lugo','mus.Donec@augueac.co.uk','MarianoLA','HTML, CSS, Javascript','React js','Front End'),
('Agustín','Canals Marchante',336261955,'Ourense','montes.nascetur@luctusvulputatenisi.org','AgustinCM','HTML, CSS, Javascript','Redux','Front End'),
('Aitor','Lavin Goncalves',894455479,'A Coruña','conubia.nostra@quam.ca','AitorLG','HTML, CSS, Javascript','Angular','Front End'),
('Nuria','Gamero Gómez',848516863,'A Coruña','Suspendisse.tristique.neque@vestibulum.org','NuriaGG','HTML, CSS, Javascript','Foundation','Front End'),
('Jose Ramón','Agudo Godoy',154174649,'A Coruña','enim@ornareegestasligula.ca','JoseRAG','HTML, CSS, Javascript','Bootstrap','Front End'),
('Félix','Marina Garrido',182487275,'Pontevedra','diam@luctusutpellentesque.com','FelixMG','Python','Django','Back End'),
('Fernando','Arredondo Herraiz',192134456,'Pontevedra','Cras.lorem.lorem@cursus.com','FernandoAH','PHP','Laravel','Back End'),
('Albert','Viera Montañés',343865777,'Lugo','hymenaeos.Mauris.ut@ullamcorper.ca','AlbertVM','Ruby','Ruby on Rails','Back End'),
('Pedro','San Miguel Caparrós',768496782,'Ourense','sapien.imperdiet@quis.org','PedroSMC','Javascript Node','Node JS','Back End'),
('Ramón','Giménez Brito',322516376,'A Coruña','non.sollicitudin@sed.co.uk','RamonGB','HTML, CSS, Javascript','React js','Front End'),
('María Mar','Catalán Solano',318617858,'A Coruña','non.sapien.molestie@enimNuncut.com','MariaMCS','HTML, CSS, Javascript','Redux','Front End'),
('Patricia','Antequera Bertomeu',127254917,'A Coruña','ultricies.adipiscing.enim@malesuadafamesac.edu','PatriciaAB','Python','Django','Back End'),
('Diego','Mascaro Rama',968975687,'Pontevedra','sem.ut@utaliquamiaculis.ca','DiegoMR','HTML, CSS, Javascript','Angular','Front End'),
('Josep','Escobar Fraga',729812952,'Pontevedra','et.libero.Proin@tellus.edu','JosepEF','Python','Django','Back End'),
('Roberto','Ezquerro Arnal',478258696,'Lugo','at@auctorveliteget.ca','RobertoEA','PHP','Laravel','Back End'),
('Manuela','Ocampo Gascón',833214483,'Ourense','Duis.ac.arcu@gravidaPraesent.co.uk','ManuelaOG','Javascript Node','Node JS','Back End'),
('Jaime','Baron Novoa',186557197,'A Coruña','dictum.Phasellus.in@montesnasceturridiculus.edu','JaimeBN','HTML, CSS, Javascript','Vue js','Front End'),
('Jose Miguel','Adell Cerón',318949937,'A Coruña','quis.accumsan@Cumsociisnatoque.co.uk','JoseMAC','HTML, CSS, Javascript','React js','Front End'),
('María Nieves','Tur Trejo',344241513,'A Coruña','nostra.per@nonummyultriciesornare.co.uk','MariaNTT','HTML, CSS, Javascript','Redux','Front End'),
('Joaquín','Junquera Montenegro',198616829,'Pontevedra','at.iaculis.quis@eleifend.net','JoaquinJM','HTML, CSS, Javascript','React js','Front End'),
('Mariano','Aznar Garay',642436293,'Pontevedra','non@ametdiameu.net','MarianoAG','PHP','Laravel','Back End'),
('Francisco José','Gras Toscano',854572281,'Lugo','laoreet.lectus.quis@adipiscing.edu','FranciscoJGT','Javascript Node','Node JS','Back End'),
('Noelia','Larrañaga Merchan',947582551,'Ourense','pretium.aliquet.metus@dolortempus.org','NoeliaLM','HTML, CSS, Javascript','React js','Front End'),
('María Rosa','De Los Reyes Conejero',669348766,'A Coruña','augue@non.co.uk','MariaRRC','Python','Django','Back End');


insert into Companies(name,description,province,phone_number,email,username,web) values 
('Dentipol','Clínica Odontológica','A Coruña',615890861,'kiseppotty-6384@yopmail.com','ekerfut5','www.dentipol.com'),
('Mis Rizos','Peluquería','Pontevedra',300956234,'jyrarrojix-6865@yopmail.com','croseman6','www.misrizos.com'),
('ConCos','Empresa conservera','Pontevedra',689976226,'esefisu-9205@yopmail.com','ksyson7','www.concossl.com'),
('DaVila','Restaurante','Lugo',826406493,'errevemmuk-2203@yopmail.com','gallston8','www.restaurantedavila.com'),
('Ainyx','Empresa Web Hosting','A Coruña',88623842,'fgerrets5@scribd.com','hlambertazzi9','www.ainyx.com'),
('Yodo','Empresa construcción','A Coruña',219130603,'bborzone6@drupal.org','sguillouxa','www.yodo.com'),
('Gabspot','Empresa mensajería','A Coruña',186589308,'atidswell7@va.gov','ahalidayb','www.gabspot.com'),
('Feednation','Empresa videojuegos','Pontevedra',937331314,'slewsey8@nydailynews.com','cdursleyc','www.feednation.com'),
('Eire','Tienda de ropa','A Coruña',922163917,'cwrightson9@blinklist.com','fcloughtond','www.eire.com'),
('Youtags','Agencia Inmobiliaria','Lugo',309597378,'jhugginsa@nationalgeographic.com','isiudae','www.youtags.com'),
('Divape','Asesoría','Ourense',181782913,'nbeazleyb@nih.gov','trumneyf','www.divape.com'),
('Feedspan','Empresa TIC','A Coruña',689287949,'dblakesleec@issuu.com','wcaistorg','www.feedspan.com'),
('Abata','Empresa videojuegos','Pontevedra',213194507,'sloudiand@dyndns.org','hescaleh','www.abata.com'),
('Babbleset','Empresa tecnologías TIC','A Coruña',346934389,'ngiacopazzie@paginegialle.it','llevingi','www.babbleset.com'),
('Miboo','Empresa telecomunicaciones','Lugo',397693880,'gblawf@weibo.com','kreddochj','www.miboo.com'),
('Twiyo','Empresa textil','Lugo',211703828,'pdonnellang@webs.com','sbroadfootk','www.twiyo.com'),
('Omba','Agencia de viajes','A Coruña',866027845,'gmaniloveh@cargocollective.com','kbrionl','www.omba.com'),
('Kazu','Empresa tecnológica','A Coruña',799128069,'kpinori@ibm.com','jbugdallm','www.kazu.com'),
('Meemm','Empresa bancaria','Pontevedra',255633786,'cbrilj@posterous.com','cpophamn','www.meemm.com'),
('Realblab','Empresa Fontaneria','Pontevedra',502469014,'yglynk@ucoz.ru','oyegorovo','www.realblab.com'),
('Voonte','Cadena de supermercados','Ourense',819937925,'sjancsol@diigo.com','eoliphandp','www.voonte.com'),
('Skimia','Empresa telecomunicaciones','A Coruña',661481365,'tmutchm@alexa.com','rdiessq','www.skimia.com'),
('Gigashots','Empresa informática','A Coruña',554937051,'atowlen@economist.com','gcoppingr','www.gigashots.com'),
('Livetube','Empresa automovilística','Pontevedra',421591221,'jlaffoleylaneo@domainmarket.com','bhambribet','www.livetube.com'),
('Voolia','Centro tecnológico','A Coruña',759743001,'fleynhamp@livejournal.com','gcapunu','www.voolia.com'),
('Zava','Buscador de seguros','Ourense',623524113,'rfallsq@squarespace.com','ttimminsv','www.zava.com'),
('Kwimbee','Multinacional de automoción','Pontevedra',614704700,'tjindracekr@example.com','apinchonw','www.kwimbee.com'),
('Blognation','Empresa de creación de blogs','Lugo',876690396,'cmckinna16@webnode.com','pronciy','www.bolgnation.com'),
('Yakidoo','Periódico Local','A Coruña',574260616,'ghourican19@google.com.hk','cokerin10','www.yakidoo.com'),
('Wordtune','Emisora de radio','A Coruña',616768123,'sohenehan1b@amazon.de','gfrayne12','www.wordtune.com');



insert into Projects(name,description,delivery_date,language,technology,architecture,FK_project_company) values 
('Crear aplicación de recetas','','2020-12-31','HTML, CSS, Javascript','Angular','FrontEnd',4),
('Cambio de página web','','2020-10-20','HTML, CSS, Javascript','React JS','Front End',3),
('Crear base de datos de clientes','','2020-07-10','SQL','MySQL Workbench','FrontEnd',2),
('Creación de página web de empresa','','2021-01-01','HTML, CSS, Javascript','Bootstrap','Front End',1),
('Aplicación de mensajes para empresa de mensajería','','2020-09-30','HTML, CSS, Javascript','Redux','Front End',7),
('Creación de un videojuego de arcade','','2022-01-01','Python','Django','Back End',8),
('Crear nueva página web Back','','2020-10-01','Javascript node','Node js','Back End',29),
('Crear nueva página web End','','2020-10-01','HTML, CSS, Javascript','Vue js','Front End',29),
('Crear aplicación de subida de archivos a nube','','2022-03-01','Python','Django','Back End',5),
('Crear tienda online','','2020-10-01','PHP','Laravel','Back End',9),
('Crear aplicación para crear blogs','','2022-04-01','Javascript node','Node js','Back End',28),
('Crear aplicación para crear blogs','','2022-04-01','HTML, CSS, Javascript','Vue js','Front End',28),
('Crear programa de contabilidad','','2020-12-31','Python','Django','Back End',11),
('Crear plataforma de subida de vídeos online','','2020-09-10','Javascript node','Node js','Back End',14),
('Crear nueva aplicación de RRSS','','2022-05-01','Python','Django','Back End',18);



insert into Candidatures(candidature_date,FK_candidature_coder,FK_candidature_project) values 
('2020-04-18',1,4),
('2020-04-30',2,3),
('2020-05-04',3,2),
('2020-06-05',4,1),
('2020-03-12',30,15),
('2020-04-02',18,11),
('2020-05-18',32,15),
('2020-06-22',14,6),
('2020-07-05',17,12),
('2020-04-15',27,11),
('2020-03-30',39,10),
('2020-05-30',24,9),
('2020-07-20',24,13),
('2020-06-11',42,15),
('2020-05-01',32,6),
('2020-04-22',34,7),
('2020-03-10',10,5);



