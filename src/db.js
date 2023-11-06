import mongoose from "mongoose";

const conectarBD = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/unibank");
        console.log("Se ha conectado la base de datos")
    } catch (error) {
        console.log(error);
    }
};

const usuarioEsquema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    apellido:{
        type: String,
        required: true
    },
    correo:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    }
});

const usuarioModelo = mongoose.model('usuario', usuarioEsquema);

export {conectarBD, usuarioModelo};