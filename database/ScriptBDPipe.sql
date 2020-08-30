-- MySQL Script generated by MySQL Workbench
-- Sun Aug  2 14:05:06 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';


-- -----------------------------------------------------
-- Schema WebPlants
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `WebPlants` ;

-- -----------------------------------------------------
-- Schema WebPlants
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `WebPlants` DEFAULT CHARACTER SET utf8 ;
USE `WebPlants` ;

-- -----------------------------------------------------
-- Table `WebPlants`.`TipoDocumento`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebPlants`.`TipoDocumento` ;

CREATE TABLE IF NOT EXISTS `WebPlants`.`TipoDocumento` (
  `idTipoDocumento` INT NOT NULL AUTO_INCREMENT,
  `Tipo` VARCHAR(45) NOT NULL,
  `Estado` ENUM('Activo', 'Inactivo') NULL,
  PRIMARY KEY (`idTipoDocumento`))
ENGINE = InnoDB;
insert into tipodocumento (idTipoDocumento, Tipo, Estado) values (1,'Tarjeta Identidad', 1);
insert into tipodocumento (idTipoDocumento, Tipo, Estado) values (2,'Cedula', 1);
-- select * from tipodocumento;

-- -----------------------------------------------------
-- Table `WebPlants`.`Genero`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebPlants`.`Genero` ;

CREATE TABLE IF NOT EXISTS `WebPlants`.`Genero` (
  `idGenero` INT NOT NULL AUTO_INCREMENT,
  `genero` VARCHAR(45) NOT NULL,
  `Estado` ENUM('Activo', 'Inactivo') NULL,
  PRIMARY KEY (`idGenero`))
ENGINE = InnoDB;

insert into genero (idGenero, genero, Estado) values (1,'Masculino', 1);
insert into genero (idGenero, genero, Estado) values (2,'Femenino', 1);
insert into genero (idGenero, genero, Estado) values (3,'Otro', 1);
-- -----------------------------------------------------
-- Table `WebPlants`.`Persona`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebPlants`.`Persona` ;

CREATE TABLE IF NOT EXISTS `WebPlants`.`Persona` (
  `idPersona` INT NOT NULL AUTO_INCREMENT,
  `NumeroIdentificacion` DECIMAL(13) NOT NULL,
  `Nombre` VARCHAR(50) NOT NULL,
  `Apellidos` VARCHAR(50) NOT NULL,
  `FechaNacimiento` DATE NOT NULL,
  `Direccion` VARCHAR(45) NOT NULL,
  `EstadoPersona` ENUM('Activo', 'Inactivo') NULL,
  `TipoDocumento_idTipoDocumento` INT NOT NULL,
  `Genero_idGenero` INT NOT NULL,
  PRIMARY KEY (`idPersona`))
ENGINE = InnoDB;

CREATE INDEX `fk_Persona_TipoDocumento_idx` ON `WebPlants`.`Persona` (`TipoDocumento_idTipoDocumento` ASC) VISIBLE;

CREATE INDEX `fk_Persona_Genero1_idx` ON `WebPlants`.`Persona` (`Genero_idGenero` ASC) VISIBLE;

CREATE UNIQUE INDEX `NumeroIdentificacion_UNIQUE` ON `WebPlants`.`Persona` (`NumeroIdentificacion` ASC) VISIBLE;
/*show full tables from webplants;
describe sessions;
select * from sessions;
select * from usuario;        
select * from Persona;
select * from Profesor;
*/
-- -----------------------------------------------------
-- Table `WebPlants`.`Estudiante`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebPlants`.`Estudiante` ;

CREATE TABLE IF NOT EXISTS `WebPlants`.`Estudiante` (
  `idEstudiante` INT NOT NULL AUTO_INCREMENT,
  `Persona_idPersona` INT NOT NULL,
  PRIMARY KEY (`idEstudiante`))
ENGINE = InnoDB;

