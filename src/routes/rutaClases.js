import {Router} from "express";

import controladorApiClases from "../controllers/clases/controladorApiClases.js";

const router = Router();    

router.get("/",controladorApiClases.obtenerClases);

// API Routes
router.get('/api', controladorApiClases.obtenerClases)
router.get('/api/disponibles', controladorApiClases.obtenerClasesDisponibles)
router.get('/api/:id', controladorApiClases.obtenerClasePorId)
router.post('/api/crear', controladorApiClases.crearClase)
router.put('/api/actualizar/:id', controladorApiClases.actualizarClase)
router.delete('/api/eliminar/:id', controladorApiClases.eliminarClase)


export default router;
