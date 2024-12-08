// controladorApiInscripciones.js
import controladorInscripcion from "./controladorInscripciones.js";
import errors from "../../helpers/errorInscripciones.js";

/**
 * Controlador para obtener todas las inscripciones registradas.
 * @function
 * @async
 * @param {Object} req - Objeto de la solicitud (Request).
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {void} Responde con un JSON que contiene todas las inscripciones registradas.
 */
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

/**
 * Controlador para crear una nueva inscripción.
 * @function
 * @async
 * @param {Object} req - Objeto de la solicitud (Request), debe contener los parámetros 'cliente_id' y 'clase_id' en el cuerpo.
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {void} Responde con un JSON que contiene los detalles de la inscripción creada.
 */
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

/**
 * Controlador para crear una inscripción usando el perfil del usuario autenticado.
 * @function
 * @async
 * @param {Object} req - Objeto de la solicitud (Request), debe contener el parámetro 'clase_id' en el cuerpo.
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {void} Responde con un JSON que contiene los detalles de la inscripción creada.
 */
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

/**
 * Controlador para obtener las inscripciones de un usuario autenticado.
 * @function
 * @async
 * @param {Object} req - Objeto de la solicitud (Request), debe contener el usuario autenticado en el objeto 'user'.
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {void} Responde con un JSON que contiene las inscripciones del cliente autenticado.
 */
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
