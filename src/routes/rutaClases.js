import {Router} from "express";

import controladorClases from "../controllers/clases/controladorClases.js";

const router = Router();    

router.get("/",controladorClases.obtenerClases);

// API Routes
router.get('/api', controladorClases.obtenerClases)
router.get('/api/disponibles', controladorClases.obtenerClasesDisponibles)

export default router;
