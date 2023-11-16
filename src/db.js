import mongoose from "mongoose";

const conectarBD = async () => {
    try {
        await mongoose.connect("mongodb+srv://megamanchi:RXNIU8fAmXziiXPO@unibank.ev1hfbd.mongodb.net/UniBank");
        console.log("Se ha conectado la base de datos")
    } catch (error) {
        console.log(error);
    }
};

const usuarioEsquema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    apellido:{
        type: String,
        required: true,
        trim: true
    },
    correo:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    }
});

const usuarioModelo = mongoose.model('usuario', usuarioEsquema);

export {conectarBD, usuarioModelo};