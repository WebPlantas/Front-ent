//Methods get
const { pool } = require('../config/connection');

const GetProfesor = async (req, res, next) => {
    console.log('Get');
    await pool.query(
        `
      SELECT Persona.idPersona AS Id, 
        Persona.NumeroIdentificacion AS Identificacion,
        CONCAT( Nombre, ' ', Apellidos) AS Nombres,
        CONCAT(Persona.FechaNacimiento, '') AS FechaNacimiento,
        Genero.genero AS Genero,
        Persona.EstadoPersona AS Estado
      FROM
        Profesor 
      INNER JOIN
        Persona
      ON
        Profesor.Persona_idPersona = Persona.idPersona
      INNER JOIN
        Genero
      ON
        Persona.Genero_idGenero = Genero.idGenero
      WHERE 
        Persona.EstadoPersona = 'Activo'
    `, (err, data) => {
            if (!err && data.length > 0) {
              res.render('Admin/Profesor/profesor', {
                data,
                layout : false
              });
            }else{
              res.render('Admin/Profesor/profesor', {
                data: {},
                layout : false
              });
            }
            
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
    GetProfesor
};


//Methods Post
