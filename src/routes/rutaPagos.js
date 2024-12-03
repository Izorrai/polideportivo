import {Router} from "express";

import controladorPagos from "../controllers/pagos/controladorPagos.js";

const router = Router();        

// API Routes    
router.get('/api', controladorPagos.obtenerPagos)
router.get('/api/mis-pagos', controladorPagos.obtenerPagosPerfil)

export default router;