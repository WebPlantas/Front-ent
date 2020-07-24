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
      Genero.idGenero = Persona.Genero_idGenero
    WHERE 
      Profesor.Persona_idPersona = '${req.params.Id}';
  `, (err, data) => {
    if (!err && data.length > 0) {
      console.log("entro if");
      res.render("Admin/Profesor/perfilProfesor", {
        Id: data[0].ID,
        data: data,
        layout: 'admin.hbs'
      });
    } else {
      res.render("Admin/Profesor/profesores", {
        data: {},
        layout: 'admin.hbs'
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
                    Direccion AS Direccion,
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
                    res.redirect("/profesores");
                  } else {
                    Pool.query(
                      `DELETE FROM Telefono WHERE ID = ${data2.insertId}`
                    );
                    Pool.query(
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

module.exports = {
  GetProfesor,
  NewProfesor,
  CreateNewProfesor,
  PerfilProfesor,
  GetUpdateProfesor,
  PostUpdateProfesor,
  DeleteProfesor
};

