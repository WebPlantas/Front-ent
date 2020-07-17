//Methods get
const { pool } = require('../config/connection');

const GetEstudiante= async (req, res, next) => {
    console.log('Get');
    await pool.query(
        `
        SELECT  Persona.NumeroIdentificacion AS Identificacion,
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
            if (err) throw err;
            console.log('datos', {data});
            res.render('Admin/Estudiante/estudiante', {data})
        }
    );
};

/*
res.render("'Admin/Profesor/profesor'", { data: data }, {
                    layaout: false
                } );
*/

/*
const NewClient = async (req, res, next) => {
  await Pool.query(
    `SELECT 
      ID,
      TipoDocumento
    FROM
      TipoDocumento
    WHERE
      State = 'Activo'`,
    (err, data) => {
      if (!err) {
        if (data.length > 0) {
          res.render("dashboard/cliente/nuevoClientes", { data: data });
        } else {
          res.redirect("/clientes");
        }
      } else {
        console.log(err);
        res.redirect("/home");
      }
    }
  );
};
*/
//Methods Post

module.exports = {
    GetEstudiante
};


//Methods Post
