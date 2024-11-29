import {Router} from "express";
import controladorMostrarDeportes from "../controllers/deportes/controladorMostrarDeportes.js";
import deportesController from "../controllers/deportes/controladorApiDeportes.js";

const router = Router();

router.get("/",controladorMostrarDeportes.mostrarDeportes);

// API Routes
router.get('/api', deportesController.obtenerDeportes);
router.get('/api/:id', deportesController.obtenerDeportePorId);
router.post('/api/crear', deportesController.crearDeporte);
router.put('/api/dactualizar/:id', deportesController.actualizarDeporte);
router.delete('/api/deliminar/:id', deportesController.eliminarDeporte);

export default router;