// controladorApiGastos.js
import ControladorGastos from './controladorGastos.js';

/**
 * Controlador para obtener todos los gastos registrados.
 * @function
 * @async
 * @param {Object} req - Objeto de la solicitud (Request).
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {void} Responde con un JSON que contiene todos los gastos registrados.
 */
async function obtenerGastos(req, res) {
    const controlador = new ControladorGastos();
    try {
        const gastos = await controlador.obtenerTodosGastos();
        res.status(200).json({
            status: 'success',
            data: gastos
        });
    } catch (error) {
        error.status ? res.status(error.status) : res.status(500);
        res.json({
            status: 'error',
            message: error.message
        });
    }
}

/**
 * Controlador para obtener un gasto por su ID.
 * @function
 * @async
 * @param {Object} req - Objeto de la solicitud (Request), debe contener el parámetro 'id' en la URL.
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {void} Responde con un JSON que contiene el gasto encontrado.
 */
async function obtenerGastoPorId(req, res) {
    const controlador = new ControladorGastos();
    try {
        const gasto = await controlador.obtenerGastoPorId(req.params.id);
        res.status(200).json({
            status: 'success',
            data: gasto
        });
    } catch (error) {
        error.status ? res.status(error.status) : res.status(500);
        res.json({
            status: 'error',
            message: error.message
        });
    }
}

/**
 * Controlador para obtener los gastos por instalación.
 * @function
 * @async
 * @param {Object} req - Objeto de la solicitud (Request), debe contener el parámetro 'instalacion_id' en la URL.
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {void} Responde con un JSON que contiene los gastos relacionados con la instalación.
 */
async function obtenerGastosPorInstalacion(req, res) {
    const controlador = new ControladorGastos();
    try {
        const gastos = await controlador.obtenerGastosPorInstalacion(req.params.instalacion_id);
        res.status(200).json({
            status: 'success',
            data: gastos
        });
    } catch (error) {
        error.status ? res.status(error.status) : res.status(500);
        res.json({
            status: 'error',
            message: error.message
        });
    }
}

/**
 * Controlador para crear un nuevo gasto.
 * @function
 * @async
 * @param {Object} req - Objeto de la solicitud (Request), debe contener los datos del gasto en el cuerpo.
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {void} Responde con un JSON que contiene los datos del nuevo gasto registrado.
 */
async function crearGasto(req, res) {
    const controlador = new ControladorGastos();
    try {
        const nuevoGasto = await controlador.crearGasto(req.body);
        res.status(201).json({
            status: 'success',
            message: 'Gasto registrado exitosamente',
            data: nuevoGasto
        });
    } catch (error) {
        error.status ? res.status(error.status) : res.status(500);
        res.json({
            status: 'error',
            message: error.message
        });
    }
}

/**
 * Controlador para actualizar un gasto existente.
 * @function
 * @async
 * @param {Object} req - Objeto de la solicitud (Request), debe contener el parámetro 'id' en la URL y los datos del gasto en el cuerpo.
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {void} Responde con un JSON que contiene los datos del gasto actualizado.
 */
async function actualizarGasto(req, res) {
    const controlador = new ControladorGastos();
    try {
        const gastoActualizado = await controlador.actualizarGasto(req.params.id, req.body);
        res.status(200).json({
            status: 'success',
            message: 'Gasto actualizado exitosamente',
            data: gastoActualizado
        });
    } catch (error) {
        error.status ? res.status(error.status) : res.status(500);
        res.json({
            status: 'error',
            message: error.message
        });
    }
}

/**
 * Controlador para eliminar un gasto.
 * @function
 * @async
 * @param {Object} req - Objeto de la solicitud (Request), debe contener el parámetro 'id' en la URL.
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {void} Responde con un JSON que contiene el estado de eliminación del gasto.
 */
async function eliminarGasto(req, res) {
    const controlador = new ControladorGastos();
    try {
        const gastoEliminado = await controlador.eliminarGasto(req.params.id);
        res.status(200).json({
            status: 'success',
            message: 'Gasto eliminado exitosamente',
            data: gastoEliminado
        });
    } catch (error) {
        error.status ? res.status(error.status) : res.status(500);
        res.json({
            status: 'error',
            message: error.message
        });
    }
}

/**
 * Controlador para obtener las estadísticas de los gastos.
 * @function
 * @async
 * @param {Object} req - Objeto de la solicitud (Request).
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {void} Responde con un JSON que contiene las estadísticas de los gastos.
 */
async function obtenerEstadisticasGastos(req, res) {
    const controlador = new ControladorGastos();
    try {
        const estadisticas = await controlador.obtenerEstadisticasGastos();
        res.status(200).json({
            status: 'success',
            data: estadisticas
        });
    } catch (error) {
        error.status ? res.status(error.status) : res.status(500);
        res.json({
            status: 'error',
            message: error.message
        });
    }
}

export const functions = {
    obtenerGastos,
    obtenerGastoPorId,
    obtenerGastosPorInstalacion,
    crearGasto,
    actualizarGasto,
    eliminarGasto,
    obtenerEstadisticasGastos
};

export default functions;
