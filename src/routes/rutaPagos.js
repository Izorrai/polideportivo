import {Router} from "express";

import controladorPagos from "../controllers/pagos/controladorPagos.js";
import { isAdmin, isAuthenticated } from "../controllers/middlewares/authMiddleware.js";

const router = Router();        

// API Routes    
router.get('/api', isAdmin, controladorPagos.obtenerPagos)
router.get('/api/:id', isAdmin, controladorPagos.obtenerPagosPorId)
router.post('/api/actualizar/:id', isAdmin, controladorPagos.actualizarPagos)
router.get('/api/mis-pagos', isAuthenticated,  controladorPagos.obtenerPagosPerfil)

export default router;