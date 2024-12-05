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

async function obtenerPagosPorId(req, res) {
    try {
        const pago = await Pago.findByPk(req.params.id);
        if (!pago) {
            return res.status(404).json({
                status: 'error',
                message: 'Pago no encontrado'
            });
        }
        res.status(200).json({
            status: 'success',
            data: pago
        });
    } catch (error) {
        console.error('Error al obtener el pago:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener el pago',
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
            order: [['fecha_pago', 'DESC']] 
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

async function actualizarPagos(req, res) {
    try {
        const { metodo_pago } = req.body;
        console.log('Body recibido:', req.body);
        console.log('Método de pago a actualizar:', metodo_pago);
        
        if (!metodo_pago) {
            return res.status(400).json({
                status: 'error',
                message: 'El método de pago es requerido'
            });
        }

        
        const pagoExistente = await Pago.findByPk(req.params.id);
        console.log('Pago antes de actualizar:', pagoExistente ? pagoExistente.toJSON() : null);

        if (!pagoExistente) {
            return res.status(404).json({
                status: 'error',
                message: 'Pago no encontrado'
            });
        }

        
        const [actualizados] = await Pago.update(
            { metodo_pago }, 
            { where: { pago_id: req.params.id } }
        );
        console.log('Número de registros actualizados:', actualizados);

        if (actualizados === 0) {
            return res.status(400).json({
                status: 'error',
                message: 'Ese metodo de pago ya existia'
            });
        }

        
        const pagoActualizado = await Pago.findByPk(req.params.id);
        console.log('Pago después de actualizar:', pagoActualizado ? pagoActualizado.toJSON() : null);

        res.status(200).json({
            status: 'success',
            message: 'Método de pago actualizado correctamente',
            data: pagoActualizado
        });
    } catch (error) {
        console.error('Error detallado:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error al actualizar el método de pago',
            error: error.message
        });
    }
}

export const functions = {
    obtenerPagos,
    obtenerPagosPerfil,
    obtenerPagosPorId,
    actualizarPagos,
};

export default functions;