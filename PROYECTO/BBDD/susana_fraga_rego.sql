CREATE DATABASE  IF NOT EXISTS `db_match_coder` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `db_match_coder`;
-- MySQL dump 10.13  Distrib 5.7.30, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: db_match_coder
-- ------------------------------------------------------
-- Server version	5.7.30-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `candidatures`
--

DROP TABLE IF EXISTS `candidatures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `candidatures` (
  `PK_candidature` int(11) NOT NULL AUTO_INCREMENT,
  `candidature_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modification_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `FK_candidature_coder` int(11) DEFAULT NULL,
  `FK_candidature_project` int(11) DEFAULT NULL,
  `candidature_state` enum('En curso','Candidatura cerrada','No sigues en el proceso','Sigues en el proceso') DEFAULT 'En curso',
  PRIMARY KEY (`PK_candidature`),
  KEY `FK_candidature_coder` (`FK_candidature_coder`),
  KEY `FK_candidature_project` (`FK_candidature_project`),
  CONSTRAINT `FK_candidature_coder` FOREIGN KEY (`FK_candidature_coder`) REFERENCES `coders` (`PK_coder`) ON DELETE CASCADE,
  CONSTRAINT `FK_candidature_project` FOREIGN KEY (`FK_candidature_project`) REFERENCES `projects` (`PK_project`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidatures`
--

LOCK TABLES `candidatures` WRITE;
/*!40000 ALTER TABLE `candidatures` DISABLE KEYS */;
INSERT INTO `candidatures` VALUES (1,'2020-06-25 17:50:27','2020-06-25 17:50:27','2020-06-25 17:50:27',1,3,'En curso'),(3,'2020-06-25 17:50:27','2020-06-25 17:50:27','2020-06-25 18:57:27',3,5,'En curso'),(7,'2020-06-29 09:51:47','2020-06-29 09:51:47','2020-06-29 09:51:47',2,1,'En curso'),(8,'2020-06-29 09:51:52','2020-06-29 09:51:52','2020-06-29 09:51:52',2,2,'En curso'),(9,'2020-06-29 09:51:57','2020-06-29 09:51:57','2020-06-29 09:51:57',2,3,'En curso'),(10,'2020-06-29 09:52:02','2020-06-29 09:52:02','2020-06-29 09:52:02',2,4,'En curso'),(11,'2020-06-29 09:52:08','2020-06-29 09:52:08','2020-06-29 09:52:08',2,5,'En curso'),(12,'2020-06-29 09:52:15','2020-06-29 09:52:15','2020-06-29 09:52:15',2,9,'En curso'),(13,'2020-06-29 09:52:28','2020-06-29 09:52:28','2020-06-29 09:52:28',2,6,'En curso'),(14,'2020-06-29 09:54:17','2020-06-29 09:54:17','2020-06-29 09:59:47',13,2,'En curso'),(17,'2020-06-30 13:13:21','2020-06-30 13:13:21','2020-06-30 13:13:21',14,3,'En curso');
/*!40000 ALTER TABLE `candidatures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coders`
--

DROP TABLE IF EXISTS `coders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `coders` (
  `PK_coder` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `surname` varchar(40) NOT NULL,
  `phone_number` varchar(13) NOT NULL,
  `province` varchar(30) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `language` varchar(100) NOT NULL,
  `technology` varchar(100) NOT NULL,
  `architecture` varchar(100) NOT NULL,
  `role` enum('coder','admin') NOT NULL DEFAULT 'coder',
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `modification_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastPasswordUpdate` datetime NOT NULL,
  `registrationCode` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`PK_coder`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coders`
--

LOCK TABLES `coders` WRITE;
/*!40000 ALTER TABLE `coders` DISABLE KEYS */;
INSERT INTO `coders` VALUES (1,'Administrador','Admin','499906645','Prueba','sfraga@gmail.com','$2b$10$ISkgpU9.uqJogQPOd9duVuhhpK9yComSDyQQZRSMrAJ2LMdyKDxky','7ce3b8a0-b937-11ea-945b-05e4d047facf.jpg','Prueba','Prueba','Prueba','admin',1,'2020-06-25 17:50:26','2020-06-25 17:50:26','2020-06-30 18:08:33',NULL),(2,'Felipe','Dieguez Mozo','295296290','A Coruña','enim@cubilia.com','$2b$10$zkH4W0LjN.YbraH783KDF.hEmJ2Ic2sIGaDklF5sqsXzHhoUuZ/o2','63d12840-b7a5-11ea-9666-b565c5d4c11d.jpg','HTML, CSS, Javascript','Bootstrap','Front End','coder',1,'2020-06-28 13:12:45','2020-06-25 17:50:26','2020-06-25 19:50:26',NULL),(3,'Manuel','Goñi Portero','992749718','Pontevedra','arcu.vel.quam@NulladignissimMaecenas.net','$2b$10$w7zBr7mW.Ogu2cmyaTO6Z.6WySt6IBsIGTWsWdBd4VIiWvoZSrggq','a5140160-b7a5-11ea-9666-b565c5d4c11d.jpg','SQL','MySQL Workbench','BackEnd','coder',1,'2020-06-25 17:50:26','2020-06-25 17:50:26','2020-06-25 19:50:26',NULL),(4,'Ángel','Llacer de Blas','213163343','Ourense','nunc.interdum@leo.ca','$2b$10$R9WhdXHU7JnypATlD4j1rOX2cwOO7xJWoJ2gTrL.UpW7d8ZLDKwDa','d54335e0-b7a5-11ea-9666-b565c5d4c11d.jpg','Python','Django','BackEnd','coder',1,'2020-06-25 17:50:26','2020-06-25 17:50:26','2020-06-25 19:50:26',NULL),(5,'Jose Francisco',' Moran Poveda','432557486','Lugo','suscipit@adipiscing.edu','$2b$10$LELbzvC.Cd1iQuim.zPiSudgPvsLt4kKlbv1li77kHV4mg1qgorb6','03cb7120-b7a6-11ea-9666-b565c5d4c11d.jpg','PHP','Laravel','BackEnd','coder',1,'2020-06-25 17:50:26','2020-06-25 17:50:26','2020-06-25 19:50:26',NULL),(6,'Teresa','Moscoso Lozano','662294548','A Coruña','Suspendeque@vestibulum.org','$2b$10$NyGi0tNQgnW5Qn9.f35.BO1xwcflb5w2UKUWrxBBJh6w51NoKqn.q','2eb01fd0-b7a6-11ea-9666-b565c5d4c11d.jpg','Ruby','Ruby on Rails','BackEnd','coder',1,'2020-06-25 17:50:26','2020-06-25 17:50:26','2020-06-25 19:50:26',NULL),(7,'Tomás','Vilalta Arribas','119331335','A Coruña','elit.pharetra.ut@pretiumaliquetmetus.com','$2b$10$wpvum8AYOMefKLlnx9rhPubbCDjlNz6jrTuXBybdfE1eIjzFg.ym.','60e86ac0-b7a6-11ea-9666-b565c5d4c11d.jpg','Javascript Node','Node JS','BackEnd','coder',1,'2020-06-25 17:50:26','2020-06-25 17:50:26','2020-06-25 19:50:26',NULL),(8,'Emilio','Sala Recio','414722645','A Coruña','nascetur.ridiculus@rhoncusProin.co.uk','$2b$10$Q6NXxh9HqmGTUTQLctOfee.iQ/UgVvOR9SfEz/q8cl8dhBRLJjfL.','98487140-b7a6-11ea-9666-b565c5d4c11d.jpg','HTML, CSS, Javascript','React js','Front End','coder',1,'2020-06-25 17:50:26','2020-06-25 17:50:26','2020-06-25 19:50:26',NULL),(9,'Víctor','Jordán Larrea','567517188','Pontevedra','convallis.ligula@ac.com','$2b$10$t4AlczEvJZmSmJBTkX/uzeX9F2GKlamsi2lsJ4xAn/bk1kAWS9wIO','c7bda490-b7a6-11ea-9666-b565c5d4c11d.jpg','HTML, CSS, Javascript','Redux','Front End','coder',1,'2020-06-25 17:50:26','2020-06-25 17:50:26','2020-06-25 19:50:26',NULL),(10,'Carlos','Tercero Tomas','877985868','Pontevedra','eros@ornare.org','$2b$10$vg39do3JVrzW.sWb/C4Ai.8iNTHjVYeC7DSL9xj9OnKwk33aWoaGu','fb8e1bb0-b7a6-11ea-9666-b565c5d4c11d.jpg','HTML, CSS, Javascript','Angular','Front End','coder',1,'2020-06-25 17:50:26','2020-06-25 17:50:26','2020-06-25 19:50:26',NULL),(11,'Victoria','Ripoll Lorite','355823854','Lugo','mauris@ametorci.ca','$2b$10$Om4NwzrmcDCQ6IGP4ksBcOtsUNf30ypJV8E/ExGJDMR.iF1xLat32','22b10770-b7a7-11ea-9666-b565c5d4c11d.jpg','HTML, CSS, Javascript','Bootstrap','Front End','coder',1,'2020-06-25 17:50:26','2020-06-25 17:50:26','2020-06-25 19:50:26',NULL),(12,'Mario','Baez Anton','143137432','Ourense','erat@lacusNullatincidunt.edu','$2b$10$P6Qoyub6G4xtsUuTna3FHO8fz0FRF6p4VZheKfUkColE4JSvaTDgu','50b2ad90-b7a7-11ea-9666-b565c5d4c11d.jpg','HTML, CSS, Javascript','Foundation','Front End','coder',1,'2020-06-25 17:50:26','2020-06-25 17:50:26','2020-06-25 19:50:26',NULL),(13,'Luis Miguel','Balde Riesco','499966645','A Coruña','ligula@ornareelitelit.com','$2b$10$STxCRDSDCFUVn429V3UMqeomnyedgTr1RApcZTe88gfxyaYuwZ0Qy','86af5380-b7a7-11ea-9666-b565c5d4c11d.jpg','Python','Django','Back End','coder',1,'2020-06-25 17:50:26','2020-06-25 17:50:26','2020-06-25 19:50:26',NULL),(14,'Usuario de prueba','Prueba','499906645','Hola','susana@mail.com','$2b$10$I1MUkI0et0PDxnXrNGiqJeZNcirIltMv3TMFws5bdBty3rHTxsAX.','4511e860-ba46-11ea-9afe-ebc739036199.jpg','Prueba','Prueba','hola','coder',1,'2020-06-25 18:13:30','2020-06-25 18:13:30','2020-06-25 20:13:30','46297188a0184609ae9338f8a3fa26'),(15,'susana','prueba ','123456789','prueba','prueba@mail.com','$2b$10$l7E4fHKdHmy1HM3bR9HeQOEC6fwsQx/vhKP6sYoF.zJUx9WTCsMA2',NULL,'prueba','prueba','PRUEBA','coder',1,'2020-06-28 13:40:14','2020-06-27 10:55:06','2020-06-27 12:55:06','b1b0b1ca103756dfd6b96b2e310589'),(16,'test','test','123456789','test','test@mail.com','$2b$10$MMcXNtDtS.ZxoPKhsfEJU.en1we9Zl3Y.fBuc08fvliG1yTdCQcLG',NULL,'test','test','test','coder',0,'2020-06-27 10:55:47','2020-06-27 10:55:47','2020-06-27 12:55:47','c3f6b1dbe4b5f5df78fe93a84ff236'),(25,'test','test','123456789','test','sfraga2009@gmail.com','$2b$10$jeosVyCBNapWbAMzz5ctXOVxELb8IkKDf.nSNHZft2BIAXuRn752q',NULL,'test','test','test','coder',1,'2020-06-30 11:18:42','2020-06-30 11:18:42','2020-06-30 13:18:42',NULL);
/*!40000 ALTER TABLE `coders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companies` (
  `PK_company` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `description` text,
  `province` varchar(30) DEFAULT NULL,
  `phone_number` varchar(13) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `web` varchar(100) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `role` enum('company','admin') NOT NULL DEFAULT 'company',
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `modification_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastPasswordUpdate` datetime NOT NULL,
  `registrationCode` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`PK_company`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (2,'Dentipol','Somos un equipo humano de dentistas liderado por el Doctor D. Eliseo Ferrán que trabajamos con el fin de ofrecer a nuestros pacientes la mejor atención odontológica y el asesoramiento necesario para guiar sus tratamientos. Contamos además con una sólida estructura que nos permite ofrecerte la mejor solución adaptada a cada caso, de manera inmediata. En Dentipol brindamos la mejor atención al paciente con experiencia de más de 20 años en el sector dental y profesionales cualificados que te ayudarán y guiarán a lo largo de tu tratamiento. En Dentipol nuestro objetivo es ofrecer a nuestros pacientes la mejor calidad en los tratamientos más innovadores para todas las áreas de la odontología: cirugía, ortodoncia, implantología, periodoncia, estética y blanqueamientos, endodoncia, etc. Buscando siempre como objetivo la solución que más se adapte a tus necesidades, contando siempre con alta tecnología en equipamiento médico. Dentipol pone a tu disposición las mejores clínicas dentales cerca de ti. Puedes encontrarnos a lo largo de todo el país, incluso en Italia y Portugal. Además tendrás la posibilidad de obtener una primera consulta gratuita. Queremos que nuestros pacientes se sientan a gusto, en un entorno de cuidado y calidad de servicio. Nuestra prioridad es tu salud dental y la de tu familia.','Lugo','615890861','kiseppotty-6384@yopmail.com','$2b$10$l9yOWvSkTzDCsgL.c4vh2OP6n3Fe.CmNhY8TfCdnGeiftS6Hcp6R2','https://www.dentipol.com','03259030-ba43-11ea-9208-09f537caa9af.jpg','company',1,'2020-06-28 13:54:49','2020-06-25 17:50:27','2020-06-25 19:50:27',NULL),(3,'Mis Rizos','Mis Rizos, somos un centro de peluquería y estética de Pontevedra abierto en el año 1970. En nuestro salón de belleza ofrecemos un trato familiar, los profesionales que trabajamos en Mis Rizos estamos siempre pendientes de las nuevas tendencias para ofrecer servicios de calidad. \nEn nuestra peluquería trabajamos con los mejores productos para conseguir excelentes resultados y la satisfacción de nuestros clientes. Lo más importante para nosotros, lo que nos hace crecer eres tú, nuestro cliente. \n¡Te esperamos! ','Pontevedra','615890861','jyrarrojix-6865@yopmail.com','$2b$10$W.QMUWXmwL/58K88LnPQS.jjgYGBA7nYfVCDm/Bvn50Mu1auKmY.C','http://www.misrizos.co','4f092070-b7a0-11ea-9666-b565c5d4c11d.jpg','company',1,'2020-06-25 17:50:27','2020-06-25 17:50:27','2020-06-25 19:50:27',NULL),(4,'ConCos','En 1890,se establece industrialmente en Pontevedra, con el deseo de conservar y llevar a los lugares más alejados, la deliciosa frescura y sabor de los productos del mar Cantábrico. Ayudado por la excepcional calidad del pescado, implanta las nuevas técnicas de conservación provenientes de Francia, que le permiten introducir rápidamente sus elaborados en los mercados europeos.\nA partir de 1914, en \"ConCos S.l\", se empieza a exportar también al mercado norteamericano.\n\nUtilizamos las mejores materias primas , Bonito del Norte y Anchoa de primerísima calidad. Pescados especialmente seleccionados y siempre respetando las  artes de pesca tradicionales .\n\nNuestras conservas de Bonito del Norte y Anchoa se elaboran siguiendo un cuidadoso  proceso artesanal , perfeccionado y transmitido a lo largo de cinco generaciones.\nEste esmerado trabajo junto a la selección de las mejores materias primas - pescados, aceites y envases -, son la garantía para conseguir nuestro objetivo: conservas de una calidad excepcional.\n\nNuestras instalaciones están dotadas de innovadoras tecnologías con las que mejoramos las condiciones de mantenimiento, selección y envasado del producto, asegurando, de este modo, que llegue a su destino en óptimas condiciones.\nEsto, unido a un minucioso y estricto sistema de control de calidad, es lo que nos permite seguir contando con la confianza de los más exigentes mercados nacionales e internacionales.','Pontevedra','689976226','esefisu-9205@yopmail.com','$2b$10$sOM529hclzbThBc6aAGebud4oTKagl9kFtyyDxf2lPjKmTH.J9d/m','http://www.concossl.com','ad9f3aa0-b7a2-11ea-9666-b565c5d4c11d.jpg','company',1,'2020-06-25 17:50:27','2020-06-25 17:50:27','2020-06-25 19:50:27',NULL),(5,'DaVila','Historia y evolución, dos palabras para describir lo que os podéis encontrar al llegar a DaVila, la historia que seguimos escribiendo y que empezó en 1961 cuando Rosa y Juan no solo deciden iniciar una vida juntos, sino también hacer de este Restaurante su proyecto de vida, movidos mas por la ilusión que por el conocimiento en un principio, poco a poco consiguen dar solidez a este espacio, una oferta de producto, como no podía ser de otra forma en Galicia, de elaboraciones sencillas, pero que poco a poco va sufriendo una lógica evolución, inspirada en la gran cocina francesa del momento, arropada por la parte humana de la sala,  con un trato cálido y cercano, próximo pero a la vez profesional. ','Lugo','826406493','errevemmuk-2203@yopmail.com','$2b$10$sMwW1MPPViH7pWfL83NxU.Jxa6irh0O1KC60/.qC09vV49sFAH4xa','http://www.restaurantedavila.com','e565a410-b7a2-11ea-9666-b565c5d4c11d.jpg','company',1,'2020-06-25 17:50:27','2020-06-25 17:50:27','2020-06-25 19:50:27',NULL),(6,'Ainyx','Somos una de las principales empresas de Hosting y Registro de Dominios del mercado español. El espíritu joven, dinámico y creativo distingue nuestra propuesta de valor que reúne la máxima calidad de servicio a precios altamente competitivos.\nNuestra misión consiste en ayudar a nuestros clientes, particulares y profesionales, a conseguir sus objetivos con un alojamiento en Internet asequible, fiable y seguro. Para lograrlo contamos con la tecnología más avanzada y una trayectoria en el sector que iniciamos en 2000, proporcionándonos una dilatada experiencia para avalar la calidad de nuestras soluciones. Y, por supuesto, la garantía de pertenecer a un grupo líder mundial.\nEn nuestro ADN está el compromiso con la innovación y nuestra capacidad de reinventarnos continuamente para ofrecer siempre un servicio de máxima calidad a un precio razonable. Para conseguirlo, contamos con un equipo de profesionales comprometidos, altamente cualificados y orientados a alcanzar la máxima satisfacción del cliente.','A Coruña','886238422','fgerrets5@scribd.com','$2b$10$DuBNPmHRE3yK5wN12xsDkOHftfdBEy1NyamxaY7eruGNNNMSVCkMW','http://www.ainyx.com','22ecadb0-b7a3-11ea-9666-b565c5d4c11d.jpg','company',1,'2020-06-25 17:50:27','2020-06-25 17:50:27','2020-06-25 19:50:27',NULL),(7,'Yodo','Yodo nace de la ambición, ilusión y sobre todo conocimiento de los profesionales que la integran, todos con una amplia experiencia en el sector y capacitados para realizar todo tipo de proyectos teniendo siempre como objetivo la satisfacción del cliente y sus necesidades. \n\nEn nuestra empresa nos dedicamos a Gestionar, Dirigir y Construir cualquier tipo de proyecto, sea cual sea su envergadura, desde reformas (ya sean viviendas, locales, oficinas, etc.) pasando por construcción de viviendas unifamiliares, edificios comerciales, industriales, edificios de viviendas, hasta residenciales completos. ','A Coruña','219130603','bborzone6@drupal.org','$2b$10$RVml.gqx9iaqI6TXn/L/fO.0i0FN0j/nz4G8zc5PB7aCD1KcmmNnS','http://www.yodo.com','60062870-b7a3-11ea-9666-b565c5d4c11d.jpg','company',1,'2020-06-25 17:50:27','2020-06-25 17:50:27','2020-06-25 19:50:27',NULL),(8,'Gabspot','El Grupo Gabspot nace en 1977\n\nDe capital 100% nacional. Es la marca de Transporte urgente para envíos nacionales e internacionales con mayor implantación, más de 10.000 personas están vinculadas a la marca en más de 550 franquicias y 58 Plataformas Logísticas en Andorra, España, Gibraltar y Portugal.\nEl Grupo realiza una media de 62 millones de envíos anuales, aportando soluciones de negocio concretas para todo tipo de empresas y particulares.\nEn 2018, facturó más de 1.000 millones de euros en todo su perímetro.\nGabspot ha sido pionera en la implantación del e-Commerce y se ha convertido en especialista del sector, así como de satisfacer la demanda de los clientes particulares.\nLos valores diferenciales de Gabspot son Fiabilidad, Calidad, Rapidez, Innovación, Capilaridad, Sostenibilidad y Cercanía.','A Coruña','186589308','atidswell7@va.gov','$2b$10$ErXMp.MwnKkTeSCo5567TuoazTCN3gh39JA2oeREKx2wXfz2fsFCa','http://www.gabspot.com','9547bbc0-b7a3-11ea-9666-b565c5d4c11d.jpg','company',1,'2020-06-25 17:50:27','2020-06-25 17:50:27','2020-06-25 19:50:27',NULL),(9,'Feednation','Feednation nace bajo un ambiente de profunda tradición y se crea con el tiempo necesario para que alcance su madurez exacta. De esta forma, obtenemos un estudio independiente que conjuga, bajo la atenta mirada del silicio de nuestras barricas, artesanía y modernidad. En su interior, profesionales procedentes de Blizzard Entertainment, MercurySteam Entertainment, Pyro Studios, Sony Computer Entertainment y Weta Digital, se encuentran, combinando ideas y código, con la intención de proporcionar un aroma sorprendente en nuestras obras.\nHacer cosas pequeñas, con buen gusto, esa es nuestra filosofía… ¡y nuestro reto!\nAdelante. Pasen. Bienvenidos a la experiencia Feednation. Un lugar de encuentro para todos los apasionados de los juegos y del entretenimiento. ¡Os invitamos a un trago de nuestro trabajo!','Pontevedra','937331314','slewsey8@nydailynews.com','$2b$10$L0sMM0lMlddkxKY1yA4HB.3fVrLIgIKNLjDL30YcVuYAqTSMSqYJG','http://www.feednation.com','c8f43020-b7a3-11ea-9666-b565c5d4c11d.jpg','company',1,'2020-06-25 17:50:27','2020-06-25 17:50:27','2020-06-25 19:50:27',NULL),(10,'Eire','En el año 2015, Eire nace como un pequeño proyecto de venta de ropa para mujer online. Tras varios meses en el mercado, el proyecto comienza a crecer a pasos agigantados y Eire pasa a ser un referente a nivel nacional en cuanto a pronto moda y ecommerce creando su propia MARCA. Actualmente Eire cuenta con 7000m2 de almacén y 300m2 de oficina en sus instalaciones centrales de A Coruña desde donde se envían actualmente cerca de 700 pedidos/día con picos de 2500. Además, la firma, comienza a coger fuerza en el terreno offline, donde cuenta ya con 6 tiendas en diferentes ciudades del territorio nacional, destacando la I Megastore Eire de 1000m2, inaugurada en Pontevedra en 2019.','A Coruña','922163917','cwrightson9@blinklist.com','$2b$10$LuxbuKuPn.Z/Xfx4DTS0X.TN895yEd/62wsT8OwnMayN0x7s0e1D6','http://www.eire.com','f8cabd50-b7a3-11ea-9666-b565c5d4c11d.jpg','company',1,'2020-06-25 17:50:27','2020-06-25 17:50:27','2020-06-25 19:50:27',NULL);
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projects` (
  `PK_project` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `delivery_date` date NOT NULL,
  `province` varchar(30) DEFAULT NULL,
  `language` varchar(100) NOT NULL,
  `technology` varchar(100) NOT NULL,
  `architecture` varchar(100) NOT NULL,
  `modification_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `FK_project_company` int(11) DEFAULT NULL,
  PRIMARY KEY (`PK_project`),
  KEY `FK_project_company` (`FK_project_company`),
  CONSTRAINT `FK_project_company` FOREIGN KEY (`FK_project_company`) REFERENCES `companies` (`PK_company`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,'Crear aplicación de recetas','Desde DaVila, tenemos un ambicioso proyecto que ayudará a expandir a nuestra cadena.\n\nSe trata de una aplicación de recetas cuyo origen es nuestro restaurante.\n\nEsto nos premitirá dar un paso más en la modernización y expansión de nuestro negocio.\n\nActualmente ya disponemos de la parte de BackEnd de este proyecto por lo que necesitamos un desarrollador de FrontEnd en HTML, CSS y Javascript usando a poder ser, Angular.\n\nLa fecha de entrega de dicho proyecto sería el 31/12/2020.','2020-12-31','A Coruña','HTML, CSS, Javascript','Angular','FrontEnd','2020-06-25 17:50:27','2020-06-25 17:50:27',5),(2,'Cambio de página web','\nEn Dentipol tenemos un proyecto donde queremos mejorar desde cero nuestra página web para que los clientes puedan ver nuestros servicios, contactarnos fácilmente, solicitar más información o ver donde están nuestras clínicas.\n\nTambién queremos dar más detalle sobre los servicios que ofrecemos añadiendo vídeos que hemos hecho para poder incrustarlos en la página. Necesitamos que sea responsive y accesible.\n','2020-10-20','A Coruña','HTML, CSS, Javascript','React JS','Front End','2020-06-25 17:50:27','2020-06-25 17:50:27',2),(3,'Crear base de datos de clientes','En Mis Rizos buscamos un desarrollador para poder crear una base de datos donde almacenar todos los clientes.\nNo sería necesaria mucha experiencia ya que creemos que es una base de datos sencilla. Esta base de datos nos permitirá llevar un registro de los clientes, productos y empleados así como los proveedores.\n\n La fecha de entrega sería el 10-07-2020 \n','2020-07-10','A Coruña','SQL','MySQL Workbench','FrontEnd','2020-06-25 17:50:27','2020-06-25 17:50:27',3),(4,'Creación de página web de empresa','\nDesde ConCos buscamos crear una página web para dar a conocer nuestros productos, nuestra filial y lo que aquí hacemos. La página sería creada con Bootstrap y debe ser entregada el 01-01-2021 y necesitamos que sea responsive y accesible.\n\nQueremos añadir también un apartado para que nos contacten nuestros clientes y que nuestros empleados tengan una \"zona\" donde poder gestionar asuntos laborales.\n','2021-01-01','A Coruña','HTML, CSS, Javascript','Bootstrap','Front End','2020-06-25 17:50:27','2020-06-25 17:50:27',4),(5,'Aplicación de mensajes para empresa de mensajería','\nGabspot como empresa de mensajería se ha visto en la necesidad de crear una aplicación para cambios en directo sobre los pedidos que cada mensajero debe llevar.and\n\nEsta aplicación recibirá cambios de dirección, comentarios sobre los envíos y podrá recibir mensajes en directo para poder mejorar nuestros servicios al 100%.\n\nDeberá crearse con Redux y se entregará el 30-09-2020.\n','2020-09-30','A Coruña','HTML, CSS, Javascript','Redux','Front End','2020-06-25 17:50:27','2020-06-25 17:50:27',8),(6,'Creación de un videojuego de arcade','\nEn Feednation estamos buscando un desarrollador que pueda ayudarnos a diseñar/crear nuestro nuevo juego de arcade.\n\nÉste será desarrollado en Python con Django y la fecha de entrega será el 01-01-2022. Será un nuevo juego en el que tenemos las expectativas muy altas. Se trabajará en equipo con otros desarrolladores con experiencia en proyectos para esta empresa.\n\nSe darán todas las facilidades para que el desarrollo del proyecto sea lo más ameno posible\n','2022-01-01','A Coruña','Python','Django','Back End','2020-06-25 17:50:27','2020-06-25 17:50:27',9),(7,'Crear nueva página web Back','\nQueremos crear una página web para poder darnos a conocer. Los clientes podrán ver también muestras de nuestros servicios, podrán solicitar presupuesto, ver nuestros proveedores y otras empresas con las que colaboramos.\n\nPueden contactarnos a través de dicha web y ver nuestras oficinas.and\n\nDicho proyecto será creado en Node js y entregado el 01-10-2020\n','2020-10-01','A Coruña','Javascript node','Node js','Back End','2020-06-25 17:50:27','2020-06-25 17:50:27',7),(8,'Crear nueva página web End','\nDesde Gabispot queremos crear una nueva web conectada con una aplicación que mostrará los mensajes y anotaciones sobre los pedidos en directo.\n\nEsta web será desarrollada con vue y mostrará el estado en directo de los pedidos, nuestros servicios, filiales, contactarnos mediante chat o formulario y enviar pedidos.\n\n','2020-10-01','A Coruña','HTML, CSS, Javascript','Vue js','Front End','2020-06-25 17:50:27','2020-06-25 17:50:27',8),(9,'Crear aplicación de subida de archivos a nube','\nEn Ainyx necesitamos desarrolladores para nuestra aplicación de subida de archivos a la nube. Esta parte del proyecto será creada en Python con Djando y entregada el 01-03-2022.\n\nLa aplicación permitirá subir archivos a la nube de forma eficiente, rápida y ordenada.\n\n','2022-03-01','A Coruña','Python','Django','Back End','2020-06-25 17:50:27','2020-06-25 17:50:27',6),(10,'Crear tienda online','\nSomos una tienda que queremos dar el salto a online creando una web para la venta online de nuestros productos.\n\nNecesitaríamos un desarrollador para poder llevar a cabo dicho proyecto. Se desarrollaría en PHP y entregaría el 01-10-2020.\n\nEn ella se podrán ver nuestros productos, novedades, añadir a la cesta un producto y realizar compra y pago.\n\n','2020-10-01','A Coruña','PHP','Laravel','Back End','2020-06-25 17:50:27','2020-06-25 17:50:27',10);
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-30 23:03:35
