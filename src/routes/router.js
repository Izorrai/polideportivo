import { Router } from "express";
import deportes from "./rutaDeportes.js";
import instalaciones from "./rutaInstalaciones.js";
import inscripcion from "./rutaInscripcion.js";
import clases from "./rutaClases.js";
import pagos from "./rutaPagos.js";

const router = Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.use('/deportes', deportes);
router.use('/instalaciones', instalaciones);
router.use('/inscripciones', inscripcion);
router.use('/clases', clases);
router.use('/pagos', pagos);

export default router;