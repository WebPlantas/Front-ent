-- MySQL Script generated by MySQL Workbench
-- Wed Jul 15 18:45:22 2020
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
CREATE DATABASE `webplants`;
USE `webplants` ;

-- -----------------------------------------------------
-- Table `WebPlants`.`TipoDocumento`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebPlants`.`TipoDocumento` ;

CREATE TABLE IF NOT EXISTS `WebPlants`.`TipoDocumento` (
  `idTipoDocumento` INT NOT NULL AUTO_INCREMENT,
  `Tipo` VARCHAR(45) NULL,
  `Estado` ENUM('Activo', 'Inactivo') NULL,
  PRIMARY KEY (`idTipoDocumento`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WebPlants`.`Genero`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebPlants`.`Genero` ;

CREATE TABLE IF NOT EXISTS `WebPlants`.`Genero` (
  `idGenero` INT NOT NULL AUTO_INCREMENT,
  `genero` VARCHAR(45) NULL,
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
  `Nombre` VARCHAR(50) NULL,
  `Apellidos` VARCHAR(50) NULL,
  `FechaNacimiento` DATE NULL,
  `Direccion` VARCHAR(45) NULL,
  `EstadoPersona` ENUM('Activo', 'Inactivo') NULL,
  `TipoDocumento_idTipoDocumento` INT NOT NULL,
  `Genero_idGenero` INT NOT NULL,
  PRIMARY KEY (`idPersona`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `NumeroIdentificacion_UNIQUE` ON `WebPlants`.`Persona` (`NumeroIdentificacion` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `WebPlants`.`Estudiante`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebPlants`.`Estudiante` ;

CREATE TABLE IF NOT EXISTS `WebPlants`.`Estudiante` (
  `Persona_idPersona` INT NOT NULL,
  `userName` VARCHAR(10) NULL,
  `Password` VARCHAR(45) NULL,
  PRIMARY KEY (`Persona_idPersona`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WebPlants`.`Profesor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebPlants`.`Profesor` ;

CREATE TABLE IF NOT EXISTS `WebPlants`.`Profesor` (
  `Persona_idPersona` INT NOT NULL,
  `userNameP` VARCHAR(100) NULL,
  `passwordP` VARCHAR(45) NULL,
  PRIMARY KEY (`Persona_idPersona`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WebPlants`.`Curso`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebPlants`.`Curso` ;

CREATE TABLE IF NOT EXISTS `WebPlants`.`Curso` (
  `idCurso` INT NOT NULL AUTO_INCREMENT,
  `NombreCurso` VARCHAR(45) NULL,
  PRIMARY KEY (`idCurso`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WebPlants`.`Grupo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebPlants`.`Grupo` ;

CREATE TABLE IF NOT EXISTS `WebPlants`.`Grupo` (
  `idGrupo` INT NOT NULL AUTO_INCREMENT,
  `NombreGrupo` VARCHAR(45) NULL,
  `Cantidad` INT(3) NULL,
  `CodigoGrupo` INT(10) UNSIGNED NOT NULL,
  `Curso_idCurso` INT NOT NULL,
  `Profesor_Persona_idPersona` INT NOT NULL,
  PRIMARY KEY (`idGrupo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WebPlants`.`Tematica`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebPlants`.`Tematica` ;

CREATE TABLE IF NOT EXISTS `WebPlants`.`Tematica` (
  `idTematica` INT NOT NULL AUTO_INCREMENT,
  `NombreTematica` VARCHAR(70) NULL,
  `Materia_idMateria` INT NOT NULL,
  `Curso_idCurso` INT NOT NULL,
  PRIMARY KEY (`idTematica`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WebPlants`.`Evaluacion`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebPlants`.`Evaluacion` ;

CREATE TABLE IF NOT EXISTS `WebPlants`.`Evaluacion` (
  `idEvaluacion` INT NOT NULL AUTO_INCREMENT,
  `FechaEvaluacion` DATE NULL,
  `TiempoEvaluacion` TIME NULL,
  `Tematica_idTematica` INT NOT NULL,
  PRIMARY KEY (`idEvaluacion`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WebPlants`.`Contenido`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebPlants`.`Contenido` ;

CREATE TABLE IF NOT EXISTS `WebPlants`.`Contenido` (
  `idContenido` INT NOT NULL AUTO_INCREMENT,
  `NombreContenido` VARCHAR(50) NULL,
  `Descripcion` VARCHAR(100) NULL,
  `Tematica_idTematica` INT NOT NULL,
  PRIMARY KEY (`idContenido`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WebPlants`.`Nota`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebPlants`.`Nota` ;

CREATE TABLE IF NOT EXISTS `WebPlants`.`Nota` (
  `idNota` INT NOT NULL AUTO_INCREMENT,
  `Nota1` DECIMAL NULL,
  `Estudiante_Persona_idPersona` INT NOT NULL,
  PRIMARY KEY (`idNota`))
ENGINE = InnoDB;


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


-- -----------------------------------------------------
-- Table `WebPlants`.`Matricula`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebPlants`.`Matricula` ;

CREATE TABLE IF NOT EXISTS `WebPlants`.`Matricula` (
  `Estudiante_Persona_idPersona` INT NOT NULL,
  `Curso_idCurso` INT NOT NULL,
  `FechaInicio` DATE NULL,
  `FechaFin` DATE NULL,
  PRIMARY KEY (`Estudiante_Persona_idPersona`, `Curso_idCurso`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `WebPlants`.`Telefono`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebPlants`.`Telefono` ;

CREATE TABLE IF NOT EXISTS `WebPlants`.`Telefono` (
  `idTelefono` INT NOT NULL AUTO_INCREMENT,
  `Telefono` DECIMAL(10) NULL,
  `Estado` ENUM('Activo', 'Inactivo') NULL,
  `Persona_idPersona` INT NOT NULL,
  PRIMARY KEY (`idTelefono`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
