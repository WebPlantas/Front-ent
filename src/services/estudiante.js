//Methods get
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
        Persona.EstadoPersona = 'Activo';
    `, (err, data) => {
    console.log(data);
    if (!err && data.length > 0) {
      res.render('Admin/Estudiante/estudiante', {
        data: data,
        layout: false
      });
    } else {
      res.render('Admin/Estudiante/estudiante', {
        data: {},
        layout: false
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
      if (!err) {
        if (data.length > 0) {
          res.render('Admin/Estudiante/nuevoEstudiante', {
             data: data,
             layout: false 
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



const PerfilEstudiante = async (req, res, next) => {
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
      Genero.idGenero = Persona.idPersona
    WHERE 
      Estudiante.Persona_idPersona = '${req.params.Id}';
  `, (err, data) => {
    if (!err && data.length > 0) {
      res.render("Admin/Estudiante/perfilEstudiante", {
        Id: data[0].ID,
        data: data,
        layout: false
      });
    } else {
      res.render("Admin/Estudiante/estudiante", {
        data: {},
        layout: false
      });
    }
  }
  );
};

const GetUpdateEstudiante = async (req, res, next) => {
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
                    Genero.idGenero = Persona.idPersona
                  WHERE
                  idPersona = ${dt[0].ID}
                  LIMIT 1
                `,
          (err, data) => {
            if (!err && data.length > 0) {
              res.render('Admin/Estudiante/actualizarEstudiante', {
                data: data,
                Id: req.params.Id,
                layout: false
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
      'Activo',
      ${req.body.documento},
      ${req.body.genero}
    )`,
    async (err, data) => {
      if (!err && data.affectedRows > 0) {
        await pool.query(
          `INSERT INTO 
            Telefono
          (
            Telefono, 
            Estado,
            Persona_idPersona
          )
          VALUES
          (
            ${req.body.celular},
            'Activo',
            ${data.insertId}
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
                  ${data.insertId}
                )`,
                (err, dta) => {
                  if (!err && dta.affectedRows > 0) {
                    res.redirect("/estudiantes");
                  } else {
                    Pool.query(
                      `DELETE FROM Telefono WHERE ID = ${data2.insertId}`
                    );
                    Pool.query(
                      `DELETE FROM Persona WHERE ID = ${data.insertId}`
                    );
                    res.redirect("/estudiantes");
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
      console.log(dt[0]);
      if (!er && dt.length > 0) {
        console.log(req.body.nombre);
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
              Genero.idGenero = Persona.idPersona
            SET
              NumeroIdentificacion = ${req.body.cedulaE},
              Nombre = '${req.body.nombreE}',
              Apellidos = '${req.body.apellidosE}',
              Direccion = '${req.body.direccionE}',
              Genero.genero = '${req.body.generoE}',
              Telefono.Telefono = '${req.body.telefonoE}',
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

const DeleteEstudiante= async (req, res, nest) => {
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

module.exports = {
  GetEstudiante,
  NewEstudiante,
  CreateNewEstudiante,
  PerfilEstudiante,
  GetUpdateEstudiante,
  PostUpdateEstudiante,
  DeleteEstudiante
};