import ControladorEmpleados from './controladorEmpleados.js';

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