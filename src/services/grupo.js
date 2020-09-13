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
    console.log('entro get GRUPO', req.user.Persona_idPersona);
    await pool.query(
      `SELECT 
        idProfesor
      FROM 
      Profesor 
      WHERE 
      Persona_idPersona = '${req.user.Persona_idPersona}'
      `,
      async (error, profesor) =>{
        console.log("GRUPO PROFESOR: ", profesor, error);
        if (!error && profesor.length>0) {
          await pool.query(`
            SELECT idClase, Nombre AS NombreC
            FROM Clase
            WHERE Profesor_idProfesor = '${profesor[0].idProfesor}'
          `, async(e, clase) =>{
            console.log("CLASE: ", clase);
              if (!e && clase.length>0) {
                await pool.query(
                  `
                  SELECT  
                  idGrupo AS Grupo,
                  NombreGrupo AS NombreG, 
                  Clase.Nombre AS NombreC,
                  codigo AS Codigo 
                  FROM 
                  Grupo
                  INNER JOIN Clase
                  ON idClase = Clase_idClase 
                  INNER JOIN Codigo
                  ON Codigo.Clase_idClase = idClase
                  WHERE 
                  Codigo.estado = 'Activo';
                `, (err, grupo) => {
                      console.log('GRUPO: ', grupo);
                      if (!err && grupo.length > 0) {
                          console.log('god');
                          res.render('Dashboard/Profesor/Grupo/grupo', {
                              grupo: grupo,
                              clase: clase,
                              Id: profesor[0].idProfesor,
                              layout: 'profesor.hbs'
                          });
                      } else {
                          res.render('Dashboard/Profesor/Grupo/grupo', {
                              grupo: {},
                              clase,
                              Id: profesor[0].idProfesor,
                              layout: 'profesor.hbs'
                          });
                      }
                  }
              );
              }else{
                res.render('Dashboard/Profesor/Grupo/grupo', {
                  grupo: {},
                  clase: {},
                  Id: profesor[0].idProfesor,
                  layout: 'profesor.hbs'
              });
              }
          }
          )
        }
      }
    )
    
};

var id;
const RegisterGrupoProfesor = async (req, res, next) => {
    console.log("BODY GRUPO", req.body);
    //id = req.body.id;
    await pool.query(
      `SELECT 
      idProfesor AS ID 
      FROM 
        Profesor 
      WHERE 
        Persona_idPersona = '${req.user.Persona_idPersona}'
      `,
      async (er, dt) => {
        console.log('PROFESOR GRUPO: ', dt)
        if (!er && dt.length > 0) {
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
            async (err, grupo) => {
              console.log("GRUPO: ", grupo);
              console.log("GRUPO INSERT: ", grupo.affectedRows);
              if (!err && grupo.affectedRows > 0) {
                const codigo = req.body.gruponame + "-" + Math.random().toString(36).substring(7);
                await pool.query(`
                  INSERT INTO 
                    Codigo
                    (
                      codigo,
                      estado,
                      Clase_idClase
                    ) VALUES
                    (
                      '${codigo}',
                      '1',
                      '${req.body.idClase}'
                    )
                `, (e, codigo)=>{
                  if (!e && codigo.affectedRows>0) {
                    console.log("CODIGO: ", codigo);
                    res.redirect(`/grupoclase`);
                  }else {
                    res.redirect(`/grupoclase`);
                  }
                }
                )
                
              }else {
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