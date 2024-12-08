// controladorInstalaciones.js
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
            if (error instanceof errors.INSTALACION_LIST_ERROR) {
                throw error;
            }
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
        try {
            const instalacion = await Instalacion.findByPk(instalacion_id);
            if (!instalacion) throw new errors.INSTALACION_NOT_FOUND();
            return instalacion;
        } catch (error) {
            if (error instanceof errors.INSTALACION_NOT_FOUND) {
                throw error;
            }
            throw error;
        }
    }

    /**
     * Crea una nueva instalación.
     * @param {Object} datosInstalacion - Los datos de la nueva instalación.
     * @returns {Promise<Object>} La instalación creada.
     * @throws {Error} Si faltan datos o hay un error en la creación.
     */
    async crearInstalacion(datosInstalacion) {
        try {
            // Solo permitir los campos válidos
            const camposPermitidos = ['nombre', 'precio_hora', 'estado', 'capacidad'];
            const datosValidos = {};
            
            // Filtrar solo los campos permitidos
            camposPermitidos.forEach(campo => {
                if (datosInstalacion[campo] !== undefined) {
                    datosValidos[campo] = datosInstalacion[campo];
                }
            });

            // Validar campos requeridos
            if (!datosValidos.nombre || !datosValidos.precio_hora) {
                throw new errors.DATOS_INSTALACION_INVALIDOS();
            }

            // Asegurarse de que estado tenga un valor válido
            if (!datosValidos.estado) {
                datosValidos.estado = 'disponible';
            }

            return await Instalacion.create(datosValidos);
        } catch (error) {
            if (error instanceof errors.DATOS_INSTALACION_INVALIDOS) {
                throw error;
            }
            throw new Error('Error de base de datos');
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
        try {
            const instalacion = await this.obtenerInstalacionPorId(instalacion_id);
            
            // Filtrar campos permitidos
            const camposPermitidos = ['nombre', 'precio_hora', 'estado', 'capacidad'];
            const datosValidos = {};
            
            camposPermitidos.forEach(campo => {
                if (datosActualizacion[campo] !== undefined) {
                    datosValidos[campo] = datosActualizacion[campo];
                }
            });

            await instalacion.update(datosValidos);
            return instalacion;
        } catch (error) {
            if (error instanceof errors.INSTALACION_NOT_FOUND) {
                throw error;
            }
            throw error;
        }
    }

    /**
     * Elimina una instalación.
     * @param {number} instalacion_id - El ID de la instalación a eliminar.
     * @returns {Promise<Object>} La instalación eliminada.
     * @throws {Error} Si no se encuentra la instalación.
     */
    async eliminarInstalacion(instalacion_id) {
        try {
            const instalacion = await this.obtenerInstalacionPorId(instalacion_id);
            await instalacion.destroy();
            return instalacion;
        } catch (error) {
            if (error instanceof errors.INSTALACION_NOT_FOUND) {
                throw error;
            }
            throw error;
        }
    }

    /**
     * Verifica si una instalación está reservada en una fecha y hora específicas.
     * @param {number} instalacion_id - El ID de la instalación.
     * @param {string} fecha - La fecha de la reserva.
     * @param {string} hora_inicio - La hora de inicio de la reserva.
     * @throws {Error} Si la instalación ya está reservada.
     */
    async verificarDisponibilidad(instalacion_id, fecha, hora_inicio) {
        try {
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
        } catch (error) {
            throw error;
        }
    }

    /**
     * Obtiene todas las instalaciones con información sobre sus reservas.
     * @returns {Promise<Array>} Lista de instalaciones con su estado y reservas.
     */
    async obtenerInstalacionesConReservas() {
        try {
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
        } catch (error) {
            throw new Error(`Error al obtener instalaciones con reservas: ${error.message}`);
        }
    }

    /**
     * Crea una nueva reserva.
     * @param {Object} datosReserva - Datos de la reserva.
     * @returns {Promise<Object>} La reserva creada.
     * @throws {Error} Si hay error en la creación.
     */
    async crearReserva(datosReserva) {
        try {
            const { cliente_id, instalacion_id, deporte_id, fecha, hora_inicio, hora_fin } = datosReserva;

            // Validar campos requeridos
            const camposRequeridos = ['cliente_id', 'instalacion_id', 'deporte_id', 'fecha', 'hora_inicio', 'hora_fin'];
            const camposFaltantes = camposRequeridos.filter(campo => !datosReserva[campo]);
            
            if (camposFaltantes.length > 0) {
                throw new errors.DATOS_RESERVA_INVALIDOS(`Faltan campos requeridos: ${camposFaltantes.join(', ')}`);
            }

            // Verificar instalación y disponibilidad
            const instalacion = await this.obtenerInstalacionPorId(instalacion_id);
            await this.verificarDisponibilidad(instalacion_id, fecha, hora_inicio);

            // Crear la reserva
            const nuevaReserva = await Reserva.create({
                cliente_id,
                instalacion_id,
                deporte_id,
                fecha,
                hora_inicio,
                hora_fin,
                estado: 'confirmada'
            }).catch(error => {
                throw new errors.RESERVA_ERROR();
            });

            try {
                // Crear el pago asociado
                await Pago.create({
                    reserva_id: nuevaReserva.reserva_id,
                    monto: instalacion.precio_hora,
                    metodo_pago: 'efectivo',
                    fecha_pago: new Date(),
                    estado: 'COMPLETADO'
                });

                // Actualizar estado de la instalación
                await instalacion.update({ estado: 'reservada' });

                return nuevaReserva;
            } catch (error) {
                // Si falla el pago o la actualización, propagar el error original
                throw error;
            }
        } catch (error) {
            if (error instanceof errors.INSTALACION_NOT_FOUND || 
                error instanceof errors.INSTALACION_YA_RESERVADA ||
                error instanceof errors.DATOS_RESERVA_INVALIDOS ||
                error instanceof errors.RESERVA_ERROR) {
                throw error;
            }
            // Si es un error no manejado, propagarlo tal cual
            throw error;
        }
    }

    /**
     * Obtiene todas las reservas de un usuario.
     * @param {number} cliente_id - El ID del cliente.
     * @returns {Promise<Array>} Lista de reservas del cliente.
     */
    async obtenerReservasUsuario(cliente_id) {
        try {
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
        } catch (error) {
            throw new Error('Error al consultar reservas');
        }
    }
}

export default ControladorInstalaciones;