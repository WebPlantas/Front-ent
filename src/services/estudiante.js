const {
  pool
} = require('../config/connection');
const nodemailer = require('nodemailer');
const helpers = require('../util/lib/helpers');
const {
  EMAIL,
  PASSWORD
} = require('../const/const');

const GetEstudiante = async (req, res, next) => {
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

const NewEstudiante = async (req, res, next) => {
  await pool.query(
    `SELECT 
      idTipoDocumento,
      Tipo
    FROM
      TipoDocumento
    WHERE
      Estado = 'Activo'`,
    (err, data) => {
      console.log('test', data[0].idTipoDocumento);
      if (!err) {
        if (data.length > 0) {
          res.render('Admin/Estudiante/nuevoEstudiante', {
            data: data,
            layout: 'admin.hbs'
          });
        } else {
          res.redirect("/estudiantes");
        }
      } else {
        console.log(err);
        res.redirect("/admin");
      }
    }
  );
};

const GetGrupo = async (req, res, next) => {
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
      res.render('Admin/Estudiante/registrarGrupo', {
        data: data,
        Id: req.params.Id,
        layout: 'admin.hbs'
      });
    } else {
      res.render('Admin/Estudiante/registrarGrupo', {
        data: {},
        Id: req.params.Id,
        layout: 'admin.hbs'
      });
    }
  }
  );
};
var perfilActual;
const PerfilEstudiante = async (req, res, next) => {
  perfilActual = req.params.Id;
  console.log("Perfil ", req.body);
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
      Genero.idGenero = Persona.Genero_idGenero
    WHERE 
      Estudiante.Persona_idPersona = '${req.params.Id}';
  `, async (err, data) => {
    if (!err && data.length === 1) {
      await pool.query(
        `    SELECT    
        Grupo.idGrupo AS ID,
        Grupo.NombreGrupo AS Nombre,
        Clase.nombre AS Clase
    FROM 
        Grupo 
     INNER JOIN
        Clase  
      ON
        Clase.idClase = Grupo.Clase_idClase
          
          `,
        (er, result) => {
          if (!er && data.length > 0) {
            res.render("Admin/Estudiante/perfilEstudiante", {
              data: data,
              Id: req.params.Id,
              result: result,
              layout: 'admin.hbs'
            });
          } else {
            res.render("Admin/Estudiante/perfilEstudiante", {
              data: data,
              Id: req.params.Id,
              result: {},
              layout: 'admin.hbs'
            });
          }
        }
      );
    } else {
      console.log("wtf");
      res.redirect("/profesor");
    }
  }
  );
};

const GetUpdateEstudiante = async (req, res, next) => {
  console.log('entro get perfil', req.body);
  await pool.query(
    `
            SELECT
            Persona_idPersona AS ID
            FROM
              Estudiante
            WHERE 
            Persona_idPersona = '${req.params.Id}'
          `,
    async (er, dt) => {
      if (!er && dt.length > 0) {
        console.log(dt[0].ID);
        await pool.query(
          `
                  SELECT
                    NumeroIdentificacion AS Identificacion,
                    Nombre AS Nombre,
                    Apellidos AS Apellidos,
                    Direccion,
                    Genero.genero AS Genero,
                    Telefono.Telefono as Telefono
                  FROM
                    Persona
                  INNER JOIN 
                    Telefono
                  ON
                    Telefono.Persona_idPersona = Persona.idPersona  
                  INNER JOIN
                    Genero
                  ON
                    Genero.idGenero = Persona.Genero_idGenero
                  WHERE
                  idPersona = ${dt[0].ID}
                  LIMIT 1
                `,
          (err, data) => {
            if (!err && data.length > 0) {
              res.render('Admin/Estudiante/actualizarEstudiante', {
                data: data,
                Id: req.params.Id,
                layout: 'admin.hbs'
              });
            } else {
              res.redirect(`/perfilEstudiante/${req.params.Id}`);
            }
          }
        );
      } else {
        res.redirect(`/perfilEstudiante/${req.params.Id}`);
      }
    }
  );
};

const GetUpdateGrupo = async (req, res, next) => {
  //console.log('entro get ', req.params.Id);
  await pool.query(
    `
    SELECT  
      idClase AS Grado, 
      nombre AS NombreC 
    FROM 
      Clase 
    WHERE 
      Clase.Estado = 'Activo'
    `,
    async (er, dt) => {
      console.log("dt", dt);
      if (!er && dt.length > 0) {
        await pool.query(
          `
            SELECT
              NombreGrupo,
              DATE_FORMAT(FechaInicio, "%d,%m,%Y") AS fechaI,
              DATE_FORMAT(FechaFin, "%d,%m,%Y") AS fechaF 
            FROM
               Matricula
            INNER JOIN 
              Grupo
            ON
              idGrupo = Grupo_idGrupo
            WHERE
              idGrupo = ${req.params.Id}
            LIMIT 1
          `,
          async (err, data) => {
            console.log("data", data);
            if (!err && data.length > 0) {
              res.render('Admin/Estudiante/actualizarGrupo', {
                dt: dt,
                data: data,
                Id: req.params.Id,
                layout: 'admin.hbs'
              });
            } else {
              res.redirect(`/perfilEstudiante/${req.params.Id}`);
            }
          }
        );

      } else {
        res.redirect(`/perfilEstudiante/${req.params.Id}`);
      }
    }
  );
}

//Methods Post

const CreateNewEstudiante = async (req, res, next) => {
  //console.log("entro create", req.body);
  await pool.query(
    `INSERT INTO
      Persona
    (
      NumeroIdentificacion,
      Nombre,
      Apellidos,
      FechaNacimiento,
      Direccion,
      EstadoPersona,
      TipoDocumento_idTipoDocumento,
      Genero_idGenero
    )
    VALUES
    (
      ${req.body.identificacion},
      '${req.body.nombre}',
      '${req.body.apellidos}',
      '${req.body.nacimiento}',
      '${req.body.direccion}',
      1,
      ${req.body.documento},
      ${req.body.genero}
    )`,
    async (err, data) => {
      if (!err && data.affectedRows > 0) {
        //console.log('entro if tel', req.body.celular, data.insertId);
        await pool.query(
          `INSERT INTO 
            telefono
          (
            Telefono, 
            Estado,
            Persona_idPersona
          )
          VALUES
          (
            ${req.body.celular},
            1,
            ${data.insertId}
          )
          `,
          async (err, data2) => {
            //console.log("aa", err);
            if (!err && data2.affectedRows > 0) {
              console.log('entro if estudiante');
              await pool.query(
                `INSERT INTO
                  Estudiante
                (
                  Persona_idPersona
                )
                VALUES
                (
                  ${data.insertId}
                )`,
                (err, dta) => {
                  if (!err && dta.affectedRows > 0) {
                    res.redirect("/estudiantes");
                  } else {
                    pool.query(
                      `DELETE FROM telefono WHERE IdTelefono = ${data2.insertId}`
                    );
                    pool.query(
                      `DELETE FROM Persona WHERE idPersona = ${data.insertId}`
                    );
                    res.redirect("/estudiantes");
                  }
                }
              );
            } else {
              pool.query(
                `DELETE FROM Persona WHERE idPersona = ${data.insertId}`
              );
              res.redirect("/estudiantes");
            }
          }
        );
      } else {
        //console.log(err);
        res.redirect("/estudiantes");
      }
    }
  );
};

//Estudiante con correo

const ECreateNewEstudiante = async (req, res, next) => {
  console.log(req.body);

  await pool.query(
    `SELECT idGrupo, NombreGrupo, idClase, Clase.Nombre, idCodigo, codigo
    FROM Grupo INNER JOIN Clase ON Grupo.Clase_idClase = idClase
    INNER JOIN Codigo ON Codigo.Clase_idClase = idClase
    WHERE codigo = '${req.body.codigoClase}' 
    `, async (e, grupo) => {
      console.log("GRUPO: ", grupo, e);
    if (!e && grupo.length > 0) {
      await pool.query(
        `INSERT INTO
            Persona
          (
            NumeroIdentificacion,
            Nombre,
            Apellidos,
            EstadoPersona,
            TipoDocumento_idTipoDocumento,
            Genero_idGenero
          )
          VALUES
          (
            ${req.body.identificacion},
            '${req.body.nombre}',
            '${req.body.apellidos}',
            'Activo',
            ${req.body.tipoDocumento},
            ${req.body.genero}
          )`,
        async (err, persona) => {
          console.log("persona", persona, err);
          if (!err && persona.affectedRows > 0) {
            await pool.query(
              `INSERT INTO 
                  telefono
                (
                  Telefono, 
                  Estado,
                  Persona_idPersona
                )
                VALUES
                (
                  ${req.body.celular},
                  'Activo',
                  ${persona.insertId}
                )
                `,
              async (err, data2) => {
                if (!err && data2.affectedRows > 0) {
                  await pool.query(
                    `INSERT INTO
                        Estudiante
                      (
                        Persona_idPersona
                      )
                      VALUES
                      (
                        ${persona.insertId}
                      )`,
                    async (err, dta) => {
                      if (!err && dta.affectedRows > 0) {
                        await pool.query(`
                            INSERT INTO Matricula
                            (
                              Estudiante_idEstudiante,
                              Estudiante_Persona_idPersona,
                              Grupo_idGrupo,
                              Estado
                            )
                            VALUES
                            (
                              ${dta.insertId},
                              ${persona.insertId},
                              ${grupo[0].idGrupo},
                              'Activo'
                            )
                          `, async (err, matricula) => {
                          console.log("MATRICULA: ", matricula, err);
                          if (!err && matricula.affectedRows > 0) {
                            await pool.query(
                              `INSERT INTO
                                Email
                                (
                                  email,
                                  Estado
                                )
                                VALUES
                                (
                                '${req.body.correo}',
                                1
                                )
                              `, async (e, datos) => {
                              if (!e && datos.affectedRows > 0) {
                                var transporter = nodemailer.createTransport({
                                  host: 'smtp.gmail.com',
                                  port: 465,
                                  auth: {
                                    user: "andrescadena0607@gmail.com",
                                    pass: "52736952872"
                                  }
                                })
    
                                function password(length) {
                                  var result = '';
                                  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                                  var charactersLength = characters.length;
                                  for (var i = 0; i < length; i++) {
                                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                                  }
                                  return result;
                                }
                                const usuario = req.body.nombre + Math.random().toString(36).substring(7);
                                var pass = password(6);
                                var passE = await helpers.encrytPassword(pass);
                                //console.log("random", r);
                                var mailOptions = {
                                  from: "WebPlants",
                                  to: req.body.correo,
                                  subject: "Usuario y contraseña",
                                  text: "Hola " + req.body.nombre + " este es su usuario y contraseña. \n" +
                                    "Usuario: " + usuario + "\n" + "Contraseña: " + pass
                                }
                                await pool.query(
                                  `INSERT INTO
                              Usuario
                                (
                                  Username,
                                  Password,
                                  Estado,
                                  Rol_idRol,
                                  Persona_idPersona,
                                  Email_idEmail
                                )
                                VALUES
                                (
                                  '${usuario}',
                                  '${passE}',
                                  'Activo',
                                  2,
                                  ${persona.insertId},
                                  ${datos.insertId}
                                )`,
                                  (error, da) => {
                                    console.log("usuario:", da);
                                    if (!error && da.affectedRows > 0) {
                                      transporter.sendMail(mailOptions, (error, info) => {
                                        if (error) {
                                          console.log(error);
                                        } else {
                                          console.log("email enviado correctamente", info);
                                          res.redirect("/login");
                                        }
                                      })
    
                                    } else {
                                      console.log(error);
    
                                    }
    
                                  }
                                )
                              } else {
                                pool.query(
                                  `DELETE FROM Telefono WHERE ID = ${data2.insertId}`
                                );
                                pool.query(
                                  `DELETE FROM Persona WHERE ID = ${persona.insertId}`
                                );
                                res.redirect("/estudiantes");
                              }
    
                            }
                            )
                          }
                        }
                        )
                      }

                    }
                  );
                } else {
                  pool.query(
                    `DELETE FROM Persona WHERE ID = ${data.insertId}`
                  );
                  res.redirect("/estudiantes");
                }
              }
            );
          } else {
            console.log(err);
            res.redirect("/estudiante");
          }
        }
      );
    }
  }
  )
};

const PostUpdateEstudiante = async (req, res, next) => {
  console.log("ENTRO POS", req.body);
  await pool.query(
    `
      SELECT 
      Persona_idPersona AS ID
      FROM 
        Estudiante
      WHERE
      Persona_idPersona = '${req.body.Id}'
    `,
    async (er, dt) => {
      console.log("und", dt[0].ID);
      if (!er && dt.length > 0) {
        //console.log(req.body.nombreE);
        await pool.query(
          `
            UPDATE
              Persona
            INNER JOIN
              Telefono
            ON
              Telefono.Persona_idPersona = Persona.idPersona
            INNER JOIN
              Genero
            ON
              Genero.idGenero = Persona.Genero_idGenero
            SET
              NumeroIdentificacion = ${req.body.cedulaE},
              Nombre = '${req.body.nombreE}',
              Apellidos = '${req.body.apellidosE}',
              Direccion = '${req.body.direccionE}',
              Genero.genero = '${req.body.generoE}',
              Telefono.Telefono = '${req.body.telefonoE}'
            WHERE 
            idPersona = ${dt[0].ID}
          `,
          (err, data) => {
            console.log("data pos estu", data);
            if (!err && data.affectedRows > 0) {
              res.redirect(`/perfilEstudiante/${req.body.Id}`);
            } else {
              res.redirect(`/perfilEstudiante/${req.body.Id}`);
            }
          }
        );
      } else {
        res.redirect(`/perfilEstudiante/${req.body.Id}`);
      }
    }
  );
};

const DeleteEstudiante = async (req, res, nest) => {
  await pool.query(
    `
      SELECT
        idPersona AS ID
      FROM
        Persona
      WHERE
        idPersona = '${req.body.Id}'
    `,
    async (err, data) => {
      if (!err && data.length > 0) {
        await pool.query(
          `
            UPDATE 
              Persona
            SET
              EstadoPersona = 'Inactivo'
            WHERE
              idPersona = ${data[0].ID}
          `,
          (er, dat) => {
            if (!err && dat.affectedRows > 0) {
              res.redirect("/estudiantes");
            } else {
              res.redirect(`/perfilEstudiante/${req.body.Id}`);
            }
          }
        );
      } else {
        res.redirect(`/perfilEstudiante/${req.body.Id}`);
      }
    }
  );
};

const RegisterGrupo = async (req, res, next) => {
  //console.log('entro registrer', req.body.id);
  await pool.query(
    `
            SELECT
            Persona_idPersona AS ID
            FROM
              Estudiante
            WHERE 
            Persona_idPersona = '${req.body.id}'
          `,
    async (er, dt) => {
      //console.log('primero');
      if (!er && dt.length > 0) {
        console.log('1', req.body);
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
              '${req.body.nombreG}',
               ${req.body.idClase}
            )
            `,
          async (err, data, next) => {
            //console.log('segundo');
            if (!err && data.affectedRows > 0) {
              console.log(dt[0].ID);
              await pool.query(
                `INSERT INTO
                Matricula
              (
              Estudiante_idEstudiante,
              Estudiante_Persona_idPersona,
              Grupo_idGrupo,
              FechaInicio,
              FechaFin,
              Estado
              )
              VALUES
              (
                ${req.body.id},
                ${dt[0].ID},
                ${data.insertId},
                '${req.body.fechaI}',
                '${req.body.fechaF}',
                'Activo'
              ) `,
                async (err, data2) => {
                  //console.log('tercero', data2);
                  if (!err && data2.affectedRows > 0) {
                    console.log('works');
                    res.redirect(`/perfilEstudiante/${dt[0].ID}`);
                  } else {
                    console.log('terce', err);
                  }
                }
              )

            } else {
              console.log('segun', err);
            }
          }
        )
      } else {
        console.log('primer', er);
      }
    }
  );
};

