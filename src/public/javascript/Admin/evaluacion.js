function mostrarDetalle() {
    //alert("entro");
    document.getElementById('detallesCuestionario').style.display = "block";
    document.getElementById('preguntas').style.display = "none";
};

function mostrarQuiz() {
    //alert("entro");
    document.getElementById('preguntas').style.display = "block";
    document.getElementById('detallesCuestionario').style.display = "none";
};

function actualizar(opcion) {
    if (opcion.value == 1) {
        console.log("holaaM");
    } else {
        console.log("holaaV");
    }

};

var i = 1;
//console.log(original);

function duplicate(comp) {
    console.log("entro duplicate");
    var original = document.getElementById('newQuestion'+comp.id);
    var clone = original.cloneNode(true); // "deep" clone
    console.log("clone",clone);
    clone.id = "newQuestion" + ++i;
    clone.getElementsByTagName('p')[0].innerHTML = i+".";
    clone.getElementsByTagName('button')[0].id =i;
    clone.getElementsByTagName('button')[1].id =i;
    insertAfter(original,clone);
    original = clone;
    console.log(clone.getElementsByTagName('button'));
    //document.getElementById('nuevo').appendChild(clone);
    
}

function deleteQuestion(comp) {
    console.log("delete ", comp.id);
    var id = comp.id;
    var div = document.getElementById('newQuestion'+id);
    //console.log(div);
    if (div !== null) {
        var parent = div.parentElement;
        parent.removeChild(div);
    }else{
        alert("No existe la pregunta")
    }
    console.log(id);
    i--;
    return(id);
}

function insertAfter(e,i){ 
    if(e.nextSibling){ 
        e.parentNode.insertBefore(i,e.nextSibling); 
    } else { 
        e.parentNode.appendChild(i); 
    }
}

$(function () {

    $("#inputSelect").on('change', function () {
        console.log("entro asd");
        var selectValue = $(this).val();
        switch (selectValue) {

            case "1":
                console.log("case 1");
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