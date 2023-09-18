function mostrarVentana() {
    $("#registrarse").click(function () {
       
        $("#contenedor").fadeIn();;
    })
}

function ocultarVentana() {
    $("#x").click(function () {
        $("#contenedor").css("display", "none");;;
    })
}

function validarContraseña() {
    if (($("#pass2").val()!=$("#pass").val()) && ($("#pass2").val()!="")) {
        $("#mensaje").show();
        return false
    }
    else{
        $("#mensaje").hide();
        return true
    }
};
        

function validarFormulario() {
    $("#confirmar").click(function () { 
        if (($("#nombre").val()=="")||($("#apellido").val()=="")||($("#correo").val()=="")||($("#pass").val()=="")||($("#pass2").val()=="")||(!validarContraseña())||((!$("#si").prop("checked"))&&(!$("#no").prop("checked")))) {
            if(($("#nombre").val()=="")||($("#apellido").val()=="")||($("#correo").val()=="")||($("#pass").val()=="")||($("#pass2").val()=="")||((!$("#si").prop("checked"))&&(!$("#no").prop("checked")))){
                $("#aviso").show();
            }
            return false;
        }else{
            return true;
        };
    });
}

$("#x").click(function () {
    $("#aviso").hide();
})


mostrarVentana();
$("#pass2").on('input', function () {
    validarContraseña();
});
$("#pass").on('input', function () {
    validarContraseña();
});

validarFormulario();
ocultarVentana();


