const { pool } = require('../config/connection');

const GetNotas = async (req, res, next) => {
    console.log("Get notas", req.user);
    await pool.query(
        `
        SELECT  Persona.idPersona AS Id,
        Persona.NumeroIdentificacion AS Identificacion,
		Nombre,
        Apellidos,
        Direccion,
        CONCAT(Persona.FechaNacimiento, '') AS FechaNacimiento,
        Genero.genero AS Genero,
        Telefono.Telefono,
        email
		FROM Email INNER JOIN Usuario
		ON
        Usuario.Email_idEmail = Email.idEmail
        INNER JOIN Persona
        ON
        Usuario.idUsuario = Persona.idPersona
        INNER JOIN Telefono
        ON
        Telefono.Persona_idPersona = Persona.idPersona
        INNER JOIN Estudiante
        ON
        Estudiante.Persona_idPersona = Persona.idPersona
		INNER JOIN Genero
		ON
        Persona.Genero_idGenero = Genero.idGenero
		WHERE 
        Usuario.idUsuario = ${req.user.idUsuario};
    `, async(error, persona)=>{
        if (!error && persona.length>0) {
            console.log("Persona", persona);
             //console.log("Perfil", req.user);
        await pool.query(
        `
        select NombreEvaluacion AS Evaluacion, nota1 AS Nota, Evaluacion_idEvaluacion from Nota
        inner join Evaluacion on Evaluacion.idEvaluacion = Nota.Evaluacion_idEvaluacion
        where Usuario_idUsuario = ${req.user.idUsuario} ;
        
    `, async (err, notas) => {
        console.log('notas', notas);
        if (!err && notas.length > 0) {
            res.render('Dashboard/Perfil/perfiles', {
                persona: persona,
                notas: notas,
                layout: false
            })
        }else{
            res.render('Dashboard/Perfil/perfiles', {
                persona: persona[0],
                notas: notas,
                layout: false
            })
        }
    }
    )
        }
    }
    )
}

const UpdateEstudiante = async (req, res, next) => {
    console.log("ENTRO POS", req.body);
    await pool.query(
      `
        SELECT 
        Persona_idPersona AS ID
        FROM 
          Estudiante
        WHERE
        Persona_idPersona = '${req.user.idUsuario}'
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
              SET
                NumeroIdentificacion = ${req.body.document},
                Nombre = '${req.body.firstname}',
                Apellidos = '${req.body.lastname}',
                Direccion = '${req.body.direccion}',
                FechaNacimiento = '${req.body.fnacimiento}',
                Persona.Genero_idGenero = '${req.body.genero}'
              WHERE 
              idPersona = ${dt[0].ID}
            `,
            async (err, data) => {
              console.log("data pos estu", err);
              if (!err && data.affectedRows > 0) {
                res.redirect(`/perfil`);
              } else {
                res.send(`error`, err);
              }
            }
          );
        } else {
          res.redirect(`/perfil`);
        }
      }
    );
  };

module.exports = {
    GetNotas,
    UpdateEstudiante
}