CREATE INDEX `fk_Estudiante_Persona1_idx` ON `WebPlants`.`Estudiante` (`Persona_idPersona` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `WebPlants`.`GradoCurso`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebPlants`.`GradoCurso` ;

CREATE TABLE IF NOT EXISTS `WebPlants`.`GradoCurso` (
  `idGradoCurso` INT NOT NULL AUTO_INCREMENT,
  `NombreGrado` VARCHAR(100) NULL,
  `Estado` ENUM('Activo', 'Inanctivo') NULL,
  PRIMARY KEY (`idGradoCurso`))
ENGINE = InnoDB;

insert into GradoCurso (idGradoCurso, NombreGrado, Estado) values (1,'Octavo',1);


-- -----------------------------------------------------
-- Table `WebPlants`.`Profesor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebPlants`.`Profesor` ;

CREATE TABLE IF NOT EXISTS `WebPlants`.`Profesor` (
  `idProfesor` INT NOT NULL AUTO_INCREMENT,
  `Persona_idPersona` INT NOT NULL,
  PRIMARY KEY (`idProfesor`))
ENGINE = InnoDB;

CREATE INDEX `fk_Profesor_Persona1_idx` ON `WebPlants`.`Profesor` (`Persona_idPersona` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `WebPlants`.`Curso`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebPlants`.`Curso` ;

CREATE TABLE IF NOT EXISTS `WebPlants`.`Curso` (
  `idCurso` INT NOT NULL AUTO_INCREMENT,
  `Cantidad` INT(3) NOT NULL,
  `Descripcion` VARCHAR(400) NULL,
  `Estado` ENUM('Activo', 'Inactivo') NULL,
  `Profesor_Persona_idPersona` INT NOT NULL,
  `GradoCurso_idGradoCurso` INT NOT NULL,
  `Profesor_idProfesor` INT NOT NULL,
  PRIMARY KEY (`idCurso`))
ENGINE = InnoDB;

CREATE INDEX `fk_Curso_GradoCurso1_idx` ON `WebPlants`.`Curso` (`GradoCurso_idGradoCurso` ASC) VISIBLE;

CREATE INDEX `fk_Curso_Profesor1_idx` ON `WebPlants`.`Curso` (`Profesor_idProfesor` ASC) VISIBLE;

insert into Curso (idCurso,Cantidad,Descripcion,Estado,Profesor_Persona_idPersona,GradoCurso_idGradoCurso,Profesor_idProfesor)
 values (1,25,'test',1,1,1,2);
-- selec * from curso;
/*
select 
	gradocurso.idGradoCurso,
    gradocurso.NombreGrado
    from
    GradoCurso
    inner join 
    Curso
    on
    Curso.GradoCurso_idGradoCurso = GradoCurso.idGradoCurso
    where 
    idCurso = 1
    and
    Curso.Estado = 'Activo';
    */
-- -----------------------------------------------------
-- Table `WebPlants`.`Grupo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebPlants`.`Grupo` ;

CREATE TABLE IF NOT EXISTS `WebPlants`.`Grupo` (
  `idGrupo` INT NOT NULL AUTO_INCREMENT,
  `NombreGrupo` VARCHAR(100) NOT NULL,
  `Curso_idCurso` INT NOT NULL,
  PRIMARY KEY (`idGrupo`))
ENGINE = InnoDB;

CREATE INDEX `fk_Grupo_Curso1_idx` ON `WebPlants`.`Grupo` (`Curso_idCurso` ASC) VISIBLE;
use Webplants;
-- select * from Grupo;
/*
INSERT INTO
                Matricula
              (
              Estudiante_idEstudiante,
              Estudiante_Persona_idPersona,
              Grupo_idGrupo,
              FechaInicio,
              FechaFin,
              Estado,
              CodigoGrupo
              )
              VALUES
              (
                2,
                2,
                14,
                '2020-08-02',
                '2020-08-03',
                'Activo',
                'abc'
              );
              */
-- -----------------------------------------------------
-- Table `WebPlants`.`Tematica`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebPlants`.`Tematica` ;

CREATE TABLE IF NOT EXISTS `WebPlants`.`Tematica` (
  `idTematica` INT NOT NULL AUTO_INCREMENT,
  `NombreTematica` VARCHAR(70) NULL,
  `Estado` ENUM('Activo', 'Inactivo') NULL,
  `Curso_idCurso` INT NOT NULL,
  PRIMARY KEY (`idTematica`))
ENGINE = InnoDB;

CREATE INDEX `fk_Tematica_Curso1_idx` ON `WebPlants`.`Tematica` (`Curso_idCurso` ASC) VISIBLE;
insert into Tematica values (1,'Organizacion celular', 'Activo', 1);
-- select * from tematica;


-- -----------------------------------------------------
-- Table `WebPlants`.`Evaluacion`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebPlants`.`Evaluacion` ;

CREATE TABLE IF NOT EXISTS `WebPlants`.`Evaluacion` (
  `idEvaluacion` INT NOT NULL AUTO_INCREMENT,
  `NombreEvaluacion` VARCHAR(100) NULL,
  `Descripcion` VARCHAR(200) NULL,
  `Estado` ENUM('Activo', 'Inactivo') NULL,
  `Tematica_idTematica` INT NOT NULL,
  PRIMARY KEY (`idEvaluacion`))
ENGINE = InnoDB;

CREATE INDEX `fk_Evaluacion_Tematica1_idx` ON `WebPlants`.`Evaluacion` (`Tematica_idTematica` ASC) VISIBLE;

insert into evaluacion values (1, 'Evaluacion unidad 1', 'Evaluar los contenidos', 'Activo', 1);
insert into evaluacion values (2, ' La célula, funciones y clasificación.', 'Evaluar los contenidos', 'Activo', 1);
-- select * from evaluacion;



-- -----------------------------------------------------
-- Table `WebPlants`.`Contenido`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebPlants`.`Contenido` ;

CREATE TABLE IF NOT EXISTS `WebPlants`.`Contenido` (
  `idContenido` INT NOT NULL AUTO_INCREMENT,
  `NombreContenido` VARCHAR(50) NULL,
  `Descripcion` VARCHAR(100) NULL,
  `Estado` ENUM('Activo', 'Inactivo') NULL,
  `Tematica_idTematica` INT NOT NULL,
  PRIMARY KEY (`idContenido`))
ENGINE = InnoDB;

CREATE INDEX `fk_Contenido_Tematica1_idx` ON `WebPlants`.`Contenido` (`Tematica_idTematica` ASC) VISIBLE;
insert into contenido values (1,'Organizacion celular', 'historia de la celula', 1, 1);
-- select * from contenido;

-- -----------------------------------------------------
-- Table `WebPlants`.`Nota`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebPlants`.`Nota` ;

CREATE TABLE IF NOT EXISTS `WebPlants`.`Nota` (
  `idNota` INT NOT NULL AUTO_INCREMENT,
  `Nota1` DECIMAL(3,1) NULL,
  `Evaluacion_idEvaluacion` INT NOT NULL,
  `Usuario_idUsuario` INT NOT NULL,
  PRIMARY KEY (`idNota`))
ENGINE = InnoDB;

CREATE INDEX `fk_Nota_Evaluacion1_idx` ON `WebPlants`.`Nota` (`Evaluacion_idEvaluacion` ASC) VISIBLE;
CREATE INDEX `fk_Usuario_idUsuario` ON `WebPlants`.`Nota` (`Usuario_idUsuario` ASC) VISIBLE;

-- insert into Nota values (1,'4.5',1,3);
 select * from Nota;
-- -----------------------------------------------------
-- Table `WebPlants`.`Notas_Periodo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebPlants`.`Notas_Periodo` ;

CREATE TABLE IF NOT EXISTS `WebPlants`.`Notas_Periodo` (
  `idPeriodo` INT NOT NULL AUTO_INCREMENT,
  `Notas_Periodocol1` VARCHAR(45) NULL,
  `Nota_idNota` INT NOT NULL,
  PRIMARY KEY (`idPeriodo`, `Nota_idNota`))
ENGINE = InnoDB;

CREATE INDEX `fk_Notas_Periodo_Nota1_idx` ON `WebPlants`.`Notas_Periodo` (`Nota_idNota` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `WebPlants`.`Matricula`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebPlants`.`Matricula` ;

CREATE TABLE IF NOT EXISTS `WebPlants`.`Matricula` (
  `Estudiante_idEstudiante` INT NOT NULL AUTO_INCREMENT,
  `Estudiante_Persona_idPersona` INT NOT NULL,
  `Grupo_idGrupo` INT NOT NULL,
  `FechaInicio` DATE NULL,
  `FechaFin` DATE NULL,
  `Estado` ENUM('Activo', 'Inactivo') NULL,
  `CodigoGrupo` VARCHAR(25),
  PRIMARY KEY (`Estudiante_idEstudiante`, `Estudiante_Persona_idPersona`, `Grupo_idGrupo`))
ENGINE = InnoDB;

CREATE INDEX `fk_Matricula_Grupo1_idx` ON `WebPlants`.`Matricula` (`Grupo_idGrupo` ASC) VISIBLE;

CREATE INDEX `fk_Matricula_Estudiante1_idx` ON `WebPlants`.`Matricula` (`Estudiante_idEstudiante` ASC) VISIBLE;
/*
update Matricula set Estado = 'Inactivo' where Estudiante_idEstudiante = 2;
select * from Matricula;
select * from Grupo;
describe Curso;

update GradoCurso
set
NombreGrado='Noveno'
where
idGradoCurso = 1;

update Curso
set
Estado = 'Activo'
where idCurso = 2;

update Curso
set
 Cantidad = 27,
 Descripcion = 'prueba'
where 
idCurso = 2;





SELECT
              NombreGrado,
              Cantidad,
              Descripcion
            FROM
               Curso
            INNER JOIN 
              GradoCurso
            ON
              idGradoCurso = GradoCurso_idGradoCurso
            WHERE
              idGradoCurso = 1
            LIMIT 1;

update Curso
set Estado = 'Inactivo'
where Profesor_Persona_idPersona = 1;

	update GradoCurso
set
NombreGrado = 'octavo'
where idGradoCurso = 1;
 SELECT  
      idGradoCurso AS Grado, 
      NombreGrado AS NombreG 
    FROM 
      GradoCurso 
    WHERE 
      GradoCurso.Estado = 'Activo';
      
SELECT    
        Grupo.idGrupo AS ID,
        Grupo.NombreGrupo AS Nombre,
        Grupo.Curso_idCurso AS Curso
      FROM 
        Grupo 
      INNER JOIN
        GradoCurso
      ON
      GradoCurso.idGradoCurso = Grupo.Curso_idCurso
      ;
delete from Grupo
where idGrupo = 2;

select NombreGrupo, FechaInicio,
FechaFin 
from Matricula
inner join Grupo
on
idGrupo = Grupo_idGrupo
where idGrupo = 1
;

update Matricula
inner join Grupo
on 
idGrupo = Grupo_idGrupo
set
NombreGrupo= 'Prueba1',
FechaInicio= '2020-08-07',
FechaFin= '2020-08-08'
where idGrupo=1;

INSERT INTO
      Grupo
    (
      NombreGrupo,
      Curso_idCurso
    )
    VALUES
    (
      'aa',
      1
    );
    */
-- -----------------------------------------------------
-- Table `WebPlants`.`Telefono`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebPlants`.`Telefono` ;

CREATE TABLE IF NOT EXISTS `WebPlants`.`Telefono` (
  `idTelefono` INT NOT NULL AUTO_INCREMENT,
  `Telefono` DECIMAL(10) NOT NULL,
  `Estado` ENUM('Activo', 'Inactivo') NULL,
  `Persona_idPersona` INT NOT NULL,
  PRIMARY KEY (`idTelefono`))
ENGINE = InnoDB;

CREATE INDEX `fk_Telefono_Persona1_idx` ON `WebPlants`.`Telefono` (`Persona_idPersona` ASC) VISIBLE;

/*select * from Telefono;*/

-- -----------------------------------------------------
-- Table `WebPlants`.`Rol`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebPlants`.`Rol` ;

CREATE TABLE IF NOT EXISTS `WebPlants`.`Rol` (
  `idRol` INT NOT NULL AUTO_INCREMENT,
  `rol` VARCHAR(70) NULL,
  `estado` ENUM('Activo', 'Inactivo') NULL,
  PRIMARY KEY (`idRol`))
ENGINE = InnoDB;

insert into Rol (idRol, rol, estado) values (1,'Profesor', 1);
insert into Rol (idRol, rol, estado) values (2,'Estudiante', 1);
insert into Rol (idRol, rol, estado) values (3,'Admin', 1);

-- -----------------------------------------------------
-- Table `WebPlants`.`Email`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebPlants`.`Email` ;

CREATE TABLE IF NOT EXISTS `WebPlants`.`Email` (
  `idEmail` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(400) NOT NULL,
  `Estado` ENUM('Activo', 'Inactivo') NULL,
  PRIMARY KEY (`idEmail`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `WebPlants`.`Usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebPlants`.`Usuario` ;

CREATE TABLE IF NOT EXISTS `WebPlants`.`Usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `Username` VARCHAR(400) NULL,
  `Password` VARCHAR(400) NULL,
  `Estado` ENUM('Activo', 'Inactivo') NULL,
  `Rol_idRol` INT NOT NULL,
  `Persona_idPersona` INT NOT NULL,
  `Email_idEmail` INT NOT NULL,
  PRIMARY KEY (`idUsuario`))
ENGINE = InnoDB;


CREATE INDEX `fk_Usuario_Rol1_idx` ON `WebPlants`.`Usuario` (`Rol_idRol` ASC) VISIBLE;
CREATE INDEX `fk_Persona_id_Persona` ON `WebPlants`.`Usuario` (`Persona_idPersona` ASC) VISIBLE;

/*update usuario set Rol_idRol = 3 where idUsuario = 1;
update usuario set Username = 'admin', Rol_idRol=3 where idUsuario = 2;
delete from usuario where idUsuario = 1;

*/
-- select * from nota;

-- -----------------------------------------------------
-- Table `WebPlants`.`TipoPregunta`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebPlants`.`TipoPregunta` ;

CREATE TABLE IF NOT EXISTS `WebPlants`.`TipoPregunta` (
  `idTipoPregunta` INT NOT NULL AUTO_INCREMENT,
  `tipo` VARCHAR(100) NULL,
  `Estado_TipoPregunta` ENUM('Activo', 'Inactivo') NULL,
  PRIMARY KEY (`idTipoPregunta`))
ENGINE = InnoDB;


insert into TipoPregunta values (1, 'falso-verdadero', 'Activo');
insert into TipoPregunta values (2, 'Icfes', 'Activo');
-- select * from tipopregunta;

/*select idPregunta, pregunta, TipoPregunta_idTipoPregunta 
from Pregunta inner join TipoPregunta
on idPregunta = Pregunta_idPregunta
where Estado_TipoPregunta = 1;
*/
-- -----------------------------------------------------
-- Table `WebPlants`.`Pregunta`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebPlants`.`Pregunta` ;

CREATE TABLE IF NOT EXISTS `WebPlants`.`Pregunta` (
  `idPregunta` INT NOT NULL AUTO_INCREMENT,
  `pregunta` VARCHAR(1000) NULL,
  `Evaluacion_idEvaluacion` INT NOT NULL,
  `TipoPregunta_idTipoPregunta` INT NOT NULL,
  PRIMARY KEY (`idPregunta`))
ENGINE = InnoDB;

CREATE INDEX `fk_evaluacion` ON `WebPlants`.`Pregunta` (`Evaluacion_idEvaluacion` ASC) VISIBLE;
CREATE INDEX `fk_tipoPregunta` ON `WebPlants`.`Pregunta` (`TipoPregunta_idTipoPregunta` ASC) VISIBLE;

-- PREGUNTAS FALSO/VERDADERO
insert into pregunta values (1,'Las celulas eucariotas no presentan nucleo.', 1,1);
insert into pregunta values (2,'La membrana plasmatica separa el medio interno celular del externo.', 1,1);
insert into pregunta values (3,'El citoplasma esta formado por los organulos celulares, el citosol y el nucleo.', 1,1);
insert into pregunta values (4,'Una celula eucariota tıpica mide entre 10 y 50 µm.', 1,1);
insert into pregunta values (5,'Las celulas eucariotas tienen forma muy variada, desde estrellada a ovalada. Las
formas redondeadas no son en realidad las mas frecuentes.', 1,1);
insert into pregunta values (6,'No se habıa observado ninguna celula hasta la invencion del microscopio.', 1,1);
insert into pregunta values (7,'Los primeros microscopios se inventaron a principios del siglo XVII', 1,1);
insert into pregunta values (8,'R. Hook, en su publicaci´on Micrographia (1664), da nombre a las estructuras que
hoy llamamos celulas.', 1,1);
insert into pregunta values (9,'El postulado de la teorıa celular: ”todos los organismos est´an formados por unidades
denominadas celulas”, fue enunciada por Schwann y Schleiden', 1,1);
insert into pregunta values (10,'La ultraestructura celular se observo gracias a los microscopios opticos compuestos.
', 1,1);

-- PREGUNTAS ICFES
insert into pregunta values (11,'La pared celular es exclusiva de:', 2,2);
insert into pregunta values (12,'Las células animal y vegetal hacen referencia a:', 2,2);
insert into pregunta values (13,'Son las estructura vivas más antiguas y habitan la tierra
hace unos 3600 millones de años.', 2,2);
insert into pregunta values (14,'La elaboración de proteínas en la célula es una labor
exclusiva de:', 2,2);
insert into pregunta values (15,'Los organismos pluricelulares son aquellos que están
formados por:', 2,2);
insert into pregunta values (16,'Las células procariotas carecen de: ', 2,2);
insert into pregunta values (17,'Los seres se conocen con el nombre de unicelulares
porque:', 2,2);
insert into pregunta values (18,'En el núcleo se encuentra.', 2,2);
insert into pregunta values (19,'Según la teoría celular.', 2,2);
insert into pregunta values (20,'Las células eucariotas son:', 2,2);

 -- select row_number() over(ORDER BY idPregunta) AS ID,pregunta  from pregunta where TipoPregunta_idTipoPregunta = 2;


-- -----------------------------------------------------
-- Table `WebPlants`.`Respuesta`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebPlants`.`Respuesta` ;

CREATE TABLE IF NOT EXISTS `WebPlants`.`Respuesta` (
  `idRespuesta` INT NOT NULL AUTO_INCREMENT,
  `respuesta` VARCHAR(1000) NULL,
  `Pregunta_idPregunta` INT NOT NULL,
  PRIMARY KEY (`idRespuesta`))
ENGINE = InnoDB;

CREATE INDEX `fk_pregunta` ON `WebPlants`.`Respuesta` (`Pregunta_idPregunta` ASC) VISIBLE;
-- CREATE INDEX `fk_usuario` ON `WebPlants`.`Respuesta` (`Usuario_idUsuario` ASC) VISIBLE;

-- alter table Respuesta drop Usuario_idUsuario;

-- respuestas V-F
insert into respuesta values (1,'Falso', 1);
insert into respuesta values (2,'Verdadero', 2);
insert into respuesta values (3,'Falso', 3);
insert into respuesta values (4,'Verdadero', 4);
insert into respuesta values (5,'Verdadero', 5);
insert into respuesta values (6,'Falso', 6);
insert into respuesta values (7,'Verdadero', 7);
insert into respuesta values (8,'Verdadero', 8);
insert into respuesta values (9,'Verdadero', 9);
insert into respuesta values (10,'Falso', 10);

-- respuestas ICFES
insert into respuesta values (11,'B', 11);
insert into respuesta values (12,'A', 12);
insert into respuesta values (13,'A', 13);
insert into respuesta values (14,'D', 14);
insert into respuesta values (15,'A', 15);
insert into respuesta values (16,'A', 16);
insert into respuesta values (17,'B', 17);
insert into respuesta values (18,'A', 18);
insert into respuesta values (19,'D', 19);
insert into respuesta values (20,'A', 20);
-- use webplants;
-- select * from evaluacion;
-- describe Respuesta;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
