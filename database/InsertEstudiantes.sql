#Masculino es 3
#Femenino es 2
#CC es 2 
#Tarjeta de identidad es 1
use webplants;

INSERT INTO `webplants`.`persona` (`idPersona`, `NumeroIdentificacion`,
`Nombre`, `Apellidos`, `FechaNacimiento`, `Direccion`, `EstadoPersona`,
`TipoDocumento_idTipoDocumento`, `Genero_idGenero`) VALUES
(3, 100152415, 'Maria', 'Rojas', '2010-08-22', 'Curillo - Caqueta',
'Activo', 1, 2);
INSERT INTO Estudiante (Persona_idPersona, userNameE, passwordE) values
(3, 'ma.rojas@udla.edu.co', '123');

INSERT INTO `webplants`.`persona` (`idPersona`, `NumeroIdentificacion`,
`Nombre`, `Apellidos`, `FechaNacimiento`, `Direccion`, `EstadoPersona`,
`TipoDocumento_idTipoDocumento`, `Genero_idGenero`) VALUES
(4, 100254789, 'Daniel', 'Pinto', '2009-08-22', 'Florencia - Caqueta',
'Activo', 1, 3);
INSERT INTO Estudiante (Persona_idPersona, userNameE, passwordE) values
(4, 'da.pinto@udla.edu.co', '123');

select * from estudiante;