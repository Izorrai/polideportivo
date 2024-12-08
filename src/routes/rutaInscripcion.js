import {Router} from "express";

import controladorApiInscripciones from "../controllers/inscripciones/controladorApiInscripciones.js";
import { isAdmin, isAuthenticated } from "../controllers/middlewares/authMiddleware.js";

const router = Router();  

// API Routes

router.get('/api', isAdmin, controladorApiInscripciones.obtenerMisInscripciones)
router.post('/api/crear', isAdmin, controladorApiInscripciones.crearInscripcion)
router.get('/mis-inscripciones', async (req, res) => {
    
    await controladorApiInscripciones.obtenerMisInscripciones(req, res);
});

// Ruta para crear inscripción
router.post('/crear-inscripcion', async (req, res) => {
    
    await controladorApiInscripciones.crearInscripcionPerfil(req, res);
});






export default router;