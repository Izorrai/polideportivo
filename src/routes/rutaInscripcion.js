import {Router} from "express";

import controladorInscripciones from "../controllers/inscripciones/controladorInscripciones.js";

const router = Router();  

// API Routes

router.get('/api', controladorInscripciones.obtenerInscripciones)
router.post('/api/crear', controladorInscripciones.crearInscripcion)
/* router.get('/api/:id', deportesController.obtenerDeportePorId);
router.post('/api/crear', deportesController.crearDeporte);
router.put('/api/dactualizar/:id', deportesController.actualizarDeporte);
router.delete('/api/deliminar/:id', deportesController.eliminarDeporte);  */

export default router;