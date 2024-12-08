// controladorApiPagos.js
import ControladorPagos from './controladorPagos.js';

/**
 * Obtiene todos los pagos.
 * @function
 * @async
 * @param {Object} req - Objeto de la solicitud (Request).
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {void} Responde con un JSON que contiene todos los pagos.
 */
async function obtenerPagos(req, res) {
    const controlador = new ControladorPagos();
    try {
        const pagos = await controlador.obtenerTodosPagos();
        res.status(200).json({
            status: 'success',
            data: pagos
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
 * Obtiene un pago por su ID.
 * @function
 * @async
 * @param {Object} req - Objeto de la solicitud (Request), debe contener el parámetro `id` en la URL.
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {void} Responde con un JSON que contiene el pago solicitado por su ID.
 */
async function obtenerPagosPorId(req, res) {
    const controlador = new ControladorPagos();
    try {
        const pago = await controlador.obtenerPagoPorId(req.params.id);
        res.status(200).json({
            status: 'success',
            data: pago
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
 * Obtiene los pagos del usuario autenticado.
 * @function
 * @async
 * @param {Object} req - Objeto de la solicitud (Request), debe contener el usuario autenticado en el objeto `user`.
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {void} Responde con un JSON que contiene los pagos del usuario autenticado.
 */
async function obtenerPagosPerfil(req, res) {
    if (!req.user?.cliente_id) {
        return res.status(401).json({
            status: 'error',
            message: 'Usuario no autenticado'
        });
    }

    const controlador = new ControladorPagos();
    try {
        const pagos = await controlador.obtenerPagosUsuario(req.user.cliente_id);
        res.status(200).json({
            status: 'success',
            data: pagos
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
 * Actualiza el método de pago de un pago existente.
 * @function
 * @async
 * @param {Object} req - Objeto de la solicitud (Request), debe contener el parámetro `id` en la URL y el nuevo `metodo_pago` en el cuerpo.
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {void} Responde con un JSON que contiene los detalles del pago actualizado.
 */
async function actualizarPagos(req, res) {
    const controlador = new ControladorPagos();
    try {
        const { metodo_pago } = req.body;
        if (!metodo_pago) {
            return res.status(400).json({
                status: 'error',
                message: 'El método de pago es requerido'
            });
        }

        const pagoActualizado = await controlador.actualizarMetodoPago(req.params.id, metodo_pago);
        res.status(200).json({
            status: 'success',
            message: 'Método de pago actualizado correctamente',
            data: pagoActualizado
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
    obtenerPagos,
    obtenerPagosPorId,
    obtenerPagosPerfil,
    actualizarPagos
};

export default functions;
