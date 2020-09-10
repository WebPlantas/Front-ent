const {pool} = require('../config/connection');
const helpers = require('../util/lib/helpers');

var perfilActual;
const GetPerfil = async (req, res, next) => {
  perfilActual = req.params.Id;
  console.log('Get');
  await pool.query(
    `
      SELECT
      Persona.idPersona AS Id,
      Persona.NumeroIdentificacion AS Identificacion,
      Persona.Nombre,
      Persona.Apellidos,
      TipoDocumento.tipo AS Tipo,
      TipoDocumento.idTipoDocumento,
      CONCAT( Nombre, ' ', Apellidos) AS Nombres,
      Direccion,
      Telefono.Telefono,
      CONCAT(Persona.FechaNacimiento, '') AS FechaNacimiento,
      Usuario.Username AS User,  
      rol.rol AS Rol,
      rol.idRol,
      Genero.idGenero,
      Genero.genero AS Genero,
      email.email AS Email,
      telefono.Telefono AS Telefono,
      Persona.EstadoPersona AS Estado 

    FROM Persona INNER JOIN TipoDocumento
      ON
      TipoDocumento.idTipoDocumento = Persona.TipoDocumento_idTipoDocumento
      INNER JOIN 
      usuario
      ON
      usuario.Persona_idPersona = Persona.idPersona
      INNER JOIN
      Genero
      ON
      Persona.Genero_idGenero = Genero.idGenero
      INNER JOIN 
      email
      ON
      usuario.Email_idEmail = email.idEmail
      INNER JOIN 
      rol
      ON
      usuario.Rol_idRol = rol.idRol
      INNER JOIN 
      telefono
      ON
      telefono.Persona_idPersona = persona.idPersona
      WHERE 
      Usuario.idUsuario = ${req.user.idUsuario};
      `, (err, data) => {
      console.log("PPERSONA ID: ", data[0].Id);
      if (!err && data.length > 0) {
        console.log("entro if");
        res.render('Dashboard/Profesor/Perfil/perfil', {
          data: data[0],
          Id: data.Id,
          layout: 'profesor.hbs'
        });
      } else {
        res.render('Dashboard/Profesor/Perfil/perfil', {
          data: {},
          layout: 'profesor.hbs'
        });
      }
    }
  );
};

const UpdateProfesorAdmin = async (req, res, next) => {
  console.log("ENTRO POS", req.body);
  await pool.query(
    `
        SELECT 
        Persona_idPersona AS ID
        FROM 
          Profesor
        WHERE
        Persona_idPersona = '${req.user.Persona_idPersona}'
      `,
    async (er, dt) => {
      console.log("und", dt[0]);
      if (!er && dt.length > 0) {
        console.log(req.body.genero);
        await pool.query(
          `
              UPDATE
                Persona
              INNER JOIN 
                Genero
              ON
                Genero.idGenero = Persona.Genero_idGenero
              INNER JOIN 
                Telefono
              ON
                Telefono.Persona_idPersona = Persona.idPersona
              SET
              NumeroIdentificacion = ${req.body.document},
              Nombre = '${req.body.firstname}',
              Apellidos = '${req.body.lastname}',
              Direccion = '${req.body.direccion}',
              FechaNacimiento = '${req.body.fnacimiento}',
              Persona.Genero_idGenero = '${req.body.genero}',
              Telefono.Telefono = '${req.body.phone}'
              WHERE 
              idPersona = ${dt[0].ID}
            `,
          async (err, data) => {
            console.log("data pos estu", err);
            if (!err && data.affectedRows > 0) {
              res.redirect(`/perfilprofesor`);
            } else {
              res.send(`error`, err);
            }
          }
        );
      } else {
        res.redirect(`/perfilprofesor`);
      }
    }
  );
};

const UpdateUserProfesorAdmin = async (req, res, next) => {
  console.log("REQ BODY USER: ", req.body);
  var password = req.body.password;
  if (password == req.body.password1) {
    var validPassword = await helpers.encrytPassword(password);
    await pool.query(
      `
          SELECT * FROM Usuario 
          WHERE Username = '${req.body.username}'      
          `, async (error, users) => {
        console.log("users", users, error);
        if (!error && users.length <= 0) {
          await pool.query(
            `
                        UPDATE
                          Usuario
                        INNER JOIN
                          Email
                        ON
                          Email.idEmail = Usuario.Email_idEmail
                        SET
                          Username = '${req.body.username}',
                          Password = '${validPassword}'
                        WHERE 
                        idUsuario = ${req.user.idUsuario}
                      `,
            async (err, data) => {
              console.log("data pos ", err);
              if (!err && data.affectedRows > 0) {
                res.redirect(`/perfilprofesor`);
              } else {
                res.send(`error`, err);
              }
            }
          );
        } else {
          res.send("error, el nombre de usuario ya existe");
          res.redirect('/perfilprofesor')
        }
      }
    )
  } else {
    res.send("error las contraseñas no coinciden");
    res.redirect('/perfilprofesor')
  }
};

module.exports = {
  GetPerfil,
  UpdateProfesorAdmin,
  UpdateUserProfesorAdmin
};