//Methods get
const { pool } = require('../config/connection');

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
        layout: false
      });
    } else {
      res.render('Admin/Profesor/Profesor', {
        data: {},
        layout: false
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
            layout: false
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

const PerfilProfesor = async (req, res, next) => {
  console.log(req.params.Id);
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
      Genero.idGenero = Persona.idPersona
    WHERE 
      Profesor.Persona_idPersona = '${req.params.Id}';
  `, (err, data) => {
    console.log("la data", data);
    if (!err && data.length > 0) {
      console.log("entro if");
      res.render("Admin/Profesor/perfilProfesor", {
        Id: data[0].ID,
        data: data,
        layout: false
      });
    } else {
      res.render("Admin/Profesor/Profesor", {
        data: {},
        layout: false
      });
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
                    Genero.genero AS Genero
                  FROM
                    Persona
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
              res.render('Admin/Profesor/actualizarProfesor', {
                data: data,
                Id: req.params.Id,
                layout: false
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
            Telefono
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
                    res.redirect("/Profesors");
                  } else {
                    Pool.query(
                      `DELETE FROM Telefono WHERE ID = ${data2.insertId}`
                    );
                    Pool.query(
                      `DELETE FROM Persona WHERE ID = ${data.insertId}`
                    );
                    res.redirect("/Profesors");
                  }
                }
              );
            } else {
              pool.query(
                `DELETE FROM Persona WHERE ID = ${data.insertId}`
              );
              res.redirect("/Profesors");
            }
          }
        );
      } else {
        console.log(err);
        res.redirect("/Profesors");
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
      console.log(dt[0]);
      if (!er && dt.length > 0) {
        console.log(req.body.nombre);
        await pool.query(
          `
            UPDATE
              Persona
            INNER JOIN
              Genero
            ON
              Genero.idGenero = Persona.idPersona
            SET
              NumeroIdentificacion = ${req.body.cedula},
              Nombre = '${req.body.nombre}',
              Apellidos = '${req.body.apellidos}',
              Direccion = '${req.body.direccion}',
              Genero.genero = '${req.body.genero}'
            WHERE 
            idPersona = ${dt[0].ID}
          `,
          (err, data) => {
            if (!err && data.affectedRows > 0) {
              res.redirect(`/perfilProfesor/${req.body.Id}`);
            } else {
              res.redirect(`/perfilcliente/${req.body.Id}`);
            }
          }
        );
      } else {
        res.redirect(`/perfilcliente/${req.body.uuid}`);
      }
    }
  );
};

const DeleteProfesor = async (req, res, nest) => {
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
              res.redirect("/Profesors");
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

module.exports = {
  GetProfesor,
  NewProfesor,
  CreateNewProfesor,
  PerfilProfesor,
  GetUpdateProfesor,
  PostUpdateProfesor,
  DeleteProfesor
};

