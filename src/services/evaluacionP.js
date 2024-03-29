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
            res.render('Dashboard/Profesor/Evaluacion/newEvaluation', {
                layout: 'profesor.hbs',
                tematica: tematica,
                title: 'Web Plants'
            });
        } else {
            res.redirect('/evaluacionprofesor')
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
            ${req.params.Nota},
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

const GetEvaluacionDos = async (req, res, next) => {
    await pool.query(`
    select * from evaluacion order by idEvaluacion DESC limit 1;
    `, async (error, evaluacion)=>{
        console.log("ULTIMA EVALUACION: ", evaluacion);
        if (!error && evaluacion.length>0) {
            await pool.query(`SELECT row_number() over(ORDER BY idPregunta) AS Num, idPregunta, pregunta, Evaluacion_idEvaluacion,
            idEvaluacion,
            NombreEvaluacion
             FROM Pregunta
             INNER JOIN Evaluacion ON Pregunta.Evaluacion_idEvaluacion = Evaluacion.idEvaluacion
             WHERE Pregunta.TipoPregunta_idTipoPregunta = 2 and
             Evaluacion.idEvaluacion = ${evaluacion[0].idEvaluacion};`
        , async (er, preguntas) => {
            //console.log("evaluacion", preguntas[0].NombreE, er);
            if (!er && preguntas.length > 0) {
                //console.log("error despues de get");
                //console.log("hola");
                await pool.query(`
                SELECT Pregunta_idPregunta, respuesta, valida, Evaluacion_idEvaluacion,
                idEvaluacion,
                NombreEvaluacion
                FROM Respuesta
	            INNER JOIN Pregunta ON Pregunta_idPregunta = idPregunta
                INNER JOIN Evaluacion ON Pregunta.Evaluacion_idEvaluacion = Evaluacion.idEvaluacion
	            WHERE TipoPregunta_idTipoPregunta = 2 and
                Evaluacion.idEvaluacion = ${evaluacion[0].idEvaluacion};
                 `, (error, respuestas) => {
                        //console.log("SEGUNDO PASO", respuestas, error);
                        if (!error && respuestas.length > 0) {
                            res.render('Dashboard/Evaluaciones/multiple-choice', {
                                preguntas,
                                respuestas,
                                nombreE : preguntas[0].NombreE,
                                layout: false
                            })
                        }else{
                            res.send('/evaluacion')
                        }
                    }
                )
            }else{
                res.redirect('/evaluacion');
            }
        }
    )
        }else{
            console.log("No hay evaluaciones");
        }
    }
    )
}

const insertNotaDos = async (req, res, next) => {
    console.log("ENTROO INSERT DOS", req.body);
    var valorP = 5/req.body.totalPreguntas;
    console.log("valor pregunta: ", valorP);
    var nota = 0;
    nota = req.body.correctas*valorP;
    console.log("nota final: ", nota);
    
    //console.log("NOTA: ", nota);
    
    await pool.query(
        `
        INSERT INTO Nota (
            Nota1,
            Evaluacion_idEvaluacion,
            Usuario_idUsuario
        )
        VALUES (
            '${nota}',
            ${req.body.evaluacion[0]},
            ${req.params.Id}
        )
    `, async(err, data) => {
        console.log("res", data);
        if (!err && data.affectedRows > 0) {
            console.log("entro if");
            req.flash('message', "nota", req.params.Nota)
            await res.redirect('/perfilEstudiante');
        }
    }
    )
}

const GetEvaluaciones = async (req, res, next) => {
    await pool.query(
        `
        SELECT row_number() over(ORDER BY idTematica) AS ID,idTematica,idEvaluacion, NombreEvaluacion, Descripcion, NombreTematica FROM Evaluacion
        INNER JOIN Tematica ON Tematica_idTematica = idTematica
        WHERE Evaluacion.Estado = 'Activo'
    `, (error, evaluaciones) => {
        console.log("evaluaciones:", evaluaciones, error);
        if (!error && evaluaciones.length > 0) {
            res.render('Dashboard/Profesor/Evaluacion/Evaluacion', {
                layout: 'profesor.hbs',
                evaluaciones: evaluaciones,
                title: 'Web Plants'
            });
        } else {
            res.render('Dashboard/Profesor/Evaluacion/Evaluacion', {
                layout: 'profesor.hbs',
                evaluaciones: evaluaciones,
                title: 'Web Plants'
            });
        }
    }
    )
}


const SaveEvaluacion = async (req, res, next) => {
    console.log("entro", req.body);
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
    //var eliminados = await pool.query(`DELETE FROM pregunta WHERE TipoPregunta_idTipoPregunta = 2`);
    //console.log("ELIMINADOS: ", eliminados);
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
            for (let i = 1; i <= req.body.total; i++) {
                console.log("entro for 1");
                var pre = 'Pregunta' + i;
                var ress = ',Respuesta' + i + 1;

                var var1 = str6.search(pre);
                var var2 = str6.search(ress);

                var var11 = var1 + 10;
                var pregunta = str6.slice(var11, var2);
                var preguntaQ = await pool.query(`insert into Pregunta (pregunta, Evaluacion_idEvaluacion, TipoPregunta_idTipoPregunta)
                        values('${pregunta}',${evaluacion.insertId},2)`);
                for (let j = 1; j < 5; j++) {
                    console.log("PREGUNTA 2", preguntaQ);
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

                    console.log(respuesta + " / " + opcion + "/" + preguntaQ.insertId);
                    console.log('---------------------')
                    await pool.query(`insert into Respuesta (respuesta, valida, Pregunta_idPregunta)
                                        values('${respuesta}','${opcion}',${preguntaQ.insertId})`);
                }

            }
            console.log("salio for");
            res.redirect('evaluacion')
        }
    }
    )
    res.redirect('/evaluacionprofesor')
}

