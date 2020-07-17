#Masculino es 3
#Femenino es 2
#CC es 2 
#Tarjeta de identidad es 1
use webplants;

INSERT INTO `webplants`.`persona` (`idPersona`, `NumeroIdentificacion`,
`Nombre`, `Apellidos`, `FechaNacimiento`, `Direccion`, `EstadoPersona`,
`TipoDocumento_idTipoDocumento`, `Genero_idGenero`) VALUES
(1, 1117539881, 'Oscar', 'Zambrano', '1994-08-22', 'Curillo - Caqueta',
'Activo', 2, 3);
INSERT INTO Profesor (Persona_idPersona, userNameP, passwordP) values
(1, 'os.mojica@udla.edu.co', '123');

INSERT INTO `webplants`.`persona` (`idPersona`, `NumeroIdentificacion`,
`Nombre`, `Apellidos`, `FechaNacimiento`, `Direccion`, `EstadoPersona`,
`TipoDocumento_idTipoDocumento`, `Genero_idGenero`) VALUES
(2, 1117552415, 'Andres', 'Cadena', '1999-02-02', 'Pitalito - Huila',
'Activo', 2, 3);
INSERT INTO Profesor (Persona_idPersona, userNameP, passwordP) values
(2, 'an.cadena@udla.edu.co', '123');
