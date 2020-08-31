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
        Clase.nombre AS Clase
    FROM 
	    clase
    INNER JOIN 
	    tematica
    ON
	    tematica.Clase_idClase = clase.idClase
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
        idClase AS Clase, 
        nombre AS NombreC 
      FROM 
        Clase 
      WHERE 
        Clase.Estado = 'Activo';
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
    console.log('aquiiiii', req.params.Id);
    await pool.query(
        `SELECT 
        tematica.idTematica AS ID,
        tematica.NombreTematica AS Nombre,
        Clase.nombre AS Clase
    FROM 
        Clase
    INNER JOIN 
        tematica
    ON
        tematica.Clase_idClase = Clase.idClase
    WHERE
      tematica.idTematica = '${req.params.Id}';
    `,
        async (err, data) => {
            if (!err && data.length === 1) {
                await pool.query(
                    `  SELECT  
            idContenido AS codigo, 
            NombreContenido AS NombreC 
          FROM 
            tematica
          INNER JOIN
            contenido
        ON
            contenido.Tematica_idTematica = tematica.idTematica
          WHERE 
            tematica.Estado = 'Activo'
            AND
                tematica.idTematica = ${data[0].ID}
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

const GetContenido = async (req, res, next) => {
    await pool.query(
        `
        SELECT  
          idTematica AS id, 
          NombreTematica AS NombreT 
        FROM 
          tematica 
        WHERE 
        idTematica = 'Activo';
        `, (err, data) => {
            if (!err && data.length > 0) {
                res.render('Admin/Tematica/registrarContenido', {
                    data: data,
                    Id: req.params.Id,
                    layout: 'admin.hbs'
                });
            } else {
                res.render('Admin/Tematica/registrarContenido', {
                    data: {},
                    Id: req.params.Id,
                    layout: 'admin.hbs'
                });
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
            Clase.nombre AS Clase
        FROM 
	        Clase
        INNER JOIN 
	        tematica
        ON
	        tematica.Clase_idClase = Clase.idClase
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

const DetailContenido = async (req, res, next) => {
    console.log('entroooooo2', req.params.Id);
    await pool.query(
        `
        SELECT 
          contenido.idContenido AS ID,
          contenido.NombreContenido AS Nombre,
          contenido.Descripcion AS Descripcion,
          tematica.idTematica AS Id
        FROM
          contenido
        INNER JOIN
          tematica
        ON
          contendio.Tematica_idTematica = tematica.idTematica
        WHERE 
          contenido.Estado = 'Activo'
        AND
          contenido.idContenido = ${req.params.Id}
      `,
        (err, data) => {
            console.log("the data" + data);
            if (!err && data.length > 0) {
                res.render("Admin/Tematica/actualizarContenido", {
                    data: data,
                    Id: req.params.Id,
                    layout: 'admin.hbs'
                });
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
            Clase_idClase
        ) 
        VALUES
        (
          '${req.body.nombreT}',
          'Activo',
          ${req.body.clase}
        )`,
        (err, data) => {
            console.log(req.body.clase);
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

const RegisterContenido = async (req, res, next) => {
    console.log('aquiii', req.body);
    await pool.query(
        `SELECT 
        idTematica AS ID 
      FROM 
        tematica 
      WHERE 
        idTematica = '${req.body.id}'`,
        async (er, dt) => {
            console.log('aquiiiiiii')
            if (!er && dt.length > 0) {
                await pool.query(
                    `
              INSERT INTO
                contenido
              (
                NombreContenido,
                Descripcion,
                Estado,
                Tematica_idTematica
              )
              VALUES
              (
                '${req.body.NombreC}',
                '${req.body.DescripcionC}',
                'Activo',
                ${dt[0].ID}
              )
              `,
                    (err, data) => {
                        if (!err && data.affectedRows > 0) {
                            console.log("Creado");
                            res.redirect(`/perfiltematica/${req.body.id}`);
                        } else {
                            res.redirect(`/registrarContenido/${req.body.id}`);
                        }
                    }
                );
            } else {
                res.redirect(`/registrarContenido/${req.body.id}`);
            }
        }
    );
};

const DeleteContenido = async (req, res, nest) => {
    console.log("DELETE", req.body);
    await pool.query(
        `
    SELECT
      contenido.idContenido AS ID
    FROM
      contenido
  WHERE 
      contenido.idContenido = '${req.body.Id}'
      `,
        async (err, data) => {
            if (!err && data.length > 0) {
                console.log("data delete", data);
                await pool.query(
                    `
              UPDATE 
                contenido
              SET
                Estado = 'Inactivo'
              WHERE
                idContenido = ${data[0].ID}
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
    GetContenido,
    GetUpdateTematica,
    DetailContenido,
    RegisterTematica,
    PostUpdateTematica,
    DeleteTematica,
    RegisterContenido,
    DeleteContenido
};