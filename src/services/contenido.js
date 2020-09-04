const {
    pool
} = require('../config/connection');
const helpers = require('../util/lib/helpers');

const GetTematicaProfesor = async (req, res, next) => {
    console.log('Get');
    await pool.query(
        `
        SELECT    
        tematica.idTematica AS ID,
        tematica.NombreTematica AS Nombre,
        Clase.nombre AS Clase
    FROM 
        tematica
    INNER JOIN 
        Clase 
    ON
        tematica.Clase_idClase = clase.idClase	
    INNER JOIN
        GradoCurso
    ON
        GradoCurso.idGradoCurso = Clase.GradoCurso_idGradoCurso
    WHERE 
        Clase.Estado = 'Activo'
    AND
        clase.Profesor_idProfesor = ${req.user.Persona_idPersona};
    `,
        async (err, data) => {
            if (!err && data.length > 0) {
                await pool.query(
                    `
            SELECT  
              idClase AS Clase, 
              nombre AS NombreClase 
            FROM 
              Clase 
            WHERE 
              Clase.Estado = 'Activo';
            `, (er, result) => {
                        if (!er && data.length > 0) {
                            res.render('Dashboard/Profesor/ContenidoP/newContenido', {
                                data: data,
                                Id: req.user.Persona_idPersona,
                                result: result,
                                layout: 'profesor.hbs'
                            });
                        } else {
                            res.render('Dashboard/Profesor/ContenidoP/newContenido', {
                                data: data,
                                Id: req.user.Persona_idPersona,
                                result: {},
                                layout: 'profesor.hbs'
                            });
                        }
                    }
                );
            } else {
                console.log("wtf");
                res.redirect('/perfilprofesor');
            }
        }
    );
};

const RegisterTematicaProfesor = async (req, res, next) => {
    console.log(req.body);
    await pool.query(
        `INSERT INTO 
            Tematica
        (
            NombreTematica,
            Estado,
            Clase_idClase
        ) 
        VALUES
        (
          '${req.body.contenidoname}',
          'Activo',
          ${req.body.clase}
        )`,
        (err, data) => {
            console.log(req.body.clase);
            if (!err && data.affectedRows > 0) {
                console.log("Creado");
                res.redirect("/contenidoprofesor");
            } else {
                console.log("wtf");
                res.redirect('/perfilprofesor');
            }
        }
    );
};

module.exports = {
    GetTematicaProfesor,
    RegisterTematicaProfesor
};