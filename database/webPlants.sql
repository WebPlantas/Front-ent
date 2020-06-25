 DROP DATABASE webplants;
 CREATE DATABASE webplants;
 USE webplants;

 CREATE TABLE profesores(
     IdProfesor INT(10) NOT NULL PRIMARY KEY,
     nombrep VARCHAR(255) NOT NULL,
     apellidop VARCHAR(255) NOT NULL,
     emailp VARCHAR(255) NOT NULL,
     passwordp VARCHAR(255) NOT NULL
);

 ALTER TABLE profesores
    MODIFY  IdProfesor INT AUTO_INCREMENT;

    describe profesores;
 ;