import express from 'express'; // framework para crear el servidor
import dotenv from 'dotenv'; // cargar variables de entorno
import session from 'express-session';// para crear sesiones
import router from './routes/router.js';// importar rutas

dotenv.config();// cargar variables de entorno

const app = express();// crear servidor 

app.set('view engine', 'pug');// configurar motor de plantillas
app.set('src/views',  'views');// configurar directorio de plantillas

app.use(express.static('src/public')); // configurar directorio de archivos estáticos
app.use(express.urlencoded({ extended: true }));// configurar body parser para recibir datos de formularios
app.use(express.json());// configurar body parser para recibir datos en formato json

app.use(session({
    secret: process.env.SECRET,// clave para cifrar la cookie
    resave: false,// no guardar la cookie en cada petición
    saveUninitialized: false,// no guardar la cookie si no se inicializa
    cookie: { 
        secure: false,// true para https
        maxAge: 1000 * 60 * 60 * 24 * 7// tiempo de vida de la cookie en milisegundos
        }
}));// configurar sesión 

app.use('/', router);// configurar rutas

app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${process.env.PORT}`);
});// iniciar servidor en el puerto indicado en las variables de entorno