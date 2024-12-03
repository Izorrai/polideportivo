import {Router} from "express";
import controladorMostrarInstalaciones from "../controllers/instalaciones/controladorMostrarInstalaciones.js";
import controladorApiInstalaciones from "../controllers/instalaciones/controladorApiInstalaciones.js";

const router = Router();

router.get("/",controladorMostrarInstalaciones.mostrarInstalaciones);

// API Routes
router.get('/api', controladorApiInstalaciones.obtenerInstalaciones)
router.post('/api/crear-instalaciones', controladorApiInstalaciones.crearInstalaciones)
router.post('/api/crear', controladorApiInstalaciones.crearReserva)
router.post('/api/crear-reserva', controladorApiInstalaciones.crearReservaPerfil)
router.get('/api/disponibles', controladorApiInstalaciones.obtenerInstalacionesReservadas)
router.get('/api/mis-reservas', controladorApiInstalaciones.obtenerInstalacionesReservadasPerfil)

/* router.get('/api/:id', deportesController.obtenerDeportePorId);
router.post('/api/crear', deportesController.crearDeporte);
router.put('/api/dactualizar/:id', deportesController.actualizarDeporte);
router.delete('/api/deliminar/:id', deportesController.eliminarDeporte);  */

export default router;