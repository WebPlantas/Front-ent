function mostrarDetalle() {
    //alert("entro");
    document.getElementById('detallesCuestionario').style.display = "block";
    document.getElementById('preguntas').style.display = "none";
}

function mostrarQuiz() {
    //alert("entro");
    document.getElementById('preguntas').style.display = "block";
    document.getElementById('detallesCuestionario').style.display = "none";
    document.getElementById('preguntas').innerHTML =
    '<div class="quiz-edit-questions">'
+    '<div class="quiz-content container">'
+        '<div class="qa-test-editQuestion-listTitle title">'
+            '<h2>'
+                '<span>'
+                    'Preguntas'
+                '</span>'
+            '</h2>'
+            '<div class="total-poins">'
+                '<span>'
+                    'Total de preguntas: 0'
+                '</span>'
+                '<span class="points-spacer">'
+                  '  |'
+                '</span>'
+                '<span>'
+                    'Puntos totales: 0'
+                '</span>'
+            '</div>'
+        '</div>'
+   '</div>'
+     '<div class="add-questions">'
+          '<a href="/newquestion" class="p-2_5 rounded-extra-heavy header-2-text on-dark-background eds qa-test-add-task crate-menu-luncher btn btn-primary btn-lg">'
+                '<svg class="new" width="24" height="24" viewBox="0 0 24 24" name="plus-icon">'
+                    '<path fill="#ffff" fill-rule="evenodd" stroke="none" stroke-width="1" id="Icon/small/plus" d="M13 11h4a1 1 0 010 2h-4v4a1 1 0 01-2 0v-4H7a1 1 0 010-2h4V7a1 1 0 012 0v4z">'
+                    '</path>'
+                '</svg>'
+                    '<span class="new-span">'
+                        'Crear'
+                    '</span>'
+            '</a>'
+     '</div>'
+   '</div>'
+'</div>';

}

function actualizar(opcion) {
    if (opcion.value == 1) {
        console.log("holaaM");
    } else {
        console.log("holaaV");
    }

}