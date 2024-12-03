import Pago from "../../models/pago.js";
import Reserva from "../../models/reserva.js";

async function obtenerPagos(req, res) {
    try {
        const pagos = await Pago.findAll({
            include: [{
                model: Reserva,
                
            }]
        });
        res.status(200).json({
            status: 'success',
            data: pagos
        });
    } catch (error) {
        console.error('Error al obtener los pagos:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener los pagos',
            error: error.message
        });
    }
}

async function obtenerPagosPerfil(req, res) {
    console.log('Datos del request en obtenerPagosPerfil:', {
        user: req.user,
        headers: req.headers
    });

    if (!req.user) {
        return res.status(401).json({
            status: 'error',
            message: 'Usuario no autenticado'
        });
    }

    if (!req.user.cliente_id) {
        return res.status(401).json({
            status: 'error',
            message: 'ID de cliente no encontrado en el token'
        });
    }

    try {
        const cliente_id = req.user.cliente_id;
        const pagos = await Pago.findAll({
            include: [{
                model: Reserva,
                
                where: {
                    cliente_id: cliente_id
                },
                attributes: ['reserva_id', 'fecha', 'hora_inicio', 'hora_fin', 'cliente_id']
            }],
            order: [['fecha_pago', 'DESC']] // Cambiado a fecha_pago que es el campo correcto
        });

        res.status(200).json({
            status: 'success',
            data: pagos
        });
    } catch (error) {
        console.error('Error al obtener los pagos:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener tus pagos',
            error: error.message
        });
    }
}

export const functions = {
    obtenerPagos,
    obtenerPagosPerfil
};

export default functions;