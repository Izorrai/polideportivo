import ControladorInstalaciones from "./controladorInstalaciones.js"

async function obtenerInstalaciones(req, res) {
    const controlador = new ControladorInstalaciones();
    try {
        const instalaciones = await controlador.obtenerTodasLasInstalaciones();
        res.status(200).json({
            status: 'success',
            data: instalaciones
        });
    } catch (error) {
        error.status ? res.status(error.status) : res.status(500);
        res.json({
            status: 'error',
            message: error.message
        });
    }
}

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
        error.status ? res.status(error.status) : res.status(500);
        res.json({
            status: 'error',
            message: error.message
        });
    }
}

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
        error.status ? res.status(error.status) : res.status(500);
        res.json({
            status: 'error',
            message: error.message
        });
    }
}

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
        error.status ? res.status(error.status) : res.status(500);
        res.json({
            status: 'error',
            message: error.message
        });
    }
}

async function obtenerInstalacionesReservadas(req, res) {
    const controlador = new ControladorInstalaciones();
    try {
        const instalaciones = await controlador.obtenerInstalacionesConReservas();
        res.status(200).json({
            status: 'success',
            data: instalaciones
        });
    } catch (error) {
        error.status ? res.status(error.status) : res.status(500);
        res.json({
            status: 'error',
            message: error.message
        });
    }
}

async function crearReservaPerfil(req, res) {
    if (!req.user?.cliente_id) {
        return res.status(401).json({
            status: 'error',
            message: 'Usuario no autenticado'
        });
    }

    const controlador = new ControladorInstalaciones();
    try {
        const nuevaReserva = await controlador.crearReserva({
            ...req.body,
            cliente_id: req.user.cliente_id
        });

        res.status(201).json({
            status: 'success',
            message: 'Reserva creada exitosamente',
            data: nuevaReserva
        });
    } catch (error) {
        error.status ? res.status(error.status) : res.status(500);
        res.json({
            status: 'error',
            message: error.message
        });
    }
}

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
        error.status ? res.status(error.status) : res.status(500);
        res.json({
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
    eliminarInstalaciones
};

export default functions;