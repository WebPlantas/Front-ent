-- MySQL Script generated by MySQL Workbench
-- Tue Sep  1 01:03:43 2020
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


-- -----------------------------------------------------
-- Table `WebPlants`.`Persona`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebPlants`.`Persona` ;

CREATE TABLE IF NOT EXISTS `WebPlants`.`Persona` (
  `idPersona` INT NOT NULL AUTO_INCREMENT,
  `NumeroIdentificacion` DECIMAL(13) NOT NULL,
  `Nombre` VARCHAR(50) NOT NULL,
  `Apellidos` VARCHAR(50) NOT NULL,
  `FechaNacimiento` DATE NULL,
  `Direccion` VARCHAR(45) NULL,
  `EstadoPersona` ENUM('Activo', 'Inactivo') NULL,
  `TipoDocumento_idTipoDocumento` INT NOT NULL,
  `Genero_idGenero` INT NOT NULL,
  PRIMARY KEY (`idPersona`))
ENGINE = InnoDB;

CREATE INDEX `fk_Persona_TipoDocumento_idx` ON `WebPlants`.`Persona` (`TipoDocumento_idTipoDocumento` ASC) VISIBLE;

CREATE INDEX `fk_Persona_Genero1_idx` ON `WebPlants`.`Persona` (`Genero_idGenero` ASC) VISIBLE;

CREATE UNIQUE INDEX `NumeroIdentificacion_UNIQUE` ON `WebPlants`.`Persona` (`NumeroIdentificacion` ASC) VISIBLE;


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
-- Table `WebPlants`.`Clase`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebPlants`.`Clase` ;

CREATE TABLE IF NOT EXISTS `WebPlants`.`Clase` (
  `idClase` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(100) NULL,
  `Cantidad` INT(3) NULL,
  `Descripcion` VARCHAR(400) NULL,
  `Estado` ENUM('Activo', 'Inactivo') NULL,
  `GradoCurso_idGradoCurso` INT NOT NULL,
  `Profesor_idProfesor` INT NOT NULL,
  PRIMARY KEY (`idClase`))
ENGINE = InnoDB;

CREATE INDEX `fk_Curso_GradoCurso1_idx` ON `WebPlants`.`Clase` (`GradoCurso_idGradoCurso` ASC) VISIBLE;

