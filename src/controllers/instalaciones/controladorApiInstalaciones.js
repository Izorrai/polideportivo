import ControladorInstalaciones from './controladorInstalaciones.js';
import Reserva from '../../models/reserva.js';
import Pago from '../../models/pago.js';
import Instalacion from '../../models/instalacion.js';

// GET - Obtener todas las instalaciones
async function obtenerInstalaciones(req, res) {
    const controladorInstalaciones = new ControladorInstalaciones();
    try {
        const instalaciones = await controladorInstalaciones.TodasLasInstalaciones();
        res.status(200).json({
            status: 'success',
            data: instalaciones
        });
    } catch (error) {
        console.error('Error al obtener las instalaciones:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener las instalaciones',
            error: error.message
        });
    }
}


async function obtenerInstalacionesReservadas(req, res) {
    try {
       
        const instalaciones = await Instalacion.findAll();

        
        const instalacionesConReservas = await Promise.all(instalaciones.map(async (instalacion) => {
            
            const reservas = await Reserva.findAll({
                where: {
                    instalacion_id: instalacion.instalacion_id
                }
            });

            
            if (reservas.length > 0) {
                return {
                    ...instalacion.toJSON(),
                    estado: 'reservada',
                    reservas: reservas.map(reserva => ({
                        fecha: reserva.fecha,
                        hora_inicio: reserva.hora_inicio,
                        hora_fin: reserva.hora_fin,
                        cliente_id : reserva.cliente_id
                    }))
                };
            } else {
                
                return {
                    ...instalacion.toJSON(),
                    estado: 'disponible'
                };
            }
        }));

       
        res.status(200).json({
            status: 'success',
            data: instalacionesConReservas
        });

    } catch (error) {
        console.error('Error al obtener las instalaciones reservadas:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener las instalaciones reservadas',
            error: error.message
        });
    }
}


async function crearReserva(req, res) {
    try {
        const { cliente_id, instalacion_id, deporte_id, fecha, hora_inicio, hora_fin } = req.body;
        
        if (!cliente_id || !instalacion_id || !fecha || !hora_inicio || !hora_fin) {
            return res.status(400).json({
                success: false,
                message: 'Faltan campos requeridos',
                requestBody: req.body
            });
        }

        
        const instalacion = await Instalacion.findByPk(instalacion_id);
        if (!instalacion) {
            return res.status(404).json({
                success: false,
                message: 'Instalación no encontrada'
            });
        }

        const reservaExistente = await Reserva.findOne({
            where: {
                instalacion_id: instalacion_id,
                fecha: fecha,
                hora_inicio: hora_inicio
            }
        });

        if (reservaExistente) {
            return res.status(400).json({
                success: false,
                message: 'Ya existe una reserva para esta hora'
            });
        }

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
            metodo_pago: 'efectivo'
        });
        

        
        await Instalacion.update(
            { estado: 'reservada' },
            { where: { instalacion_id: nuevaReserva.instalacion_id } }
        );

        return res.status(201).json({
            success: true,
            data: nuevaReserva,
            message: 'Reserva y pago creados exitosamente'
            
        });

       
    } catch (error) {
        console.error('Error al crear la reserva:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al crear la reserva',
            error: error.message
        });
    }

}


async function obtenerInstalacionesReservadasPerfil(req, res) {
    try {
        const cliente_id = req.user.cliente_id;

        
        const reservasUsuario = await Reserva.findAll({
            where: {
                cliente_id: cliente_id
            },
            include: [{
                model: Instalacion,
                attributes: ['instalacion_id', 'nombre', 'estado', 'precio_hora']
            }],
            order: [
                ['fecha', 'DESC'],
                ['hora_inicio', 'ASC']
            ]
        });

        
        const reservasFormateadas = reservasUsuario.map(reserva => ({
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

        res.status(200).json({
            status: 'success',
            data: reservasFormateadas
        });

    } catch (error) {
        console.error('Error al obtener las reservas:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener tus reservas',
            error: error.message
        });
    }
}


async function crearReservaPerfil(req, res) {
    try {
        // Obtenemos el cliente_id del token
        const cliente_id = req.user.cliente_id;
        // Obtenemos el resto de datos del body
        const { instalacion_id, deporte_id, fecha, hora_inicio, hora_fin } = req.body;
        
        // Validamos los campos requeridos
        if (!instalacion_id || !fecha || !hora_inicio || !hora_fin) {
            return res.status(400).json({
                success: false,
                message: 'Faltan campos requeridos',
                requestBody: req.body
            });
        }

        // Verificamos que la instalación existe
        const instalacion = await Instalacion.findByPk(instalacion_id);
        if (!instalacion) {
            return res.status(404).json({
                success: false,
                message: 'Instalación no encontrada'
            });
        }

        // Verificamos si ya existe una reserva para esa hora
        const reservaExistente = await Reserva.findOne({
            where: {
                instalacion_id: instalacion_id,
                fecha: fecha,
                hora_inicio: hora_inicio
            }
        });

        if (reservaExistente) {
            return res.status(400).json({
                success: false,
                message: 'Ya existe una reserva para esta hora'
            });
        }

        
        const nuevaReserva = await Reserva.create({
            cliente_id, 
            instalacion_id,
            deporte_id,
            fecha,
            hora_inicio,
            hora_fin,
            estado: 'confirmada'
        });

        // Creamos el pago asociado
        const nuevoPago = await Pago.create({
            reserva_id: nuevaReserva.reserva_id,
            monto: instalacion.precio_hora, 
            metodo_pago: 'efectivo',
            fecha_pago: new Date(),
            estado: 'COMPLETADO'
        });

        // Actualizamos el estado de la instalación
        await Instalacion.update(
            { estado: 'reservada' },
            { where: { instalacion_id: nuevaReserva.instalacion_id } }
        );

        return res.status(201).json({
            success: true,
            data: {
                reserva: nuevaReserva,
                pago: nuevoPago
            },
            message: 'Reserva y pago creados exitosamente'
        });

    } catch (error) {
        console.error('Error al crear la reserva:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al crear la reserva',
            error: error.message
        });
    }
}

export const functions = {
    obtenerInstalaciones,
    obtenerInstalacionesReservadas,
    obtenerInstalacionesReservadasPerfil,
    crearReservaPerfil,
    crearReserva
};

export default functions;
