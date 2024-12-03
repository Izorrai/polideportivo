import { Router } from "express";
import deportes from "./rutaDeportes.js";
import instalaciones from "./rutaInstalaciones.js";
import inscripcion from "./rutaInscripcion.js";
import clases from "./rutaClases.js";
import pagos from "./rutaPagos.js";
import usuarios from "./rutaClientes.js";
import controladorCliente from "../controllers/clientes/controladorCliente.js";
import jwt from "../config/jwt.js";
import controladorApiAuth from "../controllers/auth/controladorApiAuth.js";


const router = Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.use((req, res, next) => {
    console.log('Middleware JWT - Headers:', req.headers);
    jwt.verify(req, res, next);
});


router.get('/perfil', jwt.verify, async (req, res) => {
    try {
        console.log("Token decodificado:", req.user);
        const userId = req.user.cliente_id;  
        console.log("Buscando usuario con ID:", userId);
        
        const usuario = await controladorCliente.buscarUserPorId(userId);
        if (!usuario) {
            return res.status(404).json({ 
                error: 'Usuario no encontrado' 
            });
        }
        
        console.log("Usuario encontrado:", usuario.toJSON());
        
        const datosUsuario = {
            cliente_id: usuario.cliente_id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
            telefono: usuario.telefono,
            direccion: usuario.direccion,
            roles: usuario.roles
        };
        
        res.json({ 
            status: "success",
            data: datosUsuario 
        });
        
    } catch (error) {
        console.error('Error en /perfil:', error);
        res.status(500).json({ 
            status: "error",
            message: error.message 
        });
    }
});

router.post("/login", controladorApiAuth.login);
router.post("/registro", controladorApiAuth.registro);


router.use('/clientes', usuarios);
router.use('/deportes', deportes);
router.use('/instalaciones', instalaciones);
router.use('/inscripciones', inscripcion);
router.use('/clases', clases);
router.use('/pagos', pagos);

export default router;