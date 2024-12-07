import { Router } from "express";

import controladorApiGastos from "../controllers/gastos/controladorApiGastos.js";
import { isAdmin, isAuthenticated } from "../controllers/middlewares/authMiddleware.js";

const router = Router();        

// API Routes    
router.get('/api', controladorApiGastos.obtenerGastos)
router.get('/api/:id', controladorApiGastos.obtenerGastoPorId)
router.post('/api/crear', isAdmin, controladorApiGastos.crearGasto)
router.put('/api/actualizar/:id', isAdmin, controladorApiGastos.actualizarGasto)
router.delete('/api/eliminar/:id', isAdmin, controladorApiGastos.eliminarGasto)
router.get('/api/gastos/:instalacion_id', isAdmin, controladorApiGastos.obtenerGastosPorInstalacion)
router.get('/api/estadisticas', isAdmin, controladorApiGastos.obtenerEstadisticasGastos)

export default router;