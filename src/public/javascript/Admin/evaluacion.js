function mostrarDetalle() {
    //alert("entro");
    document.getElementById('detallesCuestionario').style.display="block";
    document.getElementById('preguntas').style.display="none";
}

function mostrarQuiz() {
    //alert("entro");
    document.getElementById('preguntas').style.display="block";
    document.getElementById('detallesCuestionario').style.display="none";
    document.getElementById('preguntas').innerHTML = '<div id= "preguntas" class="quiz-details quiz-content qa-test-quizEdit-quizDetails container">' 
    + '<div class="item-dlg-dragHandle"><div class="freebirdMaterialIconIconEl"><div class="freebirdMaterialIconIconImage freebirdMaterialIconIconDarkIcon freebird-qp-icon-drag-handle-horz-b" aria-hidden="true">&nbsp;</div><div class="freebirdMaterialIconIconImage freebirdMaterialIconIconLightIcon freebird-qp-icon-drag-handle-horz-w" aria-hidden="true">&nbsp;</div></div>Preguntas</div>'
    + '<div class="freebirdMaterialIconIconEl"><div class="freebirdMaterialIconIconImage freebirdMaterialIconIconDarkIcon freebird-qp-icon-drag-handle-horz-b" aria-hidden="true">&nbsp;</div><div class="freebirdMaterialIconIconImage freebirdMaterialIconIconLightIcon freebird-qp-icon-drag-handle-horz-w" aria-hidden="true">&nbsp;</div></div>'
    ;
}

