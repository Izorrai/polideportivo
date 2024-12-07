import Deporte from "../../models/deportes.js";
import errors from "../../helpers/errorDeportes.js";

/**
 * Controlador para gestionar las operaciones relacionadas con los deportes.
 */
class ControladorDeportes {
  
  /**
   * Obtiene todos los deportes.
   * @returns {Promise<Array>} Lista de todos los deportes.
   * @throws {Error} Si ocurre un error al obtener los deportes.
   */
  async TodosLosDeportes() {
    try {
      const deportes = await Deporte.findAll();
      return deportes.map(deporte => deporte.get());
    } catch (error) {
      throw error;
    }
  }

  /**
   * Obtiene un deporte por su ID.
   * @param {number} id - El ID del deporte.
   * @returns {Promise<Object>} El deporte encontrado.
   * @throws {Error} Si el deporte no se encuentra.
   */
  async ObtenerDeportePorId(id) {
    const deporte = await Deporte.findByPk(id);
    if (!deporte) {
      throw new errors.DEPORTE_NOT_FOUND();
    }
    return deporte;
  }

  /**
   * Crea un nuevo deporte.
   * @param {Object} datosDeporte - Los datos del nuevo deporte.
   * @param {string} datosDeporte.nombre - El nombre del deporte.
   * @param {string} datosDeporte.descripcion - La descripción del deporte.
   * @returns {Promise<Object>} El nuevo deporte creado.
   * @throws {Error} Si faltan datos o el deporte ya existe.
   */
  async crearDeporte(datosDeporte) {
    const { nombre, descripcion } = datosDeporte;

    if (!nombre || !descripcion) {
      throw new errors.FALTAN_DATOS_DEPORTE();
    }

    const deporteExistente = await Deporte.findOne({
      where: { nombre }
    });

    if (deporteExistente) {
      throw new errors.DEPORTE_YA_EXISTE();
    }

    const nuevoDeporte = await Deporte.create(datosDeporte);
    return nuevoDeporte;
  }

  /**
   * Elimina un deporte.
   * @param {number} id - El ID del deporte a eliminar.
   * @returns {Promise<Object>} El deporte eliminado.
   * @throws {Error} Si el deporte no se encuentra.
   */
  async borrarDeporte(id) {
    const deporte = await Deporte.findByPk(id);
    
    if (!deporte) {
      throw new errors.DEPORTE_NOT_FOUND();
    }

    await deporte.destroy();
    return deporte;
  }
}

export default ControladorDeportes;
