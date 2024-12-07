import ControladorGastos from './controladorGastos.js';

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