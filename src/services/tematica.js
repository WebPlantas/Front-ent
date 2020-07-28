const {
    pool
} = require('../config/connection');

const GetTematica = async (req, res, next) => {
    console.log('Get');
    await pool.query(
        `
    SELECT 
	    tematica.idTematica AS Id,
        tematica.NombreTematica AS Nombre,
        gradocurso.NombreGrado AS Curso
    FROM 
	    curso
    INNER JOIN 
	    tematica
    ON
	    tematica.Curso_idCurso = curso.idCurso
    INNER JOIN  
        gradocurso
    ON 
        gradocurso.idGradoCurso = curso.idCurso
    WHERE
        tematica.Estado = 'Activo'
    ORDER BY idTematica;
    `, (err, data) => {
            console.log(data);
            if (!err && data.length > 0) {
                res.render('Admin/Tematica/tematica', {
                    data: data,
                    layout: 'admin.hbs'
                });
            } else {
                res.render('Admin/Tematica/tematica', {
                    data: {},
                    layout: 'admin.hbs'
                });
            }
        }
    );
};

const NewTematica = async (req, res, next) => {
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
                res.render('Admin/Tematica/nuevatematica', {
                    data: data,
                    Id: req.params.Id,
                    layout: 'admin.hbs'
                });
            } else {
                res.render('Admin/Tematica/nuevatematica', {
                    data: {},
                    Id: req.params.Id,
                    layout: 'admin.hbs'
                });
            }
        }
    );
};

const PerfilTematica = async (req, res, next) => {
    console.log(req.params.Id);
    await pool.query(
        `SELECT 
        tematica.idTematica AS Codigo,
        tematica.NombreTematica AS Nombre,
        gradocurso.NombreGrado AS Curso
    FROM 
        curso
    INNER JOIN 
        tematica
    ON
        tematica.Curso_idCurso = curso.idCurso
    INNER JOIN  
        gradocurso
    ON 
        gradocurso.idGradoCurso = curso.idCurso
    WHERE
      tematica.idTematica = '${req.params.Id}';
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
                            res.render("Admin/Tematica/perfiltematica", {
                                data: data,
                                Id: req.params.Id,
                                result: result,
                                layout: 'admin.hbs'
                            });
                        } else {
                            res.render("Admin/Tematica/perfiltematica", {
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
                res.redirect("/tematicas");
            }
        }
    );
};

const GetUpdateTematica = async (req, res, next) => {
    await pool.query(
        `
              SELECT
              tematica.idTematica AS ID
              FROM
                tematica
              WHERE 
              tematica.idTematica = '${req.params.Id}'
            `,
        async (er, dt) => {
            if (!er && dt.length > 0) {
                console.log(dt[0].ID);
                await pool.query(
                    `
        SELECT 
            tematica.NombreTematica AS Nombre,
            gradocurso.NombreGrado AS Curso
        FROM 
	        curso
        INNER JOIN 
	        tematica
        ON
	        tematica.Curso_idCurso = curso.idCurso
        INNER JOIN  
            gradocurso
        ON 
            gradocurso.idGradoCurso = curso.idCurso
        WHERE
            idTematica = ${dt[0].ID}
                    LIMIT 1
                  `,
                    (err, data) => {
                        if (!err && data.length > 0) {
                            res.render('Admin/Tematica/actualizartematica', {
                                data: data,
                                Id: req.params.Id,
                                layout: 'admin.hbs'
                            });
                        } else {
                            res.redirect(`/perfiltematica/${req.params.Id}`);
                        }
                    }
                );
            } else {
                res.redirect(`/perfiltematica/${req.params.Id}`);
            }
        }
    );
};

const RegisterTematica = async (req, res, next) => {
    console.log(req.body);
    await pool.query(
        `INSERT INTO 
            Tematica
        (
            NombreTematica,
            Estado,
            Curso_idCurso
        ) 
        VALUES
        (
          '${req.body.nombreT}',
          'Activo',
          ${req.body.curso}
        )`,
        (err, data) => {
            console.log(req.body.curso);
            if (!err && data.affectedRows > 0) {
                console.log("Creado");
                res.redirect("/tematicas");
            } else {
                res.redirect("/nuevatematica");
            }
        }
    );
};

const PostUpdateTematica = async (req, res, next) => {
    console.log("ENTRO POS", req.body);
    await pool.query(
        `
        SELECT
            tematica.idTematica AS ID
        FROM
            tematica
        WHERE 
            tematica.idTematica = '${req.body.Id}'
      `,
        async (er, dt) => {
            if (!er && dt.length > 0) {
                await pool.query(
                    `
              UPDATE
                tematica
              SET
                NombreTematica = '${req.body.nombreT}'
              WHERE 
              idTematica = ${dt[0].ID}
            `,
                    (err, data) => {
                        if (!err && data.affectedRows > 0) {
                            res.redirect(`/perfiltematica/${req.body.Id}`);
                        } else {
                            res.redirect(`/perfiltematica/${req.body.Id}`);
                        }
                    }
                );
            } else {
                res.redirect(`/perfiltematica/${req.body.Id}`);
            }
        }
    );
};

const DeleteTematica = async (req, res, nest) => {
    console.log("DELETE", req.body);
    await pool.query(
        `
    SELECT
      tematica.idTematica AS ID
    FROM
      tematica
  WHERE 
      tematica.idTematica = '${req.body.Id}'
      `,
        async (err, data) => {
            if (!err && data.length > 0) {
                console.log("data delete", data);
                await pool.query(
                    `
              UPDATE 
                tematica
              SET
                Estado = 'Inactivo'
              WHERE
                idTematica = ${data[0].ID}
            `,
                    (er, dat) => {
                        if (!err && dat.affectedRows > 0) {
                            res.redirect("/tematicas");
                        } else {
                            res.redirect(`/perfiltematica/${req.body.Id}`);
                        }
                    }
                );
            } else {
                res.redirect(`/perfiltematica/${req.body.Id}`);
            }
        }
    );
};

module.exports = {
    GetTematica,
    NewTematica,
    PerfilTematica,
    GetUpdateTematica,
    RegisterTematica,
    PostUpdateTematica,
    DeleteTematica
};