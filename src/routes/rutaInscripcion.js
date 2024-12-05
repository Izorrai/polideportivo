import {Router} from "express";

import controladorInscripciones from "../controllers/inscripciones/controladorInscripciones.js";


const router = Router();  

// API Routes

router.get('/api', controladorInscripciones.obtenerInscripciones)
router.post('/api/crear', controladorInscripciones.crearInscripcion)


router.get('/mis-inscripciones', async (req, res) => {
    console.log('Ruta mis-inscripciones - req.user:', req.user);
    await controladorInscripciones.obtenerMisInscripciones(req, res);
});

// Ruta para crear inscripción
router.post('/crear-inscripcion', async (req, res) => {
    console.log('Ruta crear inscripción - req.user:', req.user);
    await controladorInscripciones.crearInscripcionPerfil(req, res);
});
/* router.get('/api/:id', deportesController.obtenerDeportePorId);
router.post('/api/crear', deportesController.crearDeporte);
router.put('/api/dactualizar/:id', deportesController.actualizarDeporte);
router.delete('/api/deliminar/:id', deportesController.eliminarDeporte);  */

export default router;