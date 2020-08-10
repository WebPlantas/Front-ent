function mostrarDetalle() {
    //alert("entro");
    document.getElementById('detallesCuestionario').style.display="block";
    document.getElementById('preguntas').style.display="none";
}

function mostrarQuiz() {
    //alert("entro");
    document.getElementById('preguntas').style.display="block";
    document.getElementById('detallesCuestionario').style.display="none";
    document.getElementById('preguntas').innerHTML =
    '<div class="freebirdFormeditorViewItemContent">'
    + '<select name="tipoevaluacion" onchange="actualizar(this)">'
    + '<option disable selected>Seleccione tipo de pregunta</option>'
    + '<option value="1" id="1" >Opcion multiple</option>'
    + '<option value="2" id="2" >Falso/Verdadero</option>'
    + '</select>'
    + '</div>'
    ;
}

function actualizar(opcion) {
    if (opcion.value == 1) {
        console.log("holaaM");
    }else{
        console.log("holaaV");
    }
    
}



