const { pool } = require('../config/connection');

const GetEvaluacion = async (req, res, next) => {
    await pool.query(
        `
        SELECT * FROM Pregunta
        WHERE TipoPregunta_idTipoPregunta = 1
    `, async (err, data) => {
        console.log('preguntas', data.length);
        if (!err && data.length > 0) {
            res.render('Dashboard/Evaluaciones/Evaluacion1', {
                data: data,
                layout: false
            })
        }
    }
    )

}

const PostRespuestas = async (req, res, next) => {
    const obj = JSON.parse(JSON.stringify(req.body));
    console.log("body",obj);
    //console.log("body", req.body.toString);
    await pool.query(
        `
        SELECT respuesta FROM Respuesta
        WHERE Pregunta_idPregunta = 1
    `, async (err, data) => {
        console.log("respuestas", data);
        if (!err && data.length > 0) {


        }
    }
    )

}

module.exports = {
    GetEvaluacion,
    PostRespuestas
}