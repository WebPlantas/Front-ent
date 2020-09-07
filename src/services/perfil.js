const { pool } = require('../config/connection');
const helpers = require('../util/lib/helpers');

const GetNotas = async (req, res, next) => {
    console.log("Get notas", req.user);
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
        Usuario.idUsuario = ${req.user.idUsuario} Limit 1;
        `, async (error, persona) => {
        console.log("error notas", persona[0]);
        if (!error && persona.length > 0) {
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
                    res.render('Dashboard/Perfil/perfilEstudiante', {
                        persona: persona[0],
                        notas: notas,
                        layout: false
                    })
                } else {
                    res.render('Dashboard/Perfil/perfilEstudiante', {
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
                            res.redirect(`/perfilEstudiante`);
                        } else {
                            res.send(`error`, err);
                        }
                    }
                );
            } else {
                res.redirect(`/perfilEstudiante`);
            }
        }
    );
};

const UpdateUser = async (req, res, next) => {
    var password = req.body.password;
    if (password == req.body.password1) {
        var validPassword = await helpers.encrytPassword(password);
        await pool.query(
            `
            SELECT * FROM Usuario 
            WHERE username = '${req.body.username}'      
            `, async (error, users) => {
                console.log("users", users);
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
                            res.redirect(`/perfilEstudiante`);
                        } else {
                            res.send(`error`, err);
                        }
                    }
                );
            }else{
                res.send("error, el nombre de usuario ya existe")
            }    
            }
        )
    }else{
        res.send("error las contraseñas no coinciden")
    }
    
    
};

module.exports = {
    GetNotas,
    UpdateEstudiante,
    UpdateUser
}