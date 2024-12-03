import {Router} from "express";
import controladorApiClientes from "../controllers/clientes/controladorApiClientes.js";
const router = Router();


router.post("/nuevo",controladorApiClientes.crearUsuario);
router.post("/actualizar",controladorApiClientes.actualizarUsuario);
router.post("/actualizar-perfil",controladorApiClientes.actualizarUsuarioPerfil);



export default router;
