import {Router} from "express";
import controladorMostrarInstalaciones from "../controllers/instalaciones/controladorMostrarInstalaciones.js";
import controladorApiInstalaciones from "../controllers/instalaciones/controladorApiInstalaciones.js";
import { isAdmin, isAuthenticated } from "../controllers/middlewares/authMiddleware.js";

const router = Router();

router.get("/",controladorMostrarInstalaciones.mostrarInstalaciones);

// API Routes
router.get('/api', controladorApiInstalaciones.obtenerInstalaciones)
router.post('/api/crear-instalaciones', isAdmin, controladorApiInstalaciones.crearInstalaciones)
router.post('/api/crear', controladorApiInstalaciones.crearReserva)
router.post('/api/crear-reserva', isAuthenticated, controladorApiInstalaciones.crearReservaPerfil)
router.get('/api/disponibles', controladorApiInstalaciones.obtenerInstalacionesReservadas)
router.get('/api/mis-reservas', isAuthenticated, controladorApiInstalaciones.obtenerInstalacionesReservadasPerfil)
router.put('/api/actualizar/:id', isAdmin, controladorApiInstalaciones.actualizarInstalaciones);
router.delete('/api/eliminar/:id', isAdmin, controladorApiInstalaciones.eliminarInstalaciones);


export default router;