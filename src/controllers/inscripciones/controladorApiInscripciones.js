import controladorInscripcion from "./controladorInscripciones.js";
import errors from "../../helpers/errorInscripciones.js";

async function obtenerInscripciones(req, res) {
    try {
        const inscripciones = await controladorInscripcion.obtenerTodasInscripciones();
        res.status(200).json({
            status: 'success',
            data: inscripciones
        });
    } catch (error) {
        console.error('Error al obtener las inscripciones:', error);
        error.status ? res.status(error.status) : res.status(500);
        res.json({
            status: 'error',
            message: error.message
        });
    }
}

async function crearInscripcion(req, res) {
    const { cliente_id, clase_id } = req.body;

    try {
        const nuevaInscripcion = await controladorInscripcion.crearNuevaInscripcion(cliente_id, clase_id);
        res.status(201).json({
            status: 'success',
            message: 'Inscripción creada exitosamente',
            data: nuevaInscripcion
        });
    } catch (error) {
        console.error('Error al crear la inscripción:', error);
        error.status ? res.status(error.status) : res.status(500);
        res.json({
            status: 'error',
            message: error.message
        });
    }
}

async function crearInscripcionPerfil(req, res) {
    if (!req.user || !req.user.cliente_id) {
        return res.status(401).json({
            status: 'error',
            message: 'Usuario no autenticado'
        });
    }

    const { clase_id } = req.body;
    const cliente_id = req.user.cliente_id;

    try {
        const nuevaInscripcion = await controladorInscripcion.crearNuevaInscripcion(cliente_id, clase_id);
        res.status(201).json({
            status: 'success',
            message: 'Inscripción creada exitosamente',
            data: nuevaInscripcion
        });
    } catch (error) {
        console.error('Error al crear la inscripción:', error);
        error.status ? res.status(error.status) : res.status(500);
        res.json({
            status: 'error',
            message: error.message
        });
    }
}

async function obtenerMisInscripciones(req, res) {
    if (!req.user || !req.user.cliente_id) {
        return res.status(401).json({
            status: 'error',
            message: 'Usuario no autenticado'
        });
    }

    try {
        const inscripciones = await controladorInscripcion.obtenerInscripcionesCliente(req.user.cliente_id);
        res.status(200).json({
            status: 'success',
            data: inscripciones
        });
    } catch (error) {
        console.error('Error al obtener las inscripciones:', error);
        error.status ? res.status(error.status) : res.status(500);
        res.json({
            status: 'error',
            message: error.message
        });
    }
}

export const functions = {
    obtenerInscripciones,
    crearInscripcion,
    crearInscripcionPerfil,
    obtenerMisInscripciones
};

export default functions;