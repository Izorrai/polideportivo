import {Router} from "express";
import controladorApiClientes from "../controllers/clientes/controladorApiClientes.js";
import { isAdmin } from "../controllers/middlewares/authMiddleware.js";
const router = Router();

router.get("/", isAdmin, controladorApiClientes.getAllUsuarios);
router.get("/buscar/:id",isAdmin, controladorApiClientes.buscarUsuarioPorId);

router.post("/nuevo",controladorApiClientes.crearUsuario);
router.post("/actualizar",controladorApiClientes.actualizarUsuario);
router.post("/actualizar-perfil",controladorApiClientes.actualizarUsuarioPerfil);
router.post("/eliminar/:id",controladorApiClientes.eliminarUsuario);





export default router;
