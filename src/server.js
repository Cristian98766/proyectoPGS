import express from 'express';
import morgan from 'morgan';
import { conectarBD, usuarioModelo} from './db.js';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import crypto from 'crypto';

conectarBD();
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));

const puerto = 3000

app.get('/datos/:id', (req, res) => {
  const id = new mongoose.Types.ObjectId(req.params);
  usuarioModelo.findOne({_id:id})
    .then((usuarioEncontrado) => {
      if (!usuarioEncontrado) {
        res.json("Usuario no encontrado:"+usuarioEncontrado);
      }else{
        res.json(usuarioEncontrado);
      }
    })
    .catch((err) => {
      res.status(500).send("Error al iniciar sesión");
    });
});

app.post('/register', (req, res) => {
  const correo = req.body.correo;
  usuarioModelo.findOne({"correo":correo})
    .then((usuarioEncontrado) => {
      if (usuarioEncontrado) {
        res.send(`El correo ${correo} ya está registrado en el sistema`);
      }else{
        const pass = req.body.pass;
        const hash = crypto.createHash('sha256').update(pass).digest('hex');
        const usuario = {
          "nombre": req.body.nombre,
          "apellido": req.body.apellido,
          "correo": req.body.correo,
          "password":hash
        }

        usuarioModelo.create(usuario).then(() => {
          res.send('Usuario registrado correctamente');
          console.log(`Usuario registrado: ${req.body}`);
      }).catch((error) => {
          console.log('Error al guardar usuario');
          res.status(500).send(`Error al crear el usuario: ${error}`);
      });
      }
    })
    .catch((err) => {
      res.send("Error al hacer el registro: ", err);
    });
});


app.post('/user_page', (req, res) => {
  const { correo, password } = req.body;
  usuarioModelo.findOne({ correo })
    .then((usuarioEncontrado) => {
      if (!usuarioEncontrado) {
        res.send("Usuario no registrado");
      }else{

        const pass = password;
        const hash = crypto.createHash('sha256').update(pass).digest('hex');

        if (usuarioEncontrado.password === hash) {
          res.redirect('/assets/views/userPage.html?id='+usuarioEncontrado.id);
        } else {
          res.send("Contraseña incorrecta");
        }
      }
    })
    .catch((err) => {
      res.send("Error al iniciar sesión: ", err);
    });
});


app.delete('/assets/views/perfil.html', (req, res) => {
    const id = new mongoose.Types.ObjectId(req.query.id);
    usuarioModelo.findOneAndDelete({_id: id}).then((deletedUser) => {
    if (deletedUser) {
      console.log("Usuario eliminado:", deletedUser);
      res.redirect('/assets/views/login.html');
    } else {
      console.log("No se encontró el usuario para eliminar");
      res.send("No se encontró el usuario para eliminar");
    }
  }).catch((error) => {
    console.error("Error al eliminar usuario");
    res.send("Error al eliminar usuario");
  });
});

app.post('/actualizar', (req, res) => {
    const correo = req.body.correo;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    usuarioModelo.findOneAndUpdate({ "correo": correo }, { "nombre": nombre, "apellido":apellido }, { new: true })
    .then(user => {
    console.log('Usuario actualizado:', user);
    res.send("Usuario actualizado correctamente");
    })
    .catch(err => {
      console.error(err);
      res.send("Error al actualizar usuario");
    });
});

app.use(express.static('c:/Users/Sebastian/Desktop/Proyecto_PGS/cliente/public/'));

app.listen(puerto, () => {
    console.log(`Este es el puerto ${puerto}`)
});