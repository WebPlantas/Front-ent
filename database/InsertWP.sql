#Inserts
INSERT INTO 
	`Genero`
(
	`Genero`, 
	`Estado`
) 
VALUES 
	('Masculino', 'Activo'),
	('Femenino', 'Activo'),
	('Otro', 'Activo')
;

INSERT INTO
	`TipoDocumento`
(
	`Tipo`,
	`Estado`
)
VALUES
('Tarjeta De Identidad', 'Activo'),
('Cédula de Ciudadanía', 'Activo'),
('Cédula de Extangeria', 'Activo');

INSERT INTO 
	`Rol`
(
	`rol`,
	`estado`
)
VALUES
('Administrador', 'Activo'),
('Estudiante', 'Activo'),
('Profesor', 'Activo');


INSERT INTO 
	`email`
(
	`email`,
	`estado`
)
VALUES
('zambrano20407@gmail.com', 'Activo');

INSERT INTO `webplants`.`persona`
(`NumeroIdentificacion`,
`Nombre`,
`Apellidos`,
`FechaNacimiento`,
`Direccion`,
`EstadoPersona`,
`TipoDocumento_idTipoDocumento`,
`Genero_idGenero`)
VALUES
(1117539881,
'Oscar',
'Zambrano',
'1994-09-22',
'Curillo',
'Activo',
2,
1);


INSERT INTO `webplants`.`usuario`
(`Username`,
`Password`,
`Estado`,
`Rol_idRol`,
`Persona_idPersona`,
`Email_idEmail`)
VALUES
('zambrano7u7',
'zambrano22',
'Activo',
1,
1,
1);


INSERT INTO `webplants`.`telefono`
(`Telefono`,
`Estado`,
`Persona_idPersona`)
VALUES
(3132194124,
'Activo',
1);

INSERT INTO `webplants`.`gradocurso`
(`NombreGrado`,
`Estado`)
VALUES
('Sexto','Activo'),
('Septimo','Activo'),
('Octavo','Activo'),
('Noveno','Activo'),
('Decimo','Activo'),
('Once','Activo');
		

insert into evaluacion values (1, 'Evaluacion unidad 1', 'Evaluar los contenidos', 'Activo', 1);
insert into evaluacion values (2, ' La célula, funciones y clasificación.', 'Evaluar los contenidos', 'Activo', 1);

insert into Tematica values (1,'Organizacion celular', 'Activo', 1);
insert into contenido values (1,'Organizacion celular', 'historia de la celula', 1, 1);


insert into TipoPregunta values (1, 'falso-verdadero', 'Activo');
insert into TipoPregunta values (2, 'Icfes', 'Activo');


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