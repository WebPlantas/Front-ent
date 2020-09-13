const {
  pool
} = require('../config/connection');
const helpers = require('../util/lib/helpers');
const { log } = require('handlebars');


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
          async (er, result) => {
            if (!er && data.length > 0) {
              await res.render('Dashboard/Profesor/Clase/clase', {
                data: data,
                Id: req.user.Persona_idPersona,
                result: result,
                layout: 'profesor.hbs'
              });
            } else {
              await res.render('Dashboard/Profesor/Clase/clase', {
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
//DETALLE CLASE
const GetCodigo = async (req, res, next) => {
  //console.log('ENTRO GETCODIGO', req.body);
  await pool.query(
    `SELECT 
      idClase AS Id,
      idProfesor 
    FROM 
      Clase
    INNER JOIN Profesor
    ON Profesor.idProfesor = Profesor_idProfesor
    INNER JOIN Persona
    ON idPersona = Profesor.Persona_idPersona
    INNER JOIN Usuario
    ON Usuario.Persona_idPersona = Persona.idPersona 
    WHERE 
      Usuario.idUsuario = ${req.user.idUsuario};
    `,
    async (err, data) => {
      console.log("clase codigo: ", data);
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
              Clase.Profesor_idProfesor = ${data[0].idProfesor};    
              `
          , async (er, result) => {
            console.log("RESULT: ", result[0].Codigo);
            if (!er && result.length > 0) {
              //console.log("entro if result");
              await pool.query(
                `
                SELECT row_number() over(ORDER BY Estudiante.idEstudiante) AS CODIGO,
                Estudiante.idEstudiante,
                CONCAT( Persona.Nombre, ' ', Persona.Apellidos) AS Nombres,
                Genero.genero AS Genero
                FROM Persona
                INNER JOIN Estudiante
                ON Estudiante.Persona_idPersona = idPersona
                INNER JOIN Genero
                ON Persona.Genero_idGenero = Genero.idGenero
                INNER JOIN Matricula
                ON Matricula.Estudiante_idEstudiante = idEstudiante
                INNER JOIN Grupo
                ON Grupo.idGrupo = Matricula.Grupo_idGrupo
                INNER JOIN Clase
                ON Clase.idClase = Grupo.Clase_idClase
                INNER JOIN Codigo 
                ON Codigo.Clase_idClase = Clase.idClase
                WHERE Codigo.codigo = '${result[0].Codigo}'

              `, async (error, estudiantes) => {
                console.log("estudiantes getcodigo: ",estudiantes, error) 
                if (!error && estudiantes.length > 0) {
                  await pool.query(
                    `
                    select idEstudiante,
                    NombreEvaluacion AS Evaluacion,
                    nota1 AS Nota
                    from Evaluacion
                    inner join Nota on Nota.Evaluacion_idEvaluacion = Evaluacion.idEvaluacion
                    inner join Usuario on Usuario.idUsuario = Nota.Usuario_idUsuario
                    inner join Persona on Persona.idPersona = Usuario.Persona_idPersona
                    INNER JOIN Estudiante
                    ON Estudiante.Persona_idPersona = idPersona
                    INNER JOIN Matricula
                    ON Matricula.Estudiante_idEstudiante = idEstudiante
                    INNER JOIN Grupo
                    ON Grupo.idGrupo = Matricula.Grupo_idGrupo
                    INNER JOIN Clase
                    ON Clase.idClase = Grupo.Clase_idClase
                    INNER JOIN Codigo 
                    ON Codigo.Clase_idClase = Clase.idClase
                    WHERE Codigo.codigo = '${result[0].Codigo}'
                    `, async (e, notas) => {
                      console.log("NOTAS: ", notas);
                    if (!e && notas.length > 0) {
                      res.render('Dashboard/Profesor/Clase/detalleClase', {
                        data: data,
                        IdProfesor: data[0].idProfesor,
                        IdClase: data[0].Id,
                        result: result,
                        estudiantes,
                        notas,
                        layout: 'profesor.hbs'
                      });
                    } else {
                      res.render('Dashboard/Profesor/Clase/detalleClase', {
                        data: data,
                        IdProfesor: data[0].idProfesor,
                        IdClase: data[0].Id,
                        result,
                        estudiantes,
                        layout: 'profesor.hbs'
                      });
                    }
                  }
                  )
                  
                } else {
                  res.render('Dashboard/Profesor/Clase/detalleClase', {
                    data: data,
                    IdProfesor: data[0].idProfesor,
                    IdClase: data[0].Id,
                    result: result,
                    layout: 'profesor.hbs'
                  });
                }
              }

              )
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
  //console.log("ENTRO REGISTER CLASE");
  //console.log('Persona', req.user.Persona_idPersona);
  await pool.query(
    `SELECT 
      idProfesor
    FROM 
      Profesor 
    WHERE 
      Persona_idPersona = '${req.user.Persona_idPersona}'
    `,
    async (er, dt) => {
      //console.log('PROFESOR: ', dt[0].idProfesor)
      if (!er && dt.length > 0) {
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
               ${dt[0].idProfesor}
            )
            `,
          (err, data) => {
            //console.log(err);
            if (!err && data.affectedRows > 0) {
              console.log("Creado");
              res.redirect(`/adminprofesor`);
            } else {
              res.redirect(`/adminprofesor`);
            }
          }
        );
      } else {
        res.redirect(`/perfilprofesor`);
      }
    }
  );
};

const DeleteClase = async (req, res, next) => {
  console.log(req.params);
  console.log("entro delete clase");
  await pool.query(
    `
            DELETE FROM 
              Clase
            WHERE
              idClase = ${req.params.Id}
          `,
    (er, dat) => {
      if (!er && dat.affectedRows > 0) {
        res.redirect(`/adminprofesor`);
      } else {
        res.redirect(`/adminprofesor`);
      }
    }
  );

};

module.exports = {
  GetClase,
  GetCodigo,
  GetEstudianteGrupo,
  RegisterClase,
  DeleteClase
};