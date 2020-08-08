//Methods get
const {
  pool
} = require('../config/connection');

const GetProfesor = async (req, res, next) => {
  console.log('Get');
  await pool.query(
    `
      SELECT  Persona.idPersona AS Id,
        Persona.NumeroIdentificacion AS Identificacion,
        CONCAT( Nombre, ' ', Apellidos) AS Nombres,
        CONCAT(Persona.FechaNacimiento, '') AS FechaNacimiento,
        Genero.genero AS Genero,
        Persona.EstadoPersona AS Estado 

      FROM Profesor INNER JOIN Persona
		ON
        Profesor.Persona_idPersona = Persona.idPersona
		INNER JOIN
        Genero
		ON
        Persona.Genero_idGenero = Genero.idGenero
		WHERE 
        Persona.EstadoPersona = 'Activo';
    `, (err, data) => {
    console.log(data);
    if (!err && data.length > 0) {
      res.render('Admin/Profesor/Profesor', {
        data: data,
        layout: 'admin.hbs'
      });
    } else {
      res.render('Admin/Profesor/Profesor', {
        data: {},
        layout: 'admin.hbs'
      });
    }
  }
  );
};

const NewProfesor = async (req, res, next) => {
  await pool.query(
    `SELECT 
      idTipoDocumento,
      Tipo
    FROM
      TipoDocumento
    WHERE
      Estado = 'Activo'
      `,
    (err, data) => {
      console.log("Documentos", data);
      if (!err) {
        if (data.length > 0) {
          res.render('Admin/Profesor/nuevoProfesor', {
            data: data,
            layout: 'admin.hbs'
          });
        } else {
          res.redirect("/profesores");
        }
      } else {
        console.log(err);
        res.redirect("/admin");
      }
    }
  );
};
var perfilActual;
const PerfilProfesor = async (req, res, next) => {
  perfilActual = req.params.Id;
  console.log('perfil', perfilActual);
  await pool.query(
    `SELECT
      Persona.idPersona as ID,
      Persona.NumeroIdentificacion AS Identificacion,
      CONCAT( Nombre, ' ', Apellidos) AS Nombres,
      Genero.genero AS Genero
    FROM
      Profesor 
    INNER JOIN
      Persona
    ON
      Profesor.Persona_idPersona = Persona.idPersona
    INNER JOIN
      Genero
    ON
      Genero.idGenero = Persona.Genero_idGenero
    WHERE 
      Profesor.Persona_idPersona = '${req.params.Id}';
  `,
    async (err, data) => {
      if (!err && data.length === 1) {
        await pool.query(
          `SELECT    
              Curso.idCurso AS ID,
              GradoCurso.NombreGrado AS Nombre,
              Curso.Cantidad AS Cantidad
          FROM 
              Curso 
           INNER JOIN
              GradoCurso
            ON
              GradoCurso.idGradoCurso = Curso.GradoCurso_idGradoCurso
            WHERE 
              Curso.Estado = 'Activo'
            AND
              Profesor_Persona_idPersona = ${data[0].ID}
            `,
          (er, result) => {
            if (!er && data.length > 0) {
              res.render("Admin/Profesor/perfilProfesor", {
                data: data,
                Id: req.params.Id,
                result: result,
                layout: 'admin.hbs'
              });
            } else {
              res.render("Admin/Profesor/perfilProfesor", {
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

const GetUpdateProfesor = async (req, res, next) => {
  await pool.query(
    `
            SELECT
            Persona_idPersona AS ID
            FROM
              Profesor
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
              console.log("consulta", data);
              res.render('Admin/Profesor/actualizarProfesor', {
                data: data,
                Id: req.params.Id,
                layout: 'admin.hbs'
              });
            } else {
              res.redirect(`/perfilProfesor/${req.params.Id}`);
            }
          }
        );
      } else {
        res.redirect(`/perfilProfesor/${req.params.Id}`);
      }
    }
  );
};

//Methods Post

const CreateNewProfesor = async (req, res, next) => {
  console.log(req.body);
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
      ${req.body.identificacionP},
      '${req.body.nombreP}',
      '${req.body.apellidosP}',
      '${req.body.nacimientoP}',
      '${req.body.direccionP}',
      'Activo',
      ${req.body.documentoP},
      ${req.body.generoP}
    )`,
    async (err, data) => {
      if (!err && data.affectedRows > 0) {
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
            ${req.body.celularP},
            'Activo',
            ${data.insertId}
          )
          `,
          async (err, data2) => {
            if (!err && data2.affectedRows > 0) {
              await pool.query(
                `INSERT INTO
                  Profesor
                (
                  Persona_idPersona
                )
                VALUES
                (
                  ${data.insertId}
                )`,
                (err, dta) => {
                  if (!err && dta.affectedRows > 0) {
                    res.redirect("/profesores");
                  } else {
                    pool.query(
                      `DELETE FROM Telefono WHERE ID = ${data2.insertId}`
                    );
                    pool.query(
                      `DELETE FROM Persona WHERE ID = ${data.insertId}`
                    );
                    res.redirect("/profesores");
                  }
                }
              );
            } else {
              pool.query(
                `DELETE FROM Persona WHERE ID = ${data.insertId}`
              );
              res.redirect("/profesores");
            }
          }
        );
      } else {
        console.log(err);
        res.redirect("/Profesor");
      }
    }
  );
};

const PostUpdateProfesor = async (req, res, next) => {
  console.log("ENTRO POS", req.body);
  await pool.query(
    `
      SELECT 
      Persona_idPersona AS ID
      FROM 
        Profesor
      WHERE
      Persona_idPersona = '${req.body.Id}'
    `,
    async (er, dt) => {
      console.log("und", dt[0]);
      if (!er && dt.length > 0) {
        console.log(req.body.nombreP);
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
              NumeroIdentificacion = ${req.body.cedulaP},
              Nombre = '${req.body.nombreP}',
              Apellidos = '${req.body.apellidosP}',
              Direccion = '${req.body.direccionP}',
              Genero.genero = '${req.body.generoP}',
              Telefono.Telefono = '${req.body.telefonoP}'
            WHERE 
            idPersona = ${dt[0].ID}
          `,
          (err, data) => {
            if (!err && data.affectedRows > 0) {
              res.redirect(`/perfilProfesor/${req.body.Id}`);
            } else {
              res.redirect(`/perfilProfesor/${req.body.Id}`);
            }
          }
        );
      } else {
        res.redirect(`/perfilProfesor/${req.body.Id}`);
      }
    }
  );
};

const DeleteProfesor = async (req, res, nest) => {
  console.log("DELETE", req.body);
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
        console.log("data delete", data);
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
              res.redirect("/profesores");
            } else {
              res.redirect(`/perfilProfesor/${req.body.Id}`);
            }
          }
        );
      } else {
        res.redirect(`/perfilProfesor/${req.body.Id}`);
      }
    }
  );
};

//=====CURSO
//Get
const GetCurso = async (req, res, next) => {
  await pool.query(
    `
    SELECT  
      idGradoCurso AS Grado, 
      NombreGrado AS NombreG 
    FROM 
      GradoCurso 
    WHERE 
    GradoCurso.Estado = 'Activo';
    `, (err, data) => {
    if (!err && data.length > 0) {
      res.render('Admin/Profesor/registrarCurso', {
        data: data,
        Id: req.params.Id,
        layout: 'admin.hbs'
      });
    } else {
      res.render('Admin/Profesor/registrarCurso', {
        data: {},
        Id: req.params.Id,
        layout: 'admin.hbs'
      });
    }
  }
  );
};
var idGradoP;
const GetUpdateCurso = async (req, res, next) => {
  console.log('entro get ', req.params);
  await pool.query(
    `
    SELECT  
      idGradoCurso AS Grado, 
      NombreGrado AS NombreG 
    FROM 
      GradoCurso 
    WHERE 
    GradoCurso.Estado = 'Activo';
    `,
    async (er, dt) => {
      console.log("dt pro", dt[0].Grado);
      idGradoP = dt[0].Grado;
      if (!er && dt.length > 0) {
        await pool.query(
          `
            SELECT
              NombreGrado,
              Cantidad,
              Descripcion
            FROM
               Curso
            INNER JOIN 
              GradoCurso
            ON
              idGradoCurso = GradoCurso_idGradoCurso
            WHERE
              idCurso = ${req.params.Id}
            LIMIT 1
          `,
          async (err, data) => {
            console.log("data", data);
            if (!err && data.length > 0) {
              console.log("error", err);
              res.render('Admin/Profesor/actualizarCurso', {
                dt: dt,
                data: data,
                Id: req.params.Id,
                layout: 'admin.hbs'
              });
            } else {
              res.redirect(`/perfilProfesor/${req.params.Id}`);
            }
          }
        );

      } else {
        res.redirect(`/perfilEstudiante/${req.params.Id}`);
      }
    }
  );
}
//Post
const RegisterCourse = async (req, res, next) => {
  console.log(req.body);
  await pool.query(
    `SELECT 
      Persona_idPersona AS ID 
    FROM 
      Profesor 
    WHERE 
      Persona_idPersona = '${req.body.id}'`,
    async (er, dt) => {
      //console.log(`${req.body.cantidadC}`)
      if (!er && dt.length > 0) {
        console.log('entro if curso', `${req.params}`);
        await pool.query(
          `
            INSERT INTO
              Curso
            (
              Cantidad,
              Estado,
              Descripcion,
              Profesor_Persona_idPersona,
              GradoCurso_idGradoCurso,
              Profesor_idProfesor
            )
            VALUES
            (
              ${req.body.cantidadC},
              'Activo',
              '${req.body.descripcionC}',
              ${dt[0].ID},
              ${req.body.nombreG},
              ${req.body.id}
            )
            `,
          (err, data) => {
            console.log(err);
            if (!err && data.affectedRows > 0) {
              console.log("Creado");
              res.redirect(`/perfilProfesor/${req.body.id}`);
            } else {
              res.redirect(`/registrarCurso/${req.body.id}`);
            }
          }
        );
      } else {
        res.redirect(`/registrarCurso/${req.body.id}`);
      }
    }
  );
};

const PostUpdateCurso = async (req, res, next) => {
  console.log('entro post ', req.body);
  await pool.query(
    `
           UPDATE
            GradoCurso
          SET
            NombreGrado= '${req.body.NombreGrado}'
          WHERE
            idGradoCurso = ${idGradoP}    
          `,
    async (er, dt) => {
      console.log("sigue");
      if (!er && dt.affectedRows > 0) {
        console.log("entro");
        await pool.query(
          `
                 UPDATE
                  Curso
                SET
                  Cantidad= ${req.body.Cantidad},
                  Descripcion= '${req.body.Descripcion}'
                WHERE
                  idCurso = ${req.body.Id}    
                `,
          async (err, data) => {
            console.log("desp entro er", err);
            console.log("data", data.affectedRows);
            if (!err && data.affectedRows > 0) {
              console.log(perfilActual, 'perfil');
              res.redirect(`/perfilProfesor/${perfilActual}`);
            } else {
              res.redirect(`/perfilProfesor/${perfilActual}`);
            }
          }
        );
      } else {
        console.log(er);
      }
    }
  )

};

const DeleteCurso = async (req, res, next) => {
  console.log("entro delete", req.params.Id);
  await pool.query(
    `
            UPDATE 
              Curso
            SET
              Estado = 'Inactivo'
            WHERE
              idCurso = ${req.params.Id}
          `,
    (er, dat) => {
      if (!er && dat.affectedRows > 0) {
        console.log('perfil ac', perfilActual);
        res.redirect(`/perfilProfesor/${perfilActual}`);
      } else {
        res.redirect(`/perfilProfesor/${perfilActual}`);
      }
    }
  );
};

module.exports = {
  GetProfesor,
  NewProfesor,
  CreateNewProfesor,
  PerfilProfesor,
  GetUpdateProfesor,
  PostUpdateProfesor,
  DeleteProfesor,
  GetCurso,
  RegisterCourse,
  GetUpdateCurso,
  PostUpdateCurso,
  DeleteCurso
};