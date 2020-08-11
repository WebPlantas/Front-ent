function mostrarDetalle() {
    //alert("entro");
    document.getElementById('detallesCuestionario').style.display = "block";
    document.getElementById('preguntas').style.display = "none";
}

function mostrarQuiz() {
    //alert("entro");
    document.getElementById('preguntas').style.display = "block";
    document.getElementById('detallesCuestionario').style.display = "none";
}

function actualizar(opcion) {
    if (opcion.value == 1) {
        console.log("holaaM");
    } else {
        console.log("holaaV");
    }

}

$(function () {

    $("#inputSelect").on('change', function () {

        var selectValue = $(this).val();
        switch (selectValue) {

            case "1":
                $("#response-question-true-false").show();
                $("#response-question-multiple-option").hide();
                $("#responde-question-matching").hide();
                break;

            case "2":
                $("#response-question-true-false").hide();
                $("#response-question-multiple-option").show();
                $("#responde-question-matching").hide();
                break;

            case "3":
                $("#response-question-true-false").hide();
                $("#response-question-multiple-option").hide();
                $("#responde-question-matching").show();
                break;

        }

    }).change();

});

jQuery(document).ready(function () {
    $(".oculto").hide();
    $(".info").click(function () {
        var nodo = $(this).attr("href");

        if ($(nodo).is(":visible")) {
            $(nodo).hide();
            return false;
        } else {
            $(".oculto").hide("slow");
            $(nodo).fadeToggle("fast");
            return false;
        }
    });
});

$("input[id='title-question']").on("input", function(){
    var name = $(this).val();
    $("font[class='titulo']").text(name);
  });