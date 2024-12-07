import {Router} from "express";

import controladorApiPagos from "../controllers/pagos/controladorApiPagos.js";
import { isAdmin, isAuthenticated } from "../controllers/middlewares/authMiddleware.js";

const router = Router();        

// API Routes    
router.get('/api', isAdmin, controladorApiPagos.obtenerPagos)
router.get('/api/mis-pagos', isAuthenticated,  controladorApiPagos.obtenerPagosPerfil)
router.get('/api/:id', isAdmin, controladorApiPagos.obtenerPagosPorId)
router.post('/api/actualizar/:id', isAdmin, controladorApiPagos.actualizarPagos)

export default router;