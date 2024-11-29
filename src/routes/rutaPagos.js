import {Router} from "express";

import controladorPagos from "../controllers/pagos/controladorPagos.js";

const router = Router();        

// API Routes    
router.get('/api', controladorPagos.obtenerPagos)

export default router;