const GetVistaPrevia = async (req, res) =>{
    console.log("ENTRO VISTA PREVIA: ", req.params);
    await pool.query(`
    SELECT row_number() over(ORDER BY idPregunta) AS Num, idPregunta, pregunta, Evaluacion_idEvaluacion,
    idEvaluacion,
    NombreEvaluacion
     FROM Pregunta
     INNER JOIN Evaluacion ON Pregunta.Evaluacion_idEvaluacion = Evaluacion.idEvaluacion
     WHERE Pregunta.TipoPregunta_idTipoPregunta = 2 and
     Evaluacion.idEvaluacion = ${req.params.Id};
    `, async (error, preguntas)=>{
        console.log("PREGUNTAS VISTA PREVIA: ", preguntas);
        if (!error && preguntas.length>0) {
            await pool.query(`
            SELECT Pregunta_idPregunta, respuesta, valida, Evaluacion_idEvaluacion,
            idEvaluacion,
            NombreEvaluacion
            FROM Respuesta
	        INNER JOIN Pregunta ON Pregunta_idPregunta = idPregunta
            INNER JOIN Evaluacion ON Pregunta.Evaluacion_idEvaluacion = Evaluacion.idEvaluacion
	        WHERE TipoPregunta_idTipoPregunta = 2 and
            Evaluacion.idEvaluacion = ${req.params.Id};
            `, (error, respuestas) =>{
                console.log("RESPUESTAS VISTA PREVIA: ", respuestas);
                if (!error && respuestas.length>0) {
                    res.render('Admin/Evaluacion/vistaPrevia', {
                        preguntas,
                        respuestas,
                        nombreE : preguntas[0].NombreEvaluacion,
                        layout: false
                      });
                }else{
                    console.log("No hay respuestas para esas preguntas");
                }
            }
            )
        }else{
            console.log("No hay preguntas de esa evaluacion");
        }
    }
    
    )
    
}

const DeleteEvaluacion = async (req, res, next) => {
    console.log(req.params);
    console.log("entro delete Evaluacion");
    await pool.query(
      `
              DELETE FROM 
                Evaluacion
              WHERE
                idEvaluacion = ${req.params.Id}
            `,
      (er, dat) => {
          console.log("dat: ", dat);
        if (!er && dat.affectedRows > 0) {
          res.redirect(`/evaluacionprofesor`);
        } else {
          res.redirect(`/evaluacionprofesor`);
        }
      }
    );
  
  };

module.exports = {
    GetEvaluaciones,
    GetTematicas,
    GetEvaluacionUno,
    insertNotaUno,
    GetEvaluacionDos,
    insertNotaDos,
    SaveEvaluacion,
    GetVistaPrevia,
    DeleteEvaluacion
}