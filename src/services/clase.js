const {
  pool
} = require('../config/connection');
const helpers = require('../util/lib/helpers');


//Methods get
var perfilActual;
const GetClase = async (req, res, next) => {
  perfilActual = req.user.Persona_idPersona;
  console.log('Persona', perfilActual);
  await pool.query(
    `SELECT  
      idGradoCurso AS Grado, 
      NombreGrado AS NombreG 
    FROM 
      GradoCurso 
    WHERE 
    GradoCurso.Estado = 'Activo';
    `,
    async (err, data) => {
      if (!err && data.length > 0) {
        await pool.query(
          `SELECT    
            Clase.idClase AS ID,
            Clase.nombre AS Nombre,
            GradoCurso.NombreGrado AS Grado,
            Clase.Cantidad AS Cantidad
        FROM 
            Clase 
        INNER JOIN
            GradoCurso
        ON
            GradoCurso.idGradoCurso = Clase.GradoCurso_idGradoCurso
        WHERE 
            Clase.Estado = 'Activo'
        AND
        clase.Profesor_idProfesor = ${req.user.Persona_idPersona};    
              `,
          (er, result) => {
            if (!er && data.length > 0) {
              res.render('Dashboard/Profesor/Clase/clase', {
                data: data,
                Id: req.user.Persona_idPersona,
                result: result,
                layout: 'profesor.hbs'
              });
            } else {
              res.render('Dashboard/Profesor/Clase/clase', {
                data: data,
                Id: req.user.Persona_idPersona,
                result: {},
                layout: 'profesor.hbs'
              });
            }
          }
        );
      } else {
        console.log("wtf");
        res.redirect('/perfilprofesor');
      }
    }
  );
};

const GetCodigo = async (req, res, next) => {
  // console.log('id', claseActual);
  await pool.query(
    `SELECT 
      idClase AS Id 
    FROM 
      Clase 
    WHERE 
      Estado = 'Activo';
    `,
    async (err, data) => {
      if (!err && data.length > 0) {
        await pool.query(
          `SELECT
              Codigo.codigo AS Codigo,
              Clase.Nombre AS NombreC
          FROM
              Codigo
          INNER JOIN 
              Clase
          ON
              Codigo.Clase_idClase =  Clase.idClase
          WHERE
              Codigo.estado = 'Activo'
          AND
              Codigo.Clase_idClase = 10;    
              `,
          (er, result) => {
            if (!er && data.length > 0) {
              res.render('Dashboard/Profesor/Clase/detalleClase', {
                data: data,
                Id: req.params.Id,
                result: result,
                layout: 'profesor.hbs'
              });
            } else {
              res.render('Dashboard/Profesor/Clase/detalleClase', {
                data: data,
                Id: req.params.Id,
                result: {},
                layout: 'profesor.hbs'
              });
            }
          }
        );
      } else {
        console.log("wtf");
        res.redirect('/perfilprofesor');
      }
    }
  );
};

const GetEstudianteGrupo = async (req, res, next) => {
  console.log('Get');
  await pool.query(
    `
      SELECT  Persona.idPersona AS Id,
        Persona.NumeroIdentificacion AS Identificacion,
        CONCAT( Nombre, ' ', Apellidos) AS Nombres,
        CONCAT(Persona.FechaNacimiento, '') AS FechaNacimiento,
        Genero.genero AS Genero,
        Persona.EstadoPersona AS Estado 

      FROM Estudiante INNER JOIN Persona
		ON
        Estudiante.Persona_idPersona = Persona.idPersona
		INNER JOIN
        Genero
		ON
        Persona.Genero_idGenero = Genero.idGenero
		WHERE 
        Persona.EstadoPersona = 1;
    `, (err, data) => {
      console.log(data);
      if (!err && data.length > 0) {
        res.render('Admin/Estudiante/estudiante', {
          data: data,
          layout: 'admin.hbs'
        });
      } else {
        res.render('Admin/Estudiante/estudiante', {
          data: {},
          layout: 'admin.hbs'
        });
      }
    }
  );
};

//Methods Post
var id;
const RegisterClase = async (req, res, next) => {
  console.log(req.body);
  id = req.body.id;
  console.log('Persona', id);
  await pool.query(
    `SELECT 
      Persona_idPersona AS ID 
    FROM 
      Profesor 
    WHERE 
      Persona_idPersona = '${req.body.id}'
    `,
    async (er, dt) => {
      console.log('aquiiiiii', `${req.body.user.Persona_idPersona}`)
      if (!er && dt.length > 0) {
        console.log('entro if curso', `${req.params}`);
        await pool.query(
          `
            INSERT INTO
              Clase
            (
              Nombre,
              Cantidad,
              Estado,
              Descripcion,
              GradoCurso_idGradoCurso,
              Profesor_idProfesor
            )
            VALUES
            (
              '${req.body.clasename}',
               ${req.body.cantidadClase},
              'Activo',
              '${req.body.descripcionclase}',
               ${req.body.nombreGradoC},
               ${req.user.Persona_idPersona}
            )
            `,
          (err, data) => {
            console.log(err);
            if (!err && data.affectedRows > 0) {
              console.log("Creado");
              res.redirect(`/adminprofeso`);
            } else {
              res.redirect(`/adminprofeso`);
            }
          }
        );
      } else {
        res.redirect(`/perfilprofesor`);
      }
    }
  );
};


module.exports = {
  GetClase,
  GetCodigo,
  GetEstudianteGrupo,
  RegisterClase
};