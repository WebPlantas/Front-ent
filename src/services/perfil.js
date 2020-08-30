const { pool } = require('../config/connection');

const GetNotas = async (req, res, next) => {
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
                notas: notas,
                layout: false
            })
        }
    }
    )

}

module.exports = {
    GetNotas
}