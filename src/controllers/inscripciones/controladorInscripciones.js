import InscripcionClase from "../../models/InscripcionClase.js";
import Clase from "../../models/clases.js";
import errors from "../../helpers/errorInscripciones.js";

/**
 * Obtiene todas las inscripciones.
 * @returns {Promise<Array>} Lista de todas las inscripciones.
 * @throws {Error} Si ocurre un error al obtener las inscripciones.
 */
async function obtenerTodasInscripciones() {
    try {
        const inscripciones = await InscripcionClase.findAll();
        if (!inscripciones) throw new errors.INSCRIPCION_LIST_ERROR();
        return inscripciones;
    } catch (error) {
        throw error;
    }
}

/**
 * Verifica si una clase existe en la base de datos.
 * @param {number} clase_id - El ID de la clase.
 * @returns {Promise<Object>} La clase encontrada.
 * @throws {Error} Si la clase no existe.
 */
async function verificarClaseExistente(clase_id) {
    const clase = await Clase.findByPk(clase_id);
    if (!clase) throw new errors.CLASE_NOT_FOUND();
    return clase;
}

/**
 * Verifica si ya existe una inscripción para un cliente en una clase.
 * @param {number} cliente_id - El ID del cliente.
 * @param {number} clase_id - El ID de la clase.
 * @throws {Error} Si la inscripción ya existe.
 */
async function verificarInscripcionExistente(cliente_id, clase_id) {
    const inscripcion = await InscripcionClase.findOne({
        where: {
            cliente_id: cliente_id,
            clase_id: clase_id
        }
    });
    if (inscripcion) throw new errors.INSCRIPCION_YA_EXISTE();
}

/**
 * Verifica si una clase ha alcanzado su capacidad máxima de inscripciones.
 * @param {number} clase_id - El ID de la clase.
 * @param {number} capacidad_maxima - La capacidad máxima de la clase.
 * @throws {Error} Si la clase ha alcanzado su capacidad máxima.
 */
async function verificarCapacidadClase(clase_id, capacidad_maxima) {
    const inscripcionesCount = await InscripcionClase.count({
        where: {
            clase_id: clase_id
        }
    });
    if (inscripcionesCount >= capacidad_maxima) {
        throw new errors.CLASE_COMPLETA();
    }
}

/**
 * Crea una nueva inscripción para un cliente en una clase.
 * @param {number} cliente_id - El ID del cliente.
 * @param {number} clase_id - El ID de la clase.
 * @returns {Promise<Object>} La inscripción creada.
 * @throws {Error} Si la clase no existe, la inscripción ya existe o la clase está completa.
 */
async function crearNuevaInscripcion(cliente_id, clase_id) {
    const clase = await verificarClaseExistente(clase_id);
    await verificarInscripcionExistente(cliente_id, clase_id);
    await verificarCapacidadClase(clase_id, clase.capacidad_maxima);

    return await InscripcionClase.create({
        cliente_id: cliente_id,
        clase_id: clase_id
    });
}

/**
 * Obtiene todas las inscripciones de un cliente específico.
 * @param {number} cliente_id - El ID del cliente.
 * @returns {Promise<Array>} Lista de inscripciones del cliente.
 * @throws {Error} Si ocurre un error al obtener las inscripciones.
 */
async function obtenerInscripcionesCliente(cliente_id) {
    try {
        const inscripciones = await InscripcionClase.findAll({
            where: {
                cliente_id: cliente_id
            },
            include: [Clase]
        });
        return inscripciones;
    } catch (error) {
        throw error;
    }
}

/**
 * Funciones disponibles para gestionar inscripciones.
 */
export const functions = {
    obtenerTodasInscripciones,
    crearNuevaInscripcion,
    obtenerInscripcionesCliente,
    verificarClaseExistente,
    verificarInscripcionExistente,
    verificarCapacidadClase
};

export default functions;
