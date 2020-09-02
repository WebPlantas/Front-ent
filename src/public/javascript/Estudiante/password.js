console.log("entro pas");
var tipo = "";
document.getElementById('verPassword').addEventListener('click',function mostrarContrasena(){
    tipo = document.getElementById("userpassword");
    if(tipo.type == "password"){
        tipo.type = "text";
    }else{
        tipo.type = "password";
    }
} );
var tipo1 = "";
document.getElementById('verPassword1').addEventListener('click',function mostrarContrasena1(){
    tipo1 = document.getElementById("userpassword1");
    if(tipo.type == "password"){
        tipo.type = "text";
    }else{
        tipo.type = "password";
    }
} );