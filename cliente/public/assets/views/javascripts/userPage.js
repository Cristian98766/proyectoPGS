const toggle = document.querySelector(".toggle")
const menuDashboard = document.querySelector(".menu-dashboard")
const iconoMenu = toggle.querySelector("i")
const enlacesMenu = document.querySelectorAll(".enlace")

toggle.addEventListener("click", () => {
    mostrarMenu();
})

enlacesMenu.forEach(enlace => {
    enlace.addEventListener("click", () => {
        menuDashboard.classList.add("open")
        iconoMenu.classList.replace("bx-menu", "bx-x")
    })
})

function mostrarMenu() {
    menuDashboard.classList.toggle("open");

    if(iconoMenu.classList.contains("bx-menu")){
        if ($(window).width() <= 700) {
            $(".menu-dashboard").css("height", "100%");
            $(".menu-dashboard").css("max-width", "300px");
            $(".menu-dashboard").css("max-height", "100%");
            $(".principal").css("max-height", "1700px");
            $(".menu").css("display", "grid");
            $(".top-menu .logo, .input-search").css("display", "flex");
        }
        iconoMenu.classList.replace("bx-menu", "bx-x")
    }else {
        if ($(window).width() <= 700) {
            $(".menu-dashboard").css("max-width", "60px");
            $(".menu-dashboard").css("max-height", "70px");
            $(".menu").css("display", "none");
            $(".top-menu .logo, .input-search").css("display", "none");
        }
        iconoMenu.classList.replace("bx-x", "bx-menu")
    }
}

    function handleResize() {
        if ($(window).width() > 700) {
            $(".menu-dashboard").css("height", "");
            $(".menu-dashboard").css("max-width", "");
            $(".menu-dashboard").css("max-height", "");
            $(".principal").css("max-height", "");
            $(".menu").css("display", "");
            $(".top-menu .logo, .input-search").css("display", "");
        }else if (!iconoMenu.classList.contains("bx-menu")) {
            $(".menu-dashboard").css("height", "100%");
            $(".menu-dashboard").css("max-width", "300px");
            $(".menu-dashboard").css("max-height", "100%");
            $(".principal").css("max-height", "1700px");
            $(".menu").css("display", "grid");
            $(".top-menu .logo, .input-search").css("display", "flex");
        }
    }

    $(window).resize(handleResize);

var URLactual = window.location;
const url = String(URLactual);
const partes = url.split('=');
const id = partes[partes.length - 1];

fetch('/datos/'+id) 
    .then(response => response.json()) 
    .then(data => {
        $("#username").text(data.nombre+" "+data.apellido);
        $('#nom').attr('value', data.nombre);
        $('#apell').attr('value', data.apellido);
        $('#corr').attr('value', data.correo);
    })
    .catch(error => {
        console.error('Error:', error);
    });


$("#actualizar").click(() => {
    $("#actualizar").css("display", "none");
    $("#eliminar").css("display", "none");
    $("#enviar").css("display", "inline");
    $('.campos').prop('readonly', false);
    $("#cancelar").css("display", "inline");
})

$("#cancelar").click(() => {
    // $("#actualizar").css("display", "inline");
    // $("#eliminar").css("display", "inline");
    // $("#enviar").css("display", "none");
    // $('.campos').prop('readonly', true);
    // $("#cancelar").css("display", "none");
    window.location.reload();
})