const {
    pool
} = require('../config/connection');
const nodemailer = require('nodemailer');
const helpers = require('../util/lib/helpers');
const {
    EMAIL,
    PASSWORD
} = require('../const/const');



const GetGrupoProfesor = async (req, res, next) => {
    console.log('entro get gru', req.params.Id);
    await pool.query(
        `
      SELECT  
        idClase AS Clase, 
        Nombre AS NombreC 
      FROM 
        Clase 
      WHERE 
      Clase.Estado = 'Activo';
      `, (err, data) => {
            console.log('clase', data);
            if (!err && data.length > 0) {
                console.log('god');
                res.render('Dashboard/Profesor/Grupo/grupo', {
                    data: data,
                    Id: req.params.Id,
                    layout: 'profesor.hbs'
                });
            } else {
                res.render('Dashboard/Profesor/Grupo/grupo', {
                    data: {},
                    Id: req.params.Id,
                    layout: 'profesor.hbs'
                });
            }
        }
    );
};

var id;
const RegisterGrupoProfesor = async (req, res, next) => {
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
        console.log('aquiiiiii', dt)
        if (!er && dt.length > 0) {
          console.log('entro if clase', `${req.params}`);
          await pool.query(
            `
              INSERT INTO
                Grupo
              (
                NombreGrupo,
              Clase_idClase
            )
            VALUES
            (
              '${req.body.gruponame}',
               ${req.body.idClase}
            )
            `,
            (err, data) => {
              console.log(err);
              if (!err && data.affectedRows > 0) {
                console.log("Creado");
                res.redirect(`/grupoclase`);
              } else {
                res.redirect(`/grupoclase`);
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
    GetGrupoProfesor,
    RegisterGrupoProfesor
};