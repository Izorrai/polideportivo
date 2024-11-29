import Pago from "../../models/pago.js";


async function obtenerPagos(req, res) {
    try {
        const pagos = await Pago.findAll();
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

export const functions = {
    obtenerPagos
};

export default functions;