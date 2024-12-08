// controladorApiClases.js
import ControladorClases from './controladorClases.js';

/**
 * Controlador para obtener todas las clases.
 * @function
 * @async
 * @param {Object} req - Objeto de la solicitud (Request).
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {void} Responde con un JSON que contiene el estado y los datos de las clases.
 */
async function obtenerClases(req, res) {
    const controladorClases = new ControladorClases();
    try {
        const clases = await controladorClases.obtenerTodasLasClases();
        res.status(200).json({
            status: 'success',
            data: clases
        });
    } catch (error) {
        console.error('Error al obtener las clases:', error);
        const status = error.status || 500;
        res.status(status).json({
            status: 'error',
            message: error.message || 'Error al obtener las clases'
        });
    }
}

/**
 * Controlador para obtener las clases disponibles.
 * @function
 * @async
 * @param {Object} req - Objeto de la solicitud (Request).
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {void} Responde con un JSON que contiene el estado y los datos de las clases disponibles.
 */
async function obtenerClasesDisponibles(req, res) {
    const controladorClases = new ControladorClases();
    try {
        const clasesDisponibles = await controladorClases.obtenerClasesDisponibles();
        res.status(200).json({
            status: 'success',
            data: clasesDisponibles
        });
    } catch (error) {
        console.error('Error al obtener las clases disponibles:', error);
        const status = error.status || 500;
        res.status(status).json({
            status: 'error',
            message: error.message || 'Error al obtener las clases disponibles'
        });
    }
}

/**
 * Controlador para obtener una clase específica por su ID.
 * @function
 * @async
 * @param {Object} req - Objeto de la solicitud (Request), debe contener el parámetro 'id' en la URL.
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {void} Responde con un JSON que contiene el estado y los datos de la clase solicitada.
 */
async function obtenerClasePorId(req, res) {
    const controladorClases = new ControladorClases();
    const { id } = req.params;
    try {
        const clase = await controladorClases.obtenerClasePorId(id);
        res.status(200).json({
            status: 'success',
            data: clase
        });
    } catch (error) {
        console.error('Error al obtener la clase:', error);
        const status = error.status || 500;
        res.status(status).json({
            status: 'error',
            message: error.message || 'Error al obtener la clase'
        });
    }
}

/**
 * Controlador para crear una nueva clase.
 * @function
 * @async
 * @param {Object} req - Objeto de la solicitud (Request), debe contener los datos de la nueva clase en el cuerpo.
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {void} Responde con un JSON que contiene el estado y los datos de la nueva clase creada.
 */
async function crearClase(req, res) {
    const controladorClases = new ControladorClases();
    try {
        const nuevaClase = await controladorClases.crearClase(req.body);
        res.status(201).json({
            status: 'success',
            message: 'Clase creada exitosamente',
            data: nuevaClase
        });
    } catch (error) {
        console.error('Error al crear la clase:', error);
        const status = error.status || 500;
        res.status(status).json({
            status: 'error',
            message: error.message || 'Error al crear la clase'
        });
    }
}

/**
 * Controlador para actualizar una clase existente.
 * @function
 * @async
 * @param {Object} req - Objeto de la solicitud (Request), debe contener el parámetro 'id' en la URL y los datos de la clase en el cuerpo.
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {void} Responde con un JSON que contiene el estado y los datos de la clase actualizada.
 */
async function actualizarClase(req, res) {
    const controladorClases = new ControladorClases();
    const { id } = req.params;
    try {
        const claseActualizada = await controladorClases.actualizarClase(id, req.body);
        res.status(200).json({
            status: 'success',
            message: 'Clase actualizada exitosamente',
            data: claseActualizada
        });
    } catch (error) {
        console.error('Error al actualizar la clase:', error);
        const status = error.status || 500;
        res.status(status).json({
            status: 'error',
            message: error.message || 'Error al actualizar la clase'
        });
    }
}

/**
 * Controlador para eliminar una clase.
 * @function
 * @async
 * @param {Object} req - Objeto de la solicitud (Request), debe contener el parámetro 'id' en la URL.
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {void} Responde con un JSON que contiene el estado y el mensaje de eliminación exitosa.
 */
async function eliminarClase(req, res) {
    const controladorClases = new ControladorClases();
    const { id } = req.params;
    try {
        await controladorClases.eliminarClase(id);
        res.status(200).json({
            status: 'success',
            message: 'Clase eliminada exitosamente'
        });
    } catch (error) {
        console.error('Error al eliminar la clase:', error);
        const status = error.status || 500;
        res.status(status).json({
            status: 'error',
            message: error.message || 'Error al eliminar la clase'
        });
    }
}

export const functions = {
    obtenerClases,
    obtenerClasesDisponibles,
    obtenerClasePorId,
    crearClase,
    actualizarClase,
    eliminarClase
};

export default functions;
