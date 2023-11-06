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
        

function mostrarRegistroExitoso() {
    $("#contenedor").css("display", "none");
    $("#exitoso").fadeIn();
}

function ocultarRegistroExitoso() {
    $("#aceptar, #X").click(function () { 
        $("#exitoso").css("display", "none");
        location.reload();
    });
}

//almacenamiento de datos del usuario en un objeto y creacion de objeto Base de datos
function registrarUsuario() {

    $("#confirmar").click(() =>{
        let nombre = document.getElementById("nombre").value;
        let apellido = document.getElementById("apellido").value;
        let correo = document.getElementById("correo").value;
        let pass = document.getElementById("pass").value;
        var user = new Usuario(nombre, apellido, correo, pass);  
        alert(user.nombre + " " + user.apellido);
    });
}

        

function validarFormulario() {
    $("#confirmar").click(function () { 
        if (($("#nombre").val()=="")||($("#apellido").val()=="")||($("#correo").val()=="")||($("#pass").val()=="")||($("#pass2").val()=="")||(!validarContraseña())||((!$("#si").prop("checked"))&&(!$("#no").prop("checked")))) {
            if(($("#nombre").val()=="")||($("#apellido").val()=="")||($("#correo").val()=="")||($("#pass").val()=="")||($("#pass2").val()=="")||((!$("#si").prop("checked"))&&(!$("#no").prop("checked")))){
                $("#aviso").show();
            }
        }else{
            mostrarRegistroExitoso();
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

registrarUsuario();
validarFormulario();
ocultarVentana();
ocultarRegistroExitoso();


class Usuario{
    constructor(nombre, apellido, correo, pass){
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.pass = pass;
        this.jsonObjeto = {
            nombre : this.nombre,
            apellido : this.apellido,
            correo : this.correo,
            pass : this.pass
        };
        this.jsonArchive = JSON.stringify(this.jsonObjeto)
    }
}

class MongoDB{

    constructor(id, pass) {
        this.uri = `mongodb+srv://${id}:${pass}@cluster0.xbb9vpl.mongodb.net/`;
        this.client = new MongoClient(this.uri, { useNewUrlParser: true });
        
    }

    async conectarBaseDeDatos() {
        try {
            await this.client.connect();
            console.log('Conexión a MongoDB exitosa');
        } catch (err) {
            console.error('Error de conexión a MongoDB:', err);
        }
    }

    async insertarDocumento(baseDeDatos, coleccion, documento) {
        try {
            const db = this.client.db(baseDeDatos);
            const collection = db.collection(coleccion);
            const result = await collection.insertOne(documento);
            console.log('Documento insertado:', result.insertedId);
        } catch (err) {
            console.error('Error al insertar el documento:', err);
        }
    }

    async desconectar() {
        await this.client.close();
        console.log('Conexión a MongoDB cerrada');
    }
    
}