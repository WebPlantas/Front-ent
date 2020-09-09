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
insert into respuesta values (1,'Falso',1, 1);
insert into respuesta values (2,'Verdadero',1, 2);
insert into respuesta values (3,'Falso',1, 3);
insert into respuesta values (4,'Verdadero',1, 4);
insert into respuesta values (5,'Verdadero',1, 5);
insert into respuesta values (6,'Falso',1, 6);
insert into respuesta values (7,'Verdadero',1, 7);
insert into respuesta values (8,'Verdadero',1, 8);
insert into respuesta values (9,'Verdadero',1, 9);
insert into respuesta values (10,'Falso',1, 10);

#respuestas ICFES
insert into respuesta values (11,'Las células animales',2, 11);
insert into respuesta values (12,'Las células procariotas',1, 11);
insert into respuesta values (13,'. Las células vegetales',2, 11);
insert into respuesta values (14,' Las células eucariotas',2, 11);

insert into respuesta values (15,'Los animales y las plantas',1, 12);
insert into respuesta values (16,'Los hongos y las bacterias',2, 12);
insert into respuesta values (17,'Los animales y los protista',2, 12);
insert into respuesta values (18,'Las plantas y bacterias',2, 12);


insert into respuesta values (19,'Células procariotas',1, 13);
insert into respuesta values (20,'Células animales',2, 13);
insert into respuesta values (21,'Células vegetales',2, 13);
insert into respuesta values (22,'Células eucariotas',2, 13);

insert into respuesta values (23,'Las mitocondrias',2, 14);
insert into respuesta values (24,'Las vacuolas',2, 14);
insert into respuesta values (25,'Los peroxisomas',2, 14);
insert into respuesta values (26,'Los ribosomas',1, 14);

insert into respuesta values (27,'Numerosas células',1, 15);
insert into respuesta values (28,'Una célula',2, 15);
insert into respuesta values (29,'No tienen células',2, 15);
insert into respuesta values (30,'Ninguna de las anteriores',2, 15);

insert into respuesta values (31,'Mitocondrias y retículo endoplasmatico',1, 16);
insert into respuesta values (32,'Mitocondrias y membrana a celular',2, 16);
insert into respuesta values (33,'Mitocondrias y aparato de Golgi',2, 16);
insert into respuesta values (34,'Mitocondrias y membrana plasmática',2, 16);

insert into respuesta values (35,'Viven en el agua',2, 17);
insert into respuesta values (36,'Son seres microscópicos',1, 17);
insert into respuesta values (37,'Son seres terrestres',2, 17);
insert into respuesta values (38,'Son seres macroscópicos',2, 17);

insert into respuesta values (39,'El material genético',1, 18);
insert into respuesta values (40,'Moléculas como las proteínas',2, 18);
insert into respuesta values (41,'La clorofila pigmento encargado de realizar la fotosíntesis',2, 18);
insert into respuesta values (42,'Los ribosomas',2, 18);

insert into respuesta values (43,'La célula es la unidad estructural de los seres vivos',2, 19);
insert into respuesta values (44,'Al menos por una célula',2, 19);
insert into respuesta values (45,'La célula tiene un metabolismo propio que la hace
independiente',2, 19);
insert into respuesta values (46,'Toda célula procede por división de otra preexistente',1, 19);

insert into respuesta values (47,'Los componentes fundamentales de los protistas, los
hongos, las plantas y los animales',1, 20);
insert into respuesta values (48,'Células donde se distinguen tres partes fundamentales. La
membrana celular, el citoplasma y el núcleo',2, 20);
insert into respuesta values (49,'Células cuyas estructuras internas están recubiertas por
membrana',2, 20);
insert into respuesta values (50,'Todas las anteriores',2, 20);