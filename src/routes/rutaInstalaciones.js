import {Router} from "express";

import controladorApiInstalaciones from "../controllers/instalaciones/controladorApiInstalaciones.js";
import { isAdmin, isAuthenticated } from "../controllers/middlewares/authMiddleware.js";

const router = Router();



// API Routes
router.get('/api', controladorApiInstalaciones.obtenerInstalaciones)
router.post('/api/crear-instalaciones', isAdmin, controladorApiInstalaciones.crearInstalaciones)
router.post('/api/crear', isAdmin, controladorApiInstalaciones.crearReserva)
// ADMIN
router.delete('/api/eliminar/:id', isAdmin, controladorApiInstalaciones.eliminarInstalaciones);
router.get('/api/actualizar/:id', isAdmin, controladorApiInstalaciones.actualizarInstalaciones)
router.post('/api/crear-reserva', isAuthenticated, controladorApiInstalaciones.crearReservaPerfil)
router.get('/api/disponibles', controladorApiInstalaciones.obtenerInstalacionesReservadas)
// CLIENTE
router.get('/api/mis-reservas', isAuthenticated, controladorApiInstalaciones.obtenerInstalacionesReservadasPerfil)
router.put('/api/actualizar/:id', isAdmin, controladorApiInstalaciones.actualizarInstalaciones);



export default router;