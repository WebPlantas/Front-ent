const {
    pool
} = require('../config/connection');

const nodemailer = require('nodemailer');
const helpers = require('../util/lib/helpers');
const {
    EMAIL,
    PASSWORD
} = require('../const/const');

//Methods get
// const GetClase = async (req, res, next) => {
//     await pool.query(
//         `
//       SELECT  
//         idGradoCurso AS Grado, 
//         NombreGrado AS NombreG 
//       FROM 
//         GradoCurso 
//       WHERE 
//       GradoCurso.Estado = 'Activo';
//       `, (err, data) => {
//             if (!err && data.length > 0) {
//                 res.render('Dashboard/Profesor/Clase/clase', {
//                     data: data,
//                     Id: req.params.Id,
//                     layout: 'profesor.hbs'
//                 });
//             } else {
//                 res.render('Dashboard/Profesor/Clase/clase', {
//                     data: {},
//                     Id: req.params.Id,
//                     layout: 'profesor.hbs'
//                 });
//             }
//         }
//     );
// };

// const GetClaseList = async (req, res, next) => {
//     await pool.query(
//         `
//         SELECT    
//             Clase.idClase AS ID,
//             Clase.nombre AS Nombre,
//             GradoCurso.NombreGrado AS Grado,
//             Clase.Cantidad AS Cantidad
//         FROM 
//             Clase 
//         INNER JOIN
//             GradoCurso
//         ON
//             GradoCurso.idGradoCurso = Clase.GradoCurso_idGradoCurso
//         WHERE 
//             Clase.Estado = 'Activo'
//       `, (err, data) => {
//             if (!err && data.length > 0) {
//                 res.render('Dashboard/Profesor/Clase/clase', {
//                     data: data,
//                     Id: req.params.Id,
//                     layout: 'profesor.hbs'
//                 });
//             } else {
//                 res.render('Dashboard/Profesor/Clase/clase', {
//                     data: {},
//                     Id: req.params.Id,
//                     layout: 'profesor.hbs'
//                 });
//             }
//         }
//     );
// };
var perfilActual;
const GetClase = async (req, res, next) => {
    perfilActual = req.user.idUsuario;
    console.log('perfil', perfilActual);
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
        clase.Profesor_idProfesor = ${req.user.idUsuario};    
              `,
            (er, result) => {
              if (!er && data.length > 0) {
                res.render('Dashboard/Profesor/Clase/clase', {
                  data: data,
                  Id: req.params.Id,
                  result: result,
                  layout: 'profesor.hbs'
                });
              } else {
                res.render('Dashboard/Profesor/Clase/clase', {
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
module.exports = {
    GetClase,
};