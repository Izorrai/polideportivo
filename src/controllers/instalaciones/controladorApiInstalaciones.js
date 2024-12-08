// controladorApiInstalaciones.js
import ControladorInstalaciones from "./controladorInstalaciones.js";

/**
 * Obtiene todas las instalaciones disponibles.
 * @function
 * @async
 * @param {Object} req - Objeto de la solicitud (Request).
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {void} Responde con un JSON que contiene todas las instalaciones.
 */
async function obtenerInstalaciones(req, res) {
    const controlador = new ControladorInstalaciones();
    try {
        const instalaciones = await controlador.obtenerTodasLasInstalaciones();
        res.status(200).json({
            status: 'success',
            data: instalaciones
        });
    } catch (error) {
        console.error('Error al obtener instalaciones:', error);
        const status = error.status || 500;
        res.status(status).json({
            status: 'error',
            message: error.message
        });
    }
}

/**
 * Crea una nueva instalación.
 * @function
 * @async
 * @param {Object} req - Objeto de la solicitud (Request), debe contener los detalles de la nueva instalación en el cuerpo.
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {void} Responde con un JSON que contiene la instalación creada.
 */
async function crearInstalaciones(req, res) {
    const controlador = new ControladorInstalaciones();
    try {
        const nuevaInstalacion = await controlador.crearInstalacion(req.body);
        res.status(201).json({
            status: 'success',
            message: 'Instalación creada exitosamente',
            data: nuevaInstalacion
        });
    } catch (error) {
        console.error('Error al crear instalación:', error);
        const status = error.status || 500;
        res.status(status).json({
            status: 'error',
            message: error.message
        });
    }
}

/**
 * Actualiza los detalles de una instalación existente.
 * @function
 * @async
 * @param {Object} req - Objeto de la solicitud (Request), debe contener el parámetro `id` en la URL y los datos actualizados en el cuerpo.
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {void} Responde con un JSON que contiene la instalación actualizada.
 */
async function actualizarInstalaciones(req, res) {
    const controlador = new ControladorInstalaciones();
    try {
        const instalacionActualizada = await controlador.actualizarInstalacion(req.params.id, req.body);
        res.status(200).json({
            status: 'success',
            message: 'Instalación actualizada exitosamente',
            data: instalacionActualizada
        });
    } catch (error) {
        console.error('Error al actualizar instalación:', error);
        const status = error.status || 500;
        res.status(status).json({
            status: 'error',
            message: error.message
        });
    }
}

/**
 * Elimina una instalación.
 * @function
 * @async
 * @param {Object} req - Objeto de la solicitud (Request), debe contener el parámetro `id` en la URL.
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {void} Responde con un JSON que confirma que la instalación fue eliminada.
 */
async function eliminarInstalaciones(req, res) {
    const controlador = new ControladorInstalaciones();
    try {
        const instalacionEliminada = await controlador.eliminarInstalacion(req.params.id);
        res.status(200).json({
            status: 'success',
            message: 'Instalación eliminada exitosamente',
            data: instalacionEliminada
        });
    } catch (error) {
        console.error('Error al eliminar instalación:', error);
        const status = error.status || 500;
        res.status(status).json({
            status: 'error',
            message: error.message
        });
    }
}

/**
 * Obtiene todas las instalaciones con sus reservas.
 * @function
 * @async
 * @param {Object} req - Objeto de la solicitud (Request).
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {void} Responde con un JSON que contiene todas las instalaciones con sus reservas.
 */
async function obtenerInstalacionesReservadas(req, res) {
    const controlador = new ControladorInstalaciones();
    try {
        const instalaciones = await controlador.obtenerInstalacionesConReservas();
        res.status(200).json({
            status: 'success',
            data: instalaciones
        });
    } catch (error) {
        console.error('Error al obtener instalaciones reservadas:', error);
        const status = error.status || 500;
        res.status(status).json({
            status: 'error',
            message: error.message
        });
    }
}

