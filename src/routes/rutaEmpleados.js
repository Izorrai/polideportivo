import {Router} from "express";
import controladorApiEmpleados from "../controllers/empleados/controladorApiEmpleados.js";
import { isAdmin, isAuthenticated } from "../controllers/middlewares/authMiddleware.js";

const router = Router();


// API Routes
router.get('/api', controladorApiEmpleados.obtenerEmpleados)
router.get('/api/:id', controladorApiEmpleados.obtenerEmpleadoPorId)
router.post('/api/crear', isAdmin, controladorApiEmpleados.crearEmpleado)
router.put('/api/actualizar/:id', isAdmin, controladorApiEmpleados.actualizarEmpleado)
router.delete('/api/eliminar/:id', isAdmin, controladorApiEmpleados.eliminarEmpleado)

export default router;