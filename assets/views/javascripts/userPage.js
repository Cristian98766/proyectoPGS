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
            $(".menu").css("display", "block");
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
            $(".menu").css("display", "block");
            $(".top-menu .logo, .input-search").css("display", "flex");
        }
    }

    $(window).resize(handleResize);