/**
 * Crea una nueva reserva para un cliente.
 * @function
 * @async
 * @param {Object} req - Objeto de la solicitud (Request), debe contener los parámetros `cliente_id`, `instalacion_id`, `deporte_id`, `fecha`, `hora_inicio`, `hora_fin` en el cuerpo.
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {void} Responde con un JSON que contiene los detalles de la reserva creada.
 */
async function crearReserva(req, res) {
    const {cliente_id, instalacion_id, deporte_id, fecha, hora_inicio, hora_fin } = req.body;
    
    if (!instalacion_id || !deporte_id || !fecha || !hora_inicio || !hora_fin) {
        return res.status(400).json({
            status: 'error',
            message: 'Faltan campos requeridos para la reserva'
        });
    }

    const controlador = new ControladorInstalaciones();
    try {
        const datosReserva = { cliente_id, instalacion_id, deporte_id, fecha, hora_inicio, hora_fin };
        const nuevaReserva = await controlador.crearReserva(datosReserva);

        res.status(201).json({
            status: 'success',
            message: 'Reserva creada exitosamente',
            data: nuevaReserva
        });
    } catch (error) {
        console.error('Error al crear reserva');
        const status = error.status || 500;
        res.status(status).json({
            status: 'error',
            message: error.message
        });
    }
}

/**
 * Crea una nueva reserva para el usuario autenticado.
 * @function
 * @async
 * @param {Object} req - Objeto de la solicitud (Request), debe contener los parámetros `instalacion_id`, `deporte_id`, `fecha`, `hora_inicio`, `hora_fin` en el cuerpo.
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {void} Responde con un JSON que contiene los detalles de la reserva creada.
 */
async function crearReservaPerfil(req, res) {
    if (!req.user?.cliente_id) {
        return res.status(401).json({
            status: 'error',
            message: 'Usuario no autenticado'
        });
    }

    const { instalacion_id, deporte_id, fecha, hora_inicio, hora_fin } = req.body;
    
    if (!instalacion_id || !deporte_id || !fecha || !hora_inicio || !hora_fin) {
        return res.status(400).json({
            status: 'error',
            message: 'Faltan campos requeridos para la reserva'
        });
    }

    const controlador = new ControladorInstalaciones();
    try {
        const datosReserva = {
            cliente_id: req.user.cliente_id,
            instalacion_id,
            deporte_id,
            fecha,
            hora_inicio,
            hora_fin
        };

        const nuevaReserva = await controlador.crearReserva(datosReserva);

        res.status(201).json({
            status: 'success',
            message: 'Reserva creada exitosamente',
            data: nuevaReserva
        });
    } catch (error) {
        console.error('Error al crear reserva');
        const status = error.status || 500;
        res.status(status).json({
            status: 'error',
            message: error.message
        });
    }
}

/**
 * Obtiene las reservas del usuario autenticado.
 * @function
 * @async
 * @param {Object} req - Objeto de la solicitud (Request), debe contener el usuario autenticado en el objeto `user`.
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {void} Responde con un JSON que contiene las reservas del cliente autenticado.
 */
async function obtenerInstalacionesReservadasPerfil(req, res) {
    if (!req.user?.cliente_id) {
        return res.status(401).json({
            status: 'error',
            message: 'Usuario no autenticado'
        });
    }

    const controlador = new ControladorInstalaciones();
    try {
        const reservas = await controlador.obtenerReservasUsuario(req.user.cliente_id);
        res.status(200).json({
            status: 'success',
            data: reservas
        });
    } catch (error) {
        console.error('Error al obtener reservas del usuario:', error);
        const status = error.status || 500;
        res.status(status).json({
            status: 'error',
            message: error.message
        });
    }
}

export const functions = {
    obtenerInstalaciones,
    obtenerInstalacionesReservadas,
    obtenerInstalacionesReservadasPerfil,
    actualizarInstalaciones,
    crearInstalaciones,
    crearReservaPerfil,
    crearReserva,
    eliminarInstalaciones
};

export default functions;
