const {
    pool
  } = require('../config/connection');

  var perfilActual;
  const GetPerfil = async (req, res, next) => {
    perfilActual = req.params.Id;
    console.log('Get');
    await pool.query(
      `
      SELECT  
      CONCAT( Nombre, ' ', Apellidos) AS Nombres,
      rol.rol AS Rol,
      Genero.genero AS Genero,
      email.email AS Email,
      telefono.Telefono AS Telefono,
      Persona.EstadoPersona AS Estado 

    FROM Persona INNER JOIN usuario
      ON
      usuario.Persona_idPersona = Persona.idPersona
      INNER JOIN
      Genero
      ON
      Persona.Genero_idGenero = Genero.idGenero
      INNER JOIN 
      email
      ON
      usuario.Email_idEmail = email.idEmail
      INNER JOIN 
      rol
      ON
      usuario.Rol_idRol = rol.idRol
      INNER JOIN 
      telefono
      ON
      telefono.Persona_idPersona = persona.idPersona
      WHERE 
      Persona.EstadoPersona = 'Activo';
      `, (err, data) => {
      console.log(data);
      if (!err && data.length > 0) {
        res.render('Dashboard/Profesor/Perfil/perfil', {
          data: data,
          layout: 'profesor.hbs'
        });
      } else {
        res.render('Dashboard/Profesor/Perfil/perfil', {
          data: {},
          layout: 'profesor.hbs'
        });
      }
    }
    );
  };
  
  module.exports = {
    GetPerfil,
  };