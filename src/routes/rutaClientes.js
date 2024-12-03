import {Router} from "express";
import controladorApiClientes from "../controllers/clientes/controladorApiClientes.js";
const router = Router();


router.post("/nuevo",controladorApiClientes.crearUsuario);



export default router;
