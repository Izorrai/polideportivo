import {Router} from "express";
import controladorMostrarDeportes from "../controllers/deportes/controladorMostrarDeportes.js";
import deportesController from "../controllers/deportes/controladorApiDeportes.js";
import { isAdmin } from "../controllers/middlewares/authMiddleware.js";


const router = Router();

router.get("/",controladorMostrarDeportes.mostrarDeportes);

// API Routes
router.get('/api', deportesController.obtenerDeportes);
router.get('/api/:id', deportesController.obtenerDeportePorId);
router.post('/api/crear', isAdmin, deportesController.crearDeporte);
router.put('/api/actualizar/:id', isAdmin, deportesController.actualizarDeporte);
router.delete('/api/eliminar/:id', isAdmin, deportesController.eliminarDeporte);

export default router;