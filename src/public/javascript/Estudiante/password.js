console.log("entro pas");
document.getElementById('verPassword').addEventListener('click',function mostrarContrasena(){
    var tipo = document.getElementById("userpassword");
    if(tipo.type == "password"){
        tipo.type = "text";
    }else{
        tipo.type = "password";
    }
} )