CREATE INDEX `fk_Curso_Profesor1_idx` ON `WebPlants`.`Clase` (`Profesor_idProfesor` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `WebPlants`.`Grupo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebPlants`.`Grupo` ;

CREATE TABLE IF NOT EXISTS `WebPlants`.`Grupo` (
  `idGrupo` INT NOT NULL AUTO_INCREMENT,
  `NombreGrupo` VARCHAR(100) NOT NULL,
  `Clase_idClase` INT NOT NULL,
  PRIMARY KEY (`idGrupo`))
ENGINE = InnoDB;

CREATE INDEX `fk_Grupo_Clase1_idx` ON `WebPlants`.`Grupo` (`Clase_idClase` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `WebPlants`.`Tematica`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebPlants`.`Tematica` ;

CREATE TABLE IF NOT EXISTS `WebPlants`.`Tematica` (
  `idTematica` INT NOT NULL AUTO_INCREMENT,
  `NombreTematica` VARCHAR(70) NULL,
  `Estado` ENUM('Activo', 'Inactivo') NULL,
  `Clase_idClase` INT NOT NULL,
  PRIMARY KEY (`idTematica`))
ENGINE = InnoDB;

CREATE INDEX `fk_Tematica_Clase1_idx` ON `WebPlants`.`Tematica` (`Clase_idClase` ASC) VISIBLE;


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


-- -----------------------------------------------------
-- Table `WebPlants`.`Email`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebPlants`.`Email` ;

CREATE TABLE IF NOT EXISTS `WebPlants`.`Email` (
  `idEmail` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(400) NULL,
  `estado` ENUM('Activo', 'Inactivo') NULL,
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

CREATE INDEX `fk_Usuario_Persona1_idx` ON `WebPlants`.`Usuario` (`Persona_idPersona` ASC) VISIBLE;

CREATE INDEX `fk_Usuario_Email1_idx` ON `WebPlants`.`Usuario` (`Email_idEmail` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `WebPlants`.`Nota`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebPlants`.`Nota` ;

CREATE TABLE IF NOT EXISTS `WebPlants`.`Nota` (
  `idNota` INT NOT NULL AUTO_INCREMENT,
  `Nota1` DECIMAL NULL,
  `Estudiante_Persona_idPersona` INT NOT NULL,
  `Evaluacion_idEvaluacion` INT NOT NULL,
  `Usuario_idUsuario` INT NOT NULL,
  PRIMARY KEY (`idNota`))
ENGINE = InnoDB;

CREATE INDEX `fk_Nota_Evaluacion1_idx` ON `WebPlants`.`Nota` (`Evaluacion_idEvaluacion` ASC) VISIBLE;

CREATE INDEX `fk_Nota_Usuario1_idx` ON `WebPlants`.`Nota` (`Usuario_idUsuario` ASC) VISIBLE;


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
  PRIMARY KEY (`Estudiante_idEstudiante`, `Estudiante_Persona_idPersona`, `Grupo_idGrupo`))
ENGINE = InnoDB;

CREATE INDEX `fk_Matricula_Grupo1_idx` ON `WebPlants`.`Matricula` (`Grupo_idGrupo` ASC) VISIBLE;

CREATE INDEX `fk_Matricula_Estudiante1_idx` ON `WebPlants`.`Matricula` (`Estudiante_idEstudiante` ASC) VISIBLE;


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


-- -----------------------------------------------------
-- Table `WebPlants`.`TipoPregunta`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebPlants`.`TipoPregunta` ;

CREATE TABLE IF NOT EXISTS `WebPlants`.`TipoPregunta` (
  `idTipoPregunta` INT NOT NULL AUTO_INCREMENT,
  `tipo` VARCHAR(100) NULL,
  `esatado` ENUM('Activo', 'Inactivo') NULL,
  PRIMARY KEY (`idTipoPregunta`))
ENGINE = InnoDB;


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

CREATE INDEX `fk_Pregunta_Evaluacion1_idx` ON `WebPlants`.`Pregunta` (`Evaluacion_idEvaluacion` ASC) VISIBLE;

CREATE INDEX `fk_Pregunta_TipoPregunta1_idx` ON `WebPlants`.`Pregunta` (`TipoPregunta_idTipoPregunta` ASC) VISIBLE;


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

CREATE INDEX `fk_Respuesta_Pregunta1_idx` ON `WebPlants`.`Respuesta` (`Pregunta_idPregunta` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `WebPlants`.`Codigo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebPlants`.`Codigo` ;

CREATE TABLE IF NOT EXISTS `WebPlants`.`Codigo` (
  `idCodigo` INT NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(45) NULL,
  `estado` ENUM('Activo', 'Inactivo') NULL,
  `Clase_idClase` INT NOT NULL,
  PRIMARY KEY (`idCodigo`))
ENGINE = InnoDB;

CREATE INDEX `fk_Codigo_Clase1_idx` ON `WebPlants`.`Codigo` (`Clase_idClase` ASC) VISIBLE;

USE `WebPlants`;

DELIMITER $$

USE `WebPlants`$$
DROP TRIGGER IF EXISTS `WebPlants`.`Clase_AFTER_INSERT` $$
USE `WebPlants`$$
CREATE DEFINER = CURRENT_USER TRIGGER `WebPlants`.`Clase_AFTER_INSERT` AFTER INSERT ON `Clase` FOR EACH ROW
BEGIN
INSERT INTO `Codigo` (`Codigo`.`codigo`, `Codigo`.`estado`, `Codigo`.`Clase_idClase`)
VALUES  
((select lpad(conv(floor(Rand()*pow(36,8)), 10, 36), 8, 0) as rnd_str_4z),'Activo',NEW.idClase);
END$$


DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
