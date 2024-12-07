import {Router} from "express";

import controladorApiInscripciones from "../controllers/inscripciones/controladorApiInscripciones.js";


const router = Router();  

// API Routes

router.get('/api', controladorApiInscripciones.obtenerMisInscripciones)
router.post('/api/crear', controladorApiInscripciones.crearInscripcion)


router.get('/mis-inscripciones', async (req, res) => {
    console.log('Ruta mis-inscripciones - req.user:', req.user);
    await controladorApiInscripciones.obtenerMisInscripciones(req, res);
});

// Ruta para crear inscripción
router.post('/crear-inscripcion', async (req, res) => {
    console.log('Ruta crear inscripción - req.user:', req.user);
    await controladorApiInscripciones.crearInscripcionPerfil(req, res);
});
/* router.get('/api/:id', deportesController.obtenerDeportePorId);
router.post('/api/crear', deportesController.crearDeporte);
router.put('/api/dactualizar/:id', deportesController.actualizarDeporte);
router.delete('/api/deliminar/:id', deportesController.eliminarDeporte);  */

export default router;