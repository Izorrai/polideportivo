// controladorApiDeportes.js
import express from 'express';
import ControladorDeportes from './controladorDeportes.js';

/**
 * Controlador para obtener todos los deportes.
 * @function
 * @async
 * @param {Object} req - Objeto de la solicitud (Request).
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {void} Responde con un JSON que contiene la lista de todos los deportes.
 */
async function obtenerDeportes(req, res) {
  const controladorDeportes = new ControladorDeportes();
  try {
    const deportes = await controladorDeportes.TodosLosDeportes();
    res.status(200).json({
      status: 'success',
      data: deportes
    });
  } catch (error) {
    console.error('Error al obtener los deportes:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener los deportes',
      error: error.message
    });
  }
}

/**
 * Controlador para obtener un deporte por su ID.
 * @function
 * @async
 * @param {Object} req - Objeto de la solicitud (Request), debe contener el parámetro 'id' en la URL.
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {void} Responde con un JSON que contiene los datos del deporte encontrado.
 */
async function obtenerDeportePorId(req, res) {
  const controladorDeportes = new ControladorDeportes();
  try {
    const deporte = await controladorDeportes.ObtenerDeportePorId(req.params.id);
    if (!deporte) {
      return res.status(404).json({
        status: 'error',
        message: 'Deporte no encontrado'
      });
    }
    res.status(200).json({
      status: 'success',
      data: deporte
    });
  } catch (error) {
    console.error('Error al obtener el deporte:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener el deporte',
      error: error.message
    });
  }
}

/**
 * Controlador para crear un nuevo deporte.
 * @function
 * @async
 * @param {Object} req - Objeto de la solicitud (Request), debe contener los datos del nuevo deporte en el cuerpo.
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {void} Responde con un JSON que contiene los datos del nuevo deporte creado.
 */
async function crearDeporte(req, res) {
  const controladorDeportes = new ControladorDeportes();
  try {
    const nuevoDeporte = await controladorDeportes.CrearDeporte(req.body);
    res.status(201).json({
      status: 'success',
      message: 'Deporte creado exitosamente',
      data: nuevoDeporte
    });
  } catch (error) {
    console.error('Error al crear el deporte:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error al crear el deporte',
      error: error.message
    });
  }
}

/**
 * Controlador para actualizar un deporte existente.
 * @function
 * @async
 * @param {Object} req - Objeto de la solicitud (Request), debe contener el parámetro 'id' en la URL y los datos del deporte en el cuerpo.
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {void} Responde con un JSON que contiene los datos del deporte actualizado.
 */
async function actualizarDeporte(req, res) {
  const controladorDeportes = new ControladorDeportes();
  try {
    const deporteActualizado = await controladorDeportes.ActualizarDeporte(req.params.id, req.body);
    if (!deporteActualizado) {
      return res.status(404).json({
        status: 'error',
        message: 'Deporte no encontrado'
      });
    }
    res.status(200).json({
      status: 'success',
      message: 'Deporte actualizado exitosamente',
      data: deporteActualizado
    });
  } catch (error) {
    console.error('Error al actualizar el deporte:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error al actualizar el deporte',
      error: error.message
    });
  }
}

/**
 * Controlador para eliminar un deporte.
 * @function
 * @async
 * @param {Object} req - Objeto de la solicitud (Request), debe contener el parámetro 'id' en la URL.
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {void} Responde con un JSON que contiene el estado de eliminación del deporte.
 */
async function eliminarDeporte(req, res) {
  const controladorDeportes = new ControladorDeportes();
  try {
    const resultado = await controladorDeportes.borrarDeporte(req.params.id);
    if (!resultado) {
      return res.status(404).json({
        status: 'error',
        message: 'Deporte no encontrado'
      });
    }
    res.status(200).json({
      status: 'success',
      message: 'Deporte eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar el deporte:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error al eliminar el deporte',
      error: error.message
    });
  }
}

export const functions = {
  obtenerDeportes,
  obtenerDeportePorId,
  crearDeporte,
  actualizarDeporte,
  eliminarDeporte
};

export default functions;
