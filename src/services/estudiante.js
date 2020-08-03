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
      idGradoCurso AS Grado, 
      NombreGrado AS NombreG 
    FROM 
      GradoCurso 
    WHERE 
    GradoCurso.Estado = 'Activo';
    `, (err, data) => {
    console.log('curso', data);
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

const PerfilEstudiante = async (req, res, next) => {
  //console.log("Perfil ", req.params.Id);
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
  `, async(err, data) => {
    if (!err && data.length === 1) {
      await pool.query(
        `SELECT    
            Grupo.idGrupo AS ID,
            Grupo.NombreGrupo AS Nombre,
            Grupo.Curso_idCurso AS Curso
        FROM 
            Grupo 
         INNER JOIN
            GradoCurso
          ON
            GradoCurso.idGradoCurso = Grupo.Curso_idCurso
          
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
  console.log('entro get ', req.params.Id);
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

//Methods Post

const CreateNewEstudiante = async (req, res, next) => {
  console.log("entro create", req.body);
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
        console.log('entro if tel', req.body.celular, data.insertId);
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
            console.log("aa", err);
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
        console.log(err);
        res.redirect("/estudiantes");
      }
    }
  );
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
        console.log(req.body.nombreE);
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
      console.log('primero');
      if (!er && dt.length > 0) {
        console.log('1', req.body);
        await pool.query(
          `
            INSERT INTO
              Grupo
            (
              NombreGrupo,
              Curso_idCurso
            )
            VALUES
            (
              '${req.body.nombreG}',
              ${req.body.idCurso}
            )
            `,
          async (err, data, next) => {
            console.log('segundo');
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
              Estado,
              CodigoGrupo
              )
              VALUES
              (
                ${req.body.id},
                ${dt[0].ID},
                ${data.insertId},
                '${req.body.fechaI}',
                '${req.body.fechaF}',
                1,
                'abc'
              ) ` ,
                async (err, data2) => {
                  console.log('tercero', data2);
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



module.exports = {
  GetEstudiante,
  NewEstudiante,
  GetGrupo,
  CreateNewEstudiante,
  PerfilEstudiante,
  GetUpdateEstudiante,
  PostUpdateEstudiante,
  DeleteEstudiante,
  RegisterGrupo
};