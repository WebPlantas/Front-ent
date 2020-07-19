//Methods get
const { pool } = require('../config/connection');

const GetEstudiante = async (req, res, next) => {
    console.log('Get');
    await pool.query(
        `
        SELECT  Persona.idPersona AS Id,
        Persona.NumeroIdentificacion AS Identificacion,
        CONCAT( Nombre, ' ', Apellidos) AS Nombres,
        CONCAT(Persona.FechaNacimiento, '') AS FechaNacimiento,
        Genero.genero AS Genero,
        Persona.EstadoPersona AS Estado FROM Estudiante INNER JOIN Persona
		ON
        Estudiante.Persona_idPersona = Persona.idPersona
		INNER JOIN
        Genero
		ON
        Persona.Genero_idGenero = Genero.idGenero
		WHERE 
        Persona.EstadoPersona = 'Activo';
    `, (err, data) => {
            console.log('Aqui');
            if (!err && data.length > 0){
              res.render('Admin/Estudiante/estudiante', {
                data : data,
                layout: false
              });
            }else{
              res.render('Admin/Estudiante/estudiante', {
                data: {}, 
                layout: false
              });
            }
        }
    );
};

const PerfilEstudiante = async (req, res, next) => {
  console.log(req.params.Id);
  await pool.query(
    `SELECT
      Persona.idPersona as ID,
      Persona.NumeroIdentificacion AS Identificacion,
      CONCAT( Nombre, ' ', Apellidos) AS Nombres,
      Genero.genero AS Genero
    FROM
      Estudiante 
    INNER JOIN
      Persona
    ON
      Estudiante.Persona_idPersona = Persona.idPersona
    INNER JOIN
      Genero
    ON
      Genero.idGenero = Persona.idPersona
    WHERE 
      Estudiante.Persona_idPersona = '${req.params.Id}';
  `, (err, data) => {
            if (!err && data.length > 0) {
              res.render("Admin/Estudiante/perfilEstudiante", {
                Id: data[0].ID,
                data: data,
                layout: false
              });
            } else {
              res.render("Admin/Estudiante/Estudiante", {
                data: {},
                layout: false
              });
            }
          }
        );
      };

//Methods Post

module.exports = {
    GetEstudiante,
    PerfilEstudiante
};


//Methods Post
