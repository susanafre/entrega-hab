CREATE DATABASE EJERCICIO_FINAL;
USE EJERCICIO_FINAL;
CREATE TABLE PELICULA(
Id_Pelicula int auto_increment primary key, 
Nombre varchar(40) not null, 
PEGI int, 
Descripcion varchar(200),
Caratula blob);

CREATE TABLE ACTORES(
Nombre_actor varchar(40) primary key,
Id_Pelicula int,
FOREIGN KEY (Id_Pelicula) REFERENCES PELICULA(Id_Pelicula));

CREATE TABLE DIRECTORES(
Nombre_director varchar(40) primary key,
Id_Pelicula int,
FOREIGN KEY (Id_Pelicula) REFERENCES PELICULA(Id_Pelicula));

CREATE TABLE COPIAS(
Id_Copia int primary key,
Id_pelicula int,
FOREIGN KEY (Id_Pelicula) REFERENCES PELICULA(Id_Pelicula)
);

CREATE TABLE FORMATO(
Id_Copia int,
DVD boolean,
VHS boolean,
FOREIGN KEY (Id_Copia) REFERENCES COPIAS(Id_Copia)
);

CREATE TABLE SOCIOS(
Id_Socio int auto_increment primary key,
Nombre_completo varchar(50) not null,
DNI varchar(9) not null,
telefono int,
email varchar(30),
fecha_nacimiento date
);

CREATE TABLE ALQUILER(
Id_Alquiler int auto_increment primary key,
Id_Socio int,
Id_Copia int,
fecha_devolucion date,
pagado boolean not null,
FOREIGN KEY (Id_Copia) REFERENCES COPIAS(Id_Copia),
FOREIGN KEY (Id_Socio) REFERENCES SOCIOS(Id_Socio)

);
CREATE TABLE VALORACION(
Id_Valoracion int auto_increment primary key,
Id_Socio int,
Id_Alquiler int,
Id_Copia int,
Valoracion tinyint not null,
Comentario text,
FOREIGN KEY (Id_Copia) REFERENCES COPIAS(Id_Copia),
FOREIGN KEY (Id_Socio) REFERENCES SOCIOS(Id_Socio),
FOREIGN KEY (Id_Alquiler) REFERENCES ALQUILER(Id_Alquiler)
);

CREATE TABLE PROVEEDOR(
Id_Proveedor int auto_increment primary key,
Nombre varchar(40) not null,
Telefono int,
DNI varchar(9) not nul`PRIMARY`l,
email varchar(30),
Id_Pelicula int,
FOREIGN KEY (Id_Pelicula) REFERENCES PELICULA(Id_Pelicula)
);

CREATE TABLE TARIFA(
Id_Pelicula int,
Estrenos boolean,
Estandar boolean,
Antiguas boolean,
FOREIGN KEY (Id_Pelicula) REFERENCES PELICULA(Id_Pelicula)
);