import Instalacion from "../../models/instalacion.js";
import Reserva from '../../models/reserva.js';
import Pago from '../../models/pago.js';
import errors from "../../helpers/errorInstalaciones.js";

/**
 * Controlador para gestionar las instalaciones.
 */
class ControladorInstalaciones {
    
    /**
     * Obtiene todas las instalaciones.
     * @returns {Promise<Array>} Lista de todas las instalaciones.
     * @throws {Error} Si ocurre un error al obtener las instalaciones.
     */
    async obtenerTodasLasInstalaciones() {
        try {
            const instalaciones = await Instalacion.findAll();
            if (!instalaciones) throw new errors.INSTALACION_LIST_ERROR();
            return instalaciones;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Obtiene una instalación por su ID.
     * @param {number} instalacion_id - El ID de la instalación.
     * @returns {Promise<Object>} La instalación correspondiente al ID.
     * @throws {Error} Si no se encuentra la instalación.
     */
    async obtenerInstalacionPorId(instalacion_id) {
        const instalacion = await Instalacion.findByPk(instalacion_id);
        if (!instalacion) throw new errors.INSTALACION_NOT_FOUND();
        return instalacion;
    }

    /**
     * Crea una nueva instalación.
     * @param {Object} datosInstalacion - Los datos de la nueva instalación.
     * @param {string} datosInstalacion.nombre - El nombre de la instalación.
     * @param {number} datosInstalacion.precio_hora - El precio por hora de la instalación.
     * @param {string} datosInstalacion.estado - El estado de la instalación (e.g., 'disponible', 'reservada').
     * @returns {Promise<Object>} La instalación creada.
     * @throws {Error} Si faltan datos de la instalación o si ocurre un error al crear la instalación.
     */
    async crearInstalacion(datosInstalacion) {
        if (!datosInstalacion.nombre || !datosInstalacion.precio_hora || !datosInstalacion.estado) {
            throw new errors.DATOS_INSTALACION_INVALIDOS();
        }

        try {
            return await Instalacion.create(datosInstalacion);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Actualiza una instalación.
     * @param {number} instalacion_id - El ID de la instalación a actualizar.
     * @param {Object} datosActualizacion - Los datos a actualizar.
     * @returns {Promise<Object>} La instalación actualizada.
     * @throws {Error} Si no se encuentra la instalación.
     */
    async actualizarInstalacion(instalacion_id, datosActualizacion) {
        const instalacion = await this.obtenerInstalacionPorId(instalacion_id);
        await instalacion.update(datosActualizacion);
        return instalacion;
    }

    /**
     * Elimina una instalación.
     * @param {number} instalacion_id - El ID de la instalación a eliminar.
     * @returns {Promise<Object>} La instalación eliminada.
     * @throws {Error} Si no se encuentra la instalación.
     */
    async eliminarInstalacion(instalacion_id) {
        const instalacion = await this.obtenerInstalacionPorId(instalacion_id);
        await instalacion.destroy();
        return instalacion;
    }

    /**
     * Verifica si una instalación está reservada en una fecha y hora específicas.
     * @param {number} instalacion_id - El ID de la instalación.
     * @param {string} fecha - La fecha de la reserva.
     * @param {string} hora_inicio - La hora de inicio de la reserva.
     * @throws {Error} Si la instalación ya está reservada.
     */
    async verificarDisponibilidad(instalacion_id, fecha, hora_inicio) {
        const reservaExistente = await Reserva.findOne({
            where: {
                instalacion_id,
                fecha,
                hora_inicio
            }
        });

        if (reservaExistente) {
            throw new errors.INSTALACION_YA_RESERVADA();
        }
    }

    /**
     * Obtiene todas las instalaciones con información sobre sus reservas.
     * @returns {Promise<Array>} Lista de instalaciones con su estado y reservas.
     */
    async obtenerInstalacionesConReservas() {
        const instalaciones = await Instalacion.findAll();
        
        return Promise.all(instalaciones.map(async (instalacion) => {
            const reservas = await Reserva.findAll({
                where: { instalacion_id: instalacion.instalacion_id }
            });

            return {
                ...instalacion.toJSON(),
                estado: reservas.length > 0 ? 'reservada' : 'disponible',
                reservas: reservas.length > 0 ? reservas.map(reserva => ({
                    fecha: reserva.fecha,
                    hora_inicio: reserva.hora_inicio,
                    hora_fin: reserva.hora_fin,
                    cliente_id: reserva.cliente_id
                })) : []
            };
        }));
    }

    /**
     * Crea una nueva reserva para un cliente en una instalación.
     * @param {Object} datosReserva - Los datos de la nueva reserva.
     * @param {number} datosReserva.cliente_id - El ID del cliente que realiza la reserva.
     * @param {number} datosReserva.instalacion_id - El ID de la instalación reservada.
     * @param {number} datosReserva.deporte_id - El ID del deporte asociado a la reserva.
     * @param {string} datosReserva.fecha - La fecha de la reserva.
     * @param {string} datosReserva.hora_inicio - La hora de inicio de la reserva.
     * @param {string} datosReserva.hora_fin - La hora de fin de la reserva.
     * @returns {Promise<Object>} La reserva creada.
     * @throws {Error} Si la instalación no está disponible o si ocurre un error en la creación de la reserva.
     */
    async crearReserva(datosReserva) {
        const { cliente_id, instalacion_id, deporte_id, fecha, hora_inicio, hora_fin } = datosReserva;
        
        const instalacion = await this.obtenerInstalacionPorId(instalacion_id);
        await this.verificarDisponibilidad(instalacion_id, fecha, hora_inicio);

        const nuevaReserva = await Reserva.create({
            cliente_id,
            instalacion_id,
            deporte_id,
            fecha,
            hora_inicio,
            hora_fin,
            estado: 'confirmada'
        });

        await Pago.create({
            reserva_id: nuevaReserva.reserva_id,
            monto: instalacion.precio_hora,
            metodo_pago: 'efectivo',
            fecha_pago: new Date(),
            estado: 'COMPLETADO'
        });

        await instalacion.update({ estado: 'reservada' });

        return nuevaReserva;
    }

    /**
     * Obtiene todas las reservas de un usuario.
     * @param {number} cliente_id - El ID del cliente.
     * @returns {Promise<Array>} Lista de reservas del cliente con detalles de la instalación.
     */
    async obtenerReservasUsuario(cliente_id) {
        const reservasUsuario = await Reserva.findAll({
            where: { cliente_id },
            include: [{
                model: Instalacion,
                attributes: ['instalacion_id', 'nombre', 'estado', 'precio_hora']
            }],
            order: [
                ['fecha', 'DESC'],
                ['hora_inicio', 'ASC']
            ]
        });

        return reservasUsuario.map(reserva => ({
            reserva_id: reserva.reserva_id,
            fecha: reserva.fecha,
            hora_inicio: reserva.hora_inicio,
            hora_fin: reserva.hora_fin,
            estado: reserva.estado,
            instalacion: {
                id: reserva.Instalacion.instalacion_id,
                nombre: reserva.Instalacion.nombre,
                precio_hora: reserva.Instalacion.precio_hora
            }
        }));
    }
}

export default ControladorInstalaciones;
