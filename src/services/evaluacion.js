const { pool } = require('../config/connection');
const { json } = require('express');

const GetTematicas = async (req, res, next) => {
    await pool.query(
        `
        SELECT idTematica, NombreTematica FROM Tematica
        WHERE Estado = 'Activo'
        
    `, (error, tematica) => {
        console.log("tematica:", tematica);
        if (!error && tematica.length > 0) {
            res.render('Admin/Evaluacion/nuevaEvaluacion', {
                layout: 'admin.hbs',
                tematica: tematica,
                title: 'Web Plants'
            });
        } else {
            res.redirect('/admin')
        }
    }
    )
}

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

const insertNotaUno = async (req, res, next) => {
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
    `, (err, data) => {
        console.log("res", data);
        if (!err && data.affectedRows > 0) {
            console.log("entro if");
            req.flash('message', "nota", req.params.Nota)
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

const insertNotaDos = async (req, res, next) => {
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
    `, (err, data) => {
        console.log("res", data);
        if (!err && data.affectedRows > 0) {
            console.log("entro if");
            req.flash('message', "nota", req.params.Nota)
            res.redirect('/perfilEstudiante');
        }
    }
    )
}


const SaveEvaluacion = async (req, res, next) => {
    console.log("entro", req.body);

    await pool.query(
        `
            insert into Evaluacion (NombreEvaluacion, Descripcion, Estado, Tematica_idTematica)
            values(
            '${req.body.titulo}',
            '${req.body.instruciones}',
            'Activo',
            ${req.body.tematica}
            )
        `, async (error, evaluacion) => {
            console.log("Evaluacion: ", evaluacion);
            if (!error && evaluacion.affectedRows > 0) {
                let arreglo = JSON.stringify(req.body);
                var str1 = arreglo.replace('{', '');
                var str2 = str1.replace('}', '');
                var str3 = str2;
                var aux = '';

            for (let j = 0; j < str2.length; j++) {
                aux = str3.replace('"', '');
                str3 = aux;
            }
            var str5 = str3.split('/');
            var str6 = JSON.stringify(str5);

            for (let i = 1; i <= req.body.total; i++) {
                console.log("entro for 1");
                var pre = 'Pregunta' + i;
                var ress = ',Respuesta' + i + 1;

                var var1 = str6.search(pre);
                var var2 = str6.search(ress);

                var var11 = var1 + 10;
                var pregunta = str6.slice(var11, var2);
                console.log("pregunta", pregunta);
                for (let j = 1; j < 5; j++) {
                    console.log("entro for 2");
                    var ress = 'Respuesta' + i + j;
                    var opc = ',Opcion' + i + j;

                    var x1 = str6.search(ress);
                    var x2 = str6.search(opc);

                    var x11 = x1 + 12;
                    var x22 = x2 + 10;
                    var x33 = x22 + 1;

                    var respuesta = str6.slice(x11, x2);
                    var opcion = str6.slice(x22, x33);

                    console.log("Respuesta slice : ", respuesta);
                    console.log("Opcion slice : ", opcion);

                    /*await pool.query(
                        `
                            insert into Pregunta (pregunta, Evaluacion_idEvaluacion, TipoPregunta_idTipoPregunta)
                            values(
                                '${pregunta}',
                                ${evaluacion.insertId},
                                2
                            )
                        `), async (er, pregunta) => {
                            console.log("pre", pregunta);
                            console.log("er", er);
                            if (!er && pregunta.affectedRows >0) {
                                await pool.query(
                                    `
                                    insert into Respuesta (respuesta, Pregunta_idPregunta)
                                    values(
                                        '${respuesta}',
                                        ${pregunta.insertId},
                                        2
                                    )
                                ` 
                                )
                            }

                        }*/
                }

            }
            console.log("salio for");



        }
    }
    )
    res.redirect('/nuevaEvaluacion')
}

module.exports = {
    GetTematicas,
    GetEvaluacionUno,
    insertNotaUno,
    GetEvaluacionDos,
    insertNotaDos,
    SaveEvaluacion
}