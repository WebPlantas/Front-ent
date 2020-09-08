console.log("entro script");
function mostrarDetalle() {
    //alert("entro");
    document.getElementById('detallesCuestionario').style.display = "block";
    document.getElementById('preguntas').style.display = "none";
};

function mostrarQuiz() {
    console.log("entro quiz");
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
var p = "Pregunta";
var aux = 2;

var r = "Respuesta";
var aux1 = 1;

var o = "Opcion";
var aux2 = 1;
function duplicate(comp) {
    console.log("entro duplicate");
    var original = document.getElementById('newQuestion' + comp.id);
    var clone = original.cloneNode(true); // "deep" clone
    clone.id = "newQuestion" + ++i;
    clone.getElementsByTagName('p')[0].innerHTML = i + ".";
    clone.getElementsByTagName('input')[5].id = i;
    clone.getElementsByTagName('input')[6].id = i;
    //preguntas
    clone.getElementsByTagName('input')[0].id = p+aux;
    clone.getElementsByTagName('input')[0].name = p+aux;
    //respuestas
    clone.getElementsByTagName('input')[1].id = r+aux+aux1;
    clone.getElementsByTagName('input')[1].name = r+aux+aux1;
    aux1++;
    clone.getElementsByTagName('input')[2].id = r+aux+aux1;
    clone.getElementsByTagName('input')[2].name = r+aux+aux1;
    aux1++;
    clone.getElementsByTagName('input')[3].id = r+aux+aux1;
    clone.getElementsByTagName('input')[3].name = r+aux+aux1;
    aux1++;
    clone.getElementsByTagName('input')[4].id = r+aux+aux1;
    clone.getElementsByTagName('input')[4].name = r+aux+aux1;
    //opciones
    clone.getElementsByTagName('select')[1].id = o+aux+aux2;
    clone.getElementsByTagName('select')[1].name = o+aux+aux2;
    aux2++;
    clone.getElementsByTagName('select')[2].id = o+aux+aux2;
    clone.getElementsByTagName('select')[2].name = o+aux+aux2;
    aux2++;
    clone.getElementsByTagName('select')[3].id = o+aux+aux2;
    clone.getElementsByTagName('select')[3].name = o+aux+aux2;
    aux2++;
    clone.getElementsByTagName('select')[4].id = o+aux+aux2;
    clone.getElementsByTagName('select')[4].name = o+aux+aux2;
    aux2++;
    
    console.log("inputs", clone.getElementsByTagName('select')[1]);
    insertAfter(original, clone);
    original = clone;
    //console.log(clone.getElementsByTagName('button'));
    //document.getElementById('nuevo').appendChild(clone);
    var total = document.getElementById("total");
    var totalh = document.getElementById("TotalH"); 
    console.log("total value", totalh);
    aux++;
    aux1=1;
    aux2=1;
    total.value = i;
}

function deleteQuestion(comp) {
    //console.log("delete ", comp.id);
    var id = comp.id;
    var div = document.getElementById('newQuestion' + id);
    //console.log(div);
    if (div !== null) {
        var parent = div.parentElement;
        parent.removeChild(div);
    } else {
        alert("No existe la pregunta")
    }
    var total = document.getElementById("total");
    console.log("total0", total.value);
    i--;
    aux--;
    aux1=1;
    aux2=1;
    total.value = i;
    console.log("total", total.value);
    return (id);
}

function insertAfter(e, i) {
    if (e.nextSibling) {
        e.parentNode.insertBefore(i, e.nextSibling);
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
                $("#response-question-true-false").hide();
                $("#response-question-multiple-option").show();
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

$("input[id='title-question']").on("input", function () {
    var name = $(this).val();
    $("font[class='titulo']").text(name);
});


/*PRUEBA


function test() {
    var res1, res2, res3, res4;

    if (document.getElementById('p11').checked == true) { p1 = 1 }
    else { p1 = 0 }

    if (document.getElementById('p22').checked == true) { p2 = 1 }
    else { p2 = 0 }

    if (document.getElementById('p33').checked == true) { p3 = 1 }
    else { p3 = 0 }

    if (document.getElementById('p44').checked == true) { p4 = 1 }
    else { p4 = 0 }

    nota = p1 + p2 + p3 + p4;
    alert(" Aciertos: " + nota);
    location.reload();
}
*/

function resultado() {
    var p1, p2, p3, p4, nota;

    if (document.getElementById('p11').checked == true) { p1 = 1 }
    else { p1 = 0 }

    if (document.getElementById('p22').checked == true) { p2 = 1 }
    else { p2 = 0 }

    if (document.getElementById('p33').checked == true) { p3 = 1 }
    else { p3 = 0 }

    if (document.getElementById('p44').checked == true) { p4 = 1 }
    else { p4 = 0 }

    nota = p1 + p2 + p3 + p4;
    alert(" Aciertos: " + nota);
    location.reload();
}

/*=========PASAR A JSON
var initElement = document.getElementById('preguntas');
var json = mapDOM(initElement, true);
console.log(json);



function mapDOM(element, json) {
    var treeObject = {};

    // If string convert to document Node
    if (typeof element === "string") {
        if (window.DOMParser) {
              parser = new DOMParser();
              docNode = parser.parseFromString(element,"text/xml");
        } else { // Microsoft strikes again
              docNode = new ActiveXObject("Microsoft.XMLDOM");
              docNode.async = false;
              docNode.loadXML(element); 
        } 
        element = docNode.firstChild;
    }

    //Recursively loop through DOM elements and assign properties to object
    function treeHTML(element, object) {
        object["type"] = element.nodeName;
        var nodeList = element.childNodes;
        if (nodeList != null) {
            if (nodeList.length) {
                object["content"] = [];
                for (var i = 0; i < nodeList.length; i++) {
                    if (nodeList[i].nodeType == 3) {
                        object["content"].push(nodeList[i].nodeValue);
                    } else {
                        object["content"].push({});
                        treeHTML(nodeList[i], object["content"][object["content"].length -1]);
                    }
                }
            }
        }
        if (element.attributes != null) {
            if (element.attributes.length) {
                object["attributes"] = {};
                for (var i = 0; i < element.attributes.length; i++) {
                    object["attributes"][element.attributes[i].nodeName] = element.attributes[i].nodeValue;
                }
            }
        }
    }
    treeHTML(element, treeObject);

    return (json) ? JSON.stringify(treeObject) : treeObject;
    
}
*/