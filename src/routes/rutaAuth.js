import { Router } from "express";
import controladorApiAuth from "../controllers/auth/controladorApiAuth.js";



const router = Router();

router.post("/",controladorApiAuth.login);
router.post("/",controladorApiAuth.registro);




export default router;