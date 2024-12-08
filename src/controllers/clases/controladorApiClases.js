// controladorApiClases.js
import ControladorClases from './controladorClases.js';

// GET - Obtener todas las clases
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

// GET - Obtener clases disponibles
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

// GET - Obtener una clase por ID
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

// POST - Crear nueva clase
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

// PUT - Actualizar clase
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

// DELETE - Eliminar clase
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