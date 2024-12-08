// controladorClases.js
import Clase from "../../models/clases.js";
import Deporte from "../../models/deportes.js";
import Empleado from "../../models/empleado.js";
import Instalacion from "../../models/instalacion.js";
import InscripcionClase from "../../models/InscripcionClase.js";
import errors from "../../helpers/errorClases.js";

/**
 * Controlador para gestionar las operaciones relacionadas con las clases.
 */
class ControladorClases {
    /**
     * Obtiene todas las clases con sus relaciones.
     * @returns {Promise<Array>} Lista de todas las clases.
     * @throws {Error} Si ocurre un error al obtener las clases.
     */
    async obtenerTodasLasClases() {
        try {
            const clases = await Clase.findAll({
                include: [
                    { model: Deporte },
                    { model: Empleado },
                    { model: Instalacion }
                ]
            });
            if (!clases) throw new errors.CLASE_LIST_ERROR();
            return clases;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Obtiene una clase específica por ID con sus relaciones.
     * @param {number} id - ID de la clase a buscar
     * @returns {Promise<Object>} Clase encontrada con sus relaciones
     * @throws {Error} Si la clase no existe o hay un error en la búsqueda
     */
    async obtenerClasePorId(id) {
        try {
            const clase = await Clase.findByPk(id, {
                include: [
                    { model: Deporte },
                    { model: Empleado },
                    { model: Instalacion }
                ]
            });
            if (!clase) throw new errors.CLASE_NOT_FOUND();
            return clase;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Obtiene todas las clases que tienen cupos disponibles.
     * @returns {Promise<Array>} Lista de clases con cupos disponibles.
     * @throws {Error} Si ocurre un error al obtener las clases.
     */
    async obtenerClasesDisponibles() {
        try {
            const clases = await Clase.findAll({
                include: [
                    { model: Deporte },
                    { model: Empleado },
                    { model: Instalacion }
                ]
            });

            const clasesConInscripciones = await Promise.all(clases.map(async (clase) => {
                const inscripcionesCount = await InscripcionClase.count({
                    where: {
                        clase_id: clase.clase_id
                    }
                });
                
                return {
                    ...clase.toJSON(),
                    cupos_disponibles: clase.capacidad_maxima - inscripcionesCount
                };
            }));

            const clasesDisponibles = clasesConInscripciones.filter(
                clase => clase.cupos_disponibles > 0
            );

            if (clasesDisponibles.length === 0) {
                throw new errors.CLASE_NO_DISPONIBLE();
            }

            return clasesDisponibles;
        } catch (error) {
            if (error instanceof errors.CLASE_NO_DISPONIBLE) {
                throw error;
            }
            throw new Error(`Error al obtener las clases disponibles: ${error.message}`);
        }
    }

    /**
     * Crea una nueva clase.
     * @param {Object} datosClase - Datos de la clase a crear
     * @returns {Promise<Object>} Nueva clase creada
     * @throws {Error} Si ocurre un error durante la creación
     */
    async crearClase(datosClase) {
        try {
            // Validar campos requeridos
            const camposRequeridos = ['deporte_id', 'empleado_id', 'instalacion_id', 'capacidad_maxima'];
            for (const campo of camposRequeridos) {
                if (!datosClase[campo]) {
                    throw new errors.CLASE_DATOS_INVALIDOS(`El campo ${campo} es requerido`);
                }
            }

            // Validar existencia de Deporte
            const deporte = await Deporte.findByPk(datosClase.deporte_id);
            if (!deporte) throw new errors.CLASE_DATOS_INVALIDOS('El deporte especificado no existe');

            // Validar existencia de Empleado
            const empleado = await Empleado.findByPk(datosClase.empleado_id);
            if (!empleado) throw new errors.CLASE_DATOS_INVALIDOS('El empleado especificado no existe');

            // Validar existencia de Instalación
            const instalacion = await Instalacion.findByPk(datosClase.instalacion_id);
            if (!instalacion) throw new errors.CLASE_DATOS_INVALIDOS('La instalación especificada no existe');

            // Validar que la capacidad máxima sea un número positivo
            if (isNaN(datosClase.capacidad_maxima) || datosClase.capacidad_maxima <= 0) {
                throw new errors.CLASE_DATOS_INVALIDOS('La capacidad máxima debe ser un número positivo');
            }

            // Validar formato de hora si se proporcionan
            if (datosClase.hora_inicio && datosClase.hora_fin) {
                const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
                if (!timeRegex.test(datosClase.hora_inicio) || !timeRegex.test(datosClase.hora_fin)) {
                    throw new errors.CLASE_DATOS_INVALIDOS('Formato de hora inválido (debe ser HH:MM:SS)');
                }
            }

            // Validar día de la semana si se proporciona
            if (datosClase.dia_semana) {
                const diasValidos = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
                if (!diasValidos.includes(datosClase.dia_semana)) {
                    throw new errors.CLASE_DATOS_INVALIDOS('Día de la semana inválido');
                }
            }

            // Validar precio si se proporciona
            if (datosClase.precio && (isNaN(datosClase.precio) || datosClase.precio < 0)) {
                throw new errors.CLASE_DATOS_INVALIDOS('El precio debe ser un número positivo');
            }

            const nuevaClase = await Clase.create(datosClase);
            if (!nuevaClase) throw new errors.CLASE_CREATE_ERROR();

            // Devolver la clase creada con sus relaciones
            return this.obtenerClasePorId(nuevaClase.clase_id);
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                throw new errors.CLASE_DATOS_INVALIDOS(error.message);
            }
            throw error;
        }
    }

    /**
 * Actualiza una clase existente.
 * @param {number} id - ID de la clase a actualizar
 * @param {Object} datosActualizados - Nuevos datos de la clase
 * @returns {Promise<Object>} Clase actualizada
 * @throws {Error} Si la clase no existe o hay un error en la actualización
 */
async actualizarClase(id, datosActualizados) {
    try {
        const clase = await Clase.findByPk(id);
        if (!clase) throw new errors.CLASE_NOT_FOUND();

        // Eliminar campos vacíos o undefined
        Object.keys(datosActualizados).forEach(key => {
            if (datosActualizados[key] === '' || datosActualizados[key] === undefined) {
                delete datosActualizados[key];
            }
        });

        // Si no hay datos para actualizar, retornar la clase sin cambios
        if (Object.keys(datosActualizados).length === 0) {
            return this.obtenerClasePorId(id);
        }

        // Validar campos que sí están presentes
        if (datosActualizados.deporte_id) {
            const deporte = await Deporte.findByPk(datosActualizados.deporte_id);
            if (!deporte) throw new errors.CLASE_DATOS_INVALIDOS('El deporte especificado no existe');
        }

        if (datosActualizados.empleado_id) {
            const empleado = await Empleado.findByPk(datosActualizados.empleado_id);
            if (!empleado) throw new errors.CLASE_DATOS_INVALIDOS('El empleado especificado no existe');
        }

        if (datosActualizados.instalacion_id) {
            const instalacion = await Instalacion.findByPk(datosActualizados.instalacion_id);
            if (!instalacion) throw new errors.CLASE_DATOS_INVALIDOS('La instalación especificada no existe');
        }

        if (datosActualizados.capacidad_maxima) {
            if (isNaN(datosActualizados.capacidad_maxima) || datosActualizados.capacidad_maxima <= 0) {
                throw new errors.CLASE_DATOS_INVALIDOS('La capacidad máxima debe ser un número positivo');
            }
        }

        if (datosActualizados.precio) {
            if (isNaN(datosActualizados.precio) || datosActualizados.precio < 0) {
                throw new errors.CLASE_DATOS_INVALIDOS('El precio debe ser un número positivo');
            }
        }

        if (datosActualizados.dia_semana) {
            const diasValidos = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
            if (!diasValidos.includes(datosActualizados.dia_semana)) {
                throw new errors.CLASE_DATOS_INVALIDOS('Día de la semana inválido');
            }
        }

        if (datosActualizados.hora_inicio || datosActualizados.hora_fin) {
            const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
            if (datosActualizados.hora_inicio && !timeRegex.test(datosActualizados.hora_inicio)) {
                throw new errors.CLASE_DATOS_INVALIDOS('Formato de hora de inicio inválido (debe ser HH:MM:SS)');
            }
            if (datosActualizados.hora_fin && !timeRegex.test(datosActualizados.hora_fin)) {
                throw new errors.CLASE_DATOS_INVALIDOS('Formato de hora de fin inválido (debe ser HH:MM:SS)');
            }
        }

        await clase.update(datosActualizados);
        return this.obtenerClasePorId(id);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            throw new errors.CLASE_DATOS_INVALIDOS(error.message);
        }
        throw error;
    }
}

    /**
     * Elimina una clase.
     * @param {number} id - ID de la clase a eliminar
     * @returns {Promise<void>}
     * @throws {Error} Si la clase no existe o hay un error en la eliminación
     */
    async eliminarClase(id) {
        try {
            const clase = await Clase.findByPk(id);
            if (!clase) throw new errors.CLASE_NOT_FOUND();

            // Verificar si hay inscripciones asociadas
            const inscripciones = await InscripcionClase.count({
                where: { clase_id: id }
            });

            if (inscripciones > 0) {
                throw new errors.CLASE_DELETE_ERROR('No se puede eliminar la clase porque tiene inscripciones asociadas');
            }

            await clase.destroy();
        } catch (error) {
            throw error;
        }
    }

    /**
     * Verifica si una clase está completa.
     * @param {number} clase_id - ID de la clase a verificar
     * @returns {Promise<number>} Número de inscripciones actuales
     * @throws {Error} Si ocurre un error durante la verificación
     */
    async verificarClaseCompleta(clase_id) {
        const clase = await Clase.findByPk(clase_id);
        if (!clase) throw new errors.CLASE_NOT_FOUND();

        const inscripcionesCount = await InscripcionClase.count({
            where: { clase_id }
        });

        if (inscripcionesCount >= clase.capacidad_maxima) {
            throw new errors.CLASE_COMPLETA();
        }

        return inscripcionesCount;
    }
}

export default ControladorClases;