const PostUpdateGrupo = async (req, res, next) => {
  console.log('entro post ', req.body);
  await pool.query(
    `
           UPDATE
            GradoCurso
          SET
            idGradoCurso= '${req.body.NombreG}'
          WHERE
            idGradoCurso = ${req.body.NombreG}    
          `,
    async (er, dt) => {
      console.log("sigue");
      if (!er && dt.affectedRows > 0) {
        console.log("entro");
        await pool.query(
          `
                 UPDATE
                  Matricula
                INNER JOIN
                  Grupo
                ON
                  idGrupo = Grupo_idGrupo
                SET
                  NombreGrupo= '${req.body.NombreGrupo}',
                  FechaInicio= '${req.body.FechaI}',
                  FechaFin= '${req.body.FechaF}'
                WHERE
                  idGrupo = ${req.body.Id}    
                `,
          async (err, data) => {
            console.log("data", data.affectedRows);
            if (!err && data.affectedRows > 0) {
              res.redirect(`/perfilEstudiante/${perfilActual}`);
            } else {
              res.redirect(`/perfilEstudiante/${req.params.Id}`);
            }
          }
        );
      } else {
        console.log(er);
      }
    }
  )

};

const DeleteGrupo = async (req, res, next) => {
  console.log(req.params);
  console.log("entro delete");
  await pool.query(
    `
            DELETE FROM 
              Grupo
            WHERE
              idGrupo = ${req.params.Id}
          `,
    (er, dat) => {
      if (!er && dat.affectedRows > 0) {
        res.redirect(`/perfilEstudiante/${perfilActual}`);
      } else {
        res.redirect(`/perfilEstudiante/${perfilActual}`);
      }
    }
  );

};




module.exports = {
  GetEstudiante,
  NewEstudiante,
  GetGrupo,
  CreateNewEstudiante,
  PerfilEstudiante,
  GetUpdateEstudiante,
  PostUpdateEstudiante,
  DeleteEstudiante,
  RegisterGrupo,
  GetUpdateGrupo,
  PostUpdateGrupo,
  DeleteGrupo,
  ECreateNewEstudiante
};