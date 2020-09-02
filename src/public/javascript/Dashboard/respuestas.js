
console.log("respuestas");
var Final= "";
document.getElementById('finalizar').addEventListener('click',function(){
    console.log("hola res");
    var p1, p2, p3, p4,p5, p6, p7, p8,p9, p10, nota;

    if (document.getElementById('f1').checked == true) { p1 = 0.5 }
    else { p1 = 0 }

    if (document.getElementById('v2').checked == true) { p2 = 0.5 }
    else { p2 = 0 }

    if (document.getElementById('f3').checked == true) { p3 = 0.5 }
    else { p3 = 0 }

    if (document.getElementById('v4').checked == true) { p4 = 0.5 }
    else { p4 = 0 }

    if (document.getElementById('v5').checked == true) { p5 = 0.5 }
    else { p5 = 0 }
    
    if (document.getElementById('f6').checked == true) { p6 = 0.5 }
    else { p6 = 0 }

    if (document.getElementById('v7').checked == true) { p7 = 0.5 }
    else { p7 = 0 }

    if (document.getElementById('v8').checked == true) { p8 = 0.5 }
    else { p8 = 0 }

    if (document.getElementById('v9').checked == true) { p9 = 0.5 }
    else { p9 = 0 }

    if (document.getElementById('f10').checked == true) { p10 = 0.5 }
    else { p10 = 0 }

    nota = p1 + p2 + p3 + p4+ p5 + p6 + p7 + p8 + p9 + p10;
    Final = ""+nota;
    var f = document.getElementById('form');
    console.log("Formuliario", f);
    f.action = f.action + Final;
    alert(" Aciertos: " + nota);
})

