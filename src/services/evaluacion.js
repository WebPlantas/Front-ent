const { pool } = require('../config/connection');

const GetEvaluacionUno = async (req, res, next) => {
    await pool.query(
        `
        SELECT * FROM Pregunta
        WHERE TipoPregunta_idTipoPregunta = 1
    `, async (err, data) => {
        console.log('preguntas', data.length);
        if (!err && data.length > 0) {
            res.render('Dashboard/Evaluaciones/false-true', {
                data: data,
                layout: false
            })
        }
    }
    )

}

const insertNotaUno = async(req, res, next)=>{
    console.log("entro nota", req.params);
    await pool.query(
        `
        INSERT INTO Nota (
            Nota1,
            Evaluacion_idEvaluacion,
            Usuario_idUsuario
        )
        VALUES (
            '${req.params.Nota}',
            1,
            ${req.params.Id}
        )
    `,(err, data)=>{
        console.log("res", data);
        if (!err && data.affectedRows >0) {
            console.log("entro if");
            req.flash('message',"nota",req.params.Nota)
            res.redirect('/perfilEstudiante');
        }
    }
    )
}

/*const PostRespuestas = async (req, res, next) => multiple-choice {
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

}*/

const GetEvaluacionDos = async (req, res, next) => {
    await pool.query(
        `
        SELECT row_number() over(ORDER BY idPregunta) AS ID,pregunta, Evaluacion_idEvaluacion, TipoPregunta_idTipoPregunta
        FROM Pregunta
        WHERE TipoPregunta_idTipoPregunta = 2
    `, async (err, preguntas) => {
        //console.log('preguntas', preguntas);
        if (!err && preguntas.length > 0) {
            res.render('Dashboard/Evaluaciones/multiple-choice', {
                preguntas: preguntas,
                layout: false
            })
        }
    }
    )

}

const insertNotaDos = async(req, res, next)=>{
    console.log("ENTROO INSERT DOS");
    await pool.query(
        `
        INSERT INTO Nota (
            Nota1,
            Evaluacion_idEvaluacion,
            Usuario_idUsuario
        )
        VALUES (
            '${req.params.Nota}',
            2,
            ${req.params.Id}
        )
    `,(err, data)=>{
        console.log("res", data);
        if (!err && data.affectedRows >0) {
            console.log("entro if");
            req.flash('message',"nota",req.params.Nota)
            res.redirect('/perfilEstudiante');
        }
    }
    )
}

module.exports = {
    GetEvaluacionUno,
    insertNotaUno,
    GetEvaluacionDos,
    insertNotaDos
}