const { pool } = require('../config/connection');

const GetEvaluacionUno = async (req, res, next) => {
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
            res.send('works');
        }
    }
    )
}

/*const PostRespuestas = async (req, res, next) => {
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
        console.log('preguntas', preguntas.length);
        if (!err && preguntas.length > 0) {
            res.render('Dashboard/Evaluaciones/Evaluacion2', {
                preguntas: preguntas,
                layout: false
            })
        }
    }
    )

}

const insertNotaDos = async(req, res, next)=>{
    //console.log("entro nota", req.params.Id);
    var p1, p2, p3, p4,p5, p6, p7, p8,p9, p10, nota;
    if (req.body.cuest_false1 === 'on') { p1 = 0.5 }
    else { p1 = 0 }

    if (req.body.cuest_true2 === 'on') { p2 = 0.5 }
    else { p2 = 0 }

    if (req.body.cuest_false3 === 'on') { p3 = 0.5 }
    else { p3 = 0 }

    if (req.body.cuest_true4 === 'on') { p4 = 0.5 }
    else { p4 = 0 }

    if (req.body.cuest_true5 === 'on') { p5 = 0.5 }
    else { p5 = 0 }
    
    if (req.body.cuest_false6 === 'on') { p6 = 0.5 }
    else { p6 = 0 }

    if (req.body.cuest_true7 === 'on') { p7 = 0.5 }
    else { p7 = 0 }

    if (req.body.cuest_true8 === 'on') { p8 = 0.5 }
    else { p8 = 0 }

    if (req.body.cuest_true9 === 'on') { p9 = 0.5 }
    else { p9 = 0 }

    if (req.body.cuest_false10 === 'on') { p10 = 0.5 }
    else { p10 = 0 }

    nota = p1 + p2 + p3 + p4+ p5 + p6 + p7 + p8 + p9 + p10;
    console.log("body", nota);
    await pool.query(
        `
        INSERT INTO Nota (
            Nota1,
            Evaluacion_idEvaluacion,
            Usuario_idUsuario
        )
        VALUES (
            '${nota}',
            1,
            ${req.params.Id}
        )
    `,(err, data)=>{
        console.log("res", data);
        if (!err && data.affectedRows >0) {
            console.log("entro if");
            req.flash('message',"nota",nota)
            res.send('works');
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