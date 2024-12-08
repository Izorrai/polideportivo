// controladorApiEmpleados.js
import ControladorEmpleados from './controladorEmpleados.js';

/**
 * Controlador para obtener todos los empleados.
 * @function
 * @async
 * @param {Object} req - Objeto de la solicitud (Request).
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {void} Responde con un JSON que contiene la lista de todos los empleados.
 */
async function obtenerEmpleados(req, res) {
    const controlador = new ControladorEmpleados();
    try {
        const empleados = await controlador.obtenerTodosEmpleados();
        res.status(200).json({
            status: 'success',
            data: empleados
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
 * Controlador para obtener un empleado por su ID.
 * @function
 * @async
 * @param {Object} req - Objeto de la solicitud (Request), debe contener el parámetro 'id' en la URL.
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {void} Responde con un JSON que contiene los datos del empleado encontrado.
 */
async function obtenerEmpleadoPorId(req, res) {
    const controlador = new ControladorEmpleados();
    try {
        const empleado = await controlador.obtenerEmpleadoPorId(req.params.id);
        res.status(200).json({
            status: 'success',
            data: empleado
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
 * Controlador para crear un nuevo empleado.
 * @function
 * @async
 * @param {Object} req - Objeto de la solicitud (Request), debe contener los datos del nuevo empleado en el cuerpo.
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {void} Responde con un JSON que contiene los datos del nuevo empleado creado.
 */
async function crearEmpleado(req, res) {
    const controlador = new ControladorEmpleados();
    try {
        const nuevoEmpleado = await controlador.crearEmpleado(req.body);
        res.status(201).json({
            status: 'success',
            message: 'Empleado creado exitosamente',
            data: nuevoEmpleado
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
 * Controlador para actualizar un empleado existente.
 * @function
 * @async
 * @param {Object} req - Objeto de la solicitud (Request), debe contener el parámetro 'id' en la URL y los datos del empleado en el cuerpo.
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {void} Responde con un JSON que contiene los datos del empleado actualizado.
 */
async function actualizarEmpleado(req, res) {
    const controlador = new ControladorEmpleados();
    try {
        const empleadoActualizado = await controlador.actualizarEmpleado(req.params.id, req.body);
        res.status(200).json({
            status: 'success',
            message: 'Empleado actualizado exitosamente',
            data: empleadoActualizado
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
 * Controlador para eliminar un empleado.
 * @function
 * @async
 * @param {Object} req - Objeto de la solicitud (Request), debe contener el parámetro 'id' en la URL.
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {void} Responde con un JSON que contiene el estado de eliminación del empleado.
 */
async function eliminarEmpleado(req, res) {
    const controlador = new ControladorEmpleados();
    try {
        const empleadoEliminado = await controlador.eliminarEmpleado(req.params.id);
        res.status(200).json({
            status: 'success',
            message: 'Empleado eliminado exitosamente',
            data: empleadoEliminado
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
    obtenerEmpleados,
    obtenerEmpleadoPorId,
    crearEmpleado,
    actualizarEmpleado,
    eliminarEmpleado
};

export default functions;
