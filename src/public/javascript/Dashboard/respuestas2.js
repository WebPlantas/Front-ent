
//EXAMEN DOS
/*
var Final2= "";
document.getElementById('terminar').addEventListener('click',function(){
    console.log("ENTRO DOS");
    var p1, p2, p3, p4,p5, p6, p7, p8,p9, p10, nota;

    if (document.getElementById('1B').checked == true) { p1 = 0.5 }
    else { p1 = 0 }

    if (document.getElementById('2A').checked == true) { p2 = 0.5 }
    else { p2 = 0 }

    if (document.getElementById('3A').checked == true) { p3 = 0.5 }
    else { p3 = 0 }

    if (document.getElementById('4D').checked == true) { p4 = 0.5 }
    else { p4 = 0 }

    if (document.getElementById('5A').checked == true) { p5 = 0.5 }
    else { p5 = 0 }
    
    if (document.getElementById('6A').checked == true) { p6 = 0.5 }
    else { p6 = 0 }

    if (document.getElementById('7B').checked == true) { p7 = 0.5 }
    else { p7 = 0 }

    if (document.getElementById('8A').checked == true) { p8 = 0.5 }
    else { p8 = 0 }

    if (document.getElementById('9D').checked == true) { p9 = 0.5 }
    else { p9 = 0 }

    if (document.getElementById('10A').checked == true) { p10 = 0.5 }
    else { p10 = 0 }

    nota2 = p1 + p2 + p3 + p4+ p5 + p6 + p7 + p8 + p9 + p10;
    Final2 = ""+nota2;
    var f = document.getElementById('form2');
    f.action = f.action + Final2;
    alert(" Aciertos: " + nota2);
})
console.log("Salio 2");*/
var totalPreguntas = document.getElementById('totalP').value;
console.log("TOTAL: ", totalPreguntas);
var preguntasRes = [];
var correctas = 0;
var opciones = ['A', 'B', 'C', 'D'];
//console.log("opciones: ", opciones.length);

//console.log("ENTRO DOS");
for (let i = 0; i < totalPreguntas; i++) {
    for (let j = 0; j < opciones.length; j++) {
        var p = document.getElementById("opcion" + i + opciones[j]);
        if (p.value == 1) {
            preguntasRes[i] = document.getElementById("opcion" + i + opciones[j])
        }
    }
}
console.log("Preguntasres: ", preguntasRes);

document.getElementById('terminar').addEventListener('click', async function () {
    
    for (let i = 0; i < totalPreguntas; i++) {
        //console.log("pregunta 1", preguntasRes[1]);
        if (preguntasRes[i].checked == true) {
            correctas += 1;
            console.log("Correctas:", correctas);
        }
    }
    var c = document.getElementById('correctas');
    c.value = correctas;
});

