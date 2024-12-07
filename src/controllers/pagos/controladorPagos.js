// controladorPagos.js

/**
 * Clase que maneja las operaciones relacionadas con los pagos.
 */
class ControladorPagos {

    /**
     * Obtiene todos los pagos.
     * @returns {Promise<Array>} Una promesa que resuelve una lista de pagos con sus reservas asociadas.
     * @throws {Error} Si ocurre un error al obtener los pagos.
     */
    async obtenerTodosPagos() {
        try {
            const pagos = await Pago.findAll({
                include: [{
                    model: Reserva
                }]
            });
            if (!pagos) throw new errors.PAGO_LIST_ERROR();
            return pagos;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Obtiene un pago específico por su ID.
     * @param {number} pago_id - El ID del pago que se desea obtener.
     * @returns {Promise<Object>} El pago con el ID proporcionado, incluyendo su reserva asociada.
     * @throws {Error} Si no se encuentra el pago o si ocurre otro error.
     */
    async obtenerPagoPorId(pago_id) {
        const pago = await Pago.findByPk(pago_id, {
            include: [{
                model: Reserva
            }]
        });
        if (!pago) throw new errors.PAGO_NOT_FOUND();
        return pago;
    }

    /**
     * Obtiene todos los pagos realizados por un cliente.
     * @param {number} cliente_id - El ID del cliente cuyos pagos se desean obtener.
     * @returns {Promise<Array>} Una promesa que resuelve una lista de pagos del cliente, con las reservas asociadas.
     * @throws {Error} Si ocurre un error al obtener los pagos.
     */
    async obtenerPagosUsuario(cliente_id) {
        const pagos = await Pago.findAll({
            include: [{
                model: Reserva,
                where: { cliente_id },
                attributes: ['reserva_id', 'fecha', 'hora_inicio', 'hora_fin', 'cliente_id']
            }],
            order: [['fecha_pago', 'DESC']]
        });
        return pagos;
    }

    /**
     * Actualiza el método de pago de un pago existente.
     * @param {number} pago_id - El ID del pago a actualizar.
     * @param {string} metodo_pago - El nuevo método de pago. Debe ser uno de: 'efectivo', 'tarjeta', 'transferencia'.
     * @returns {Promise<Object>} El pago actualizado.
     * @throws {Error} Si el método de pago no es válido o si ocurre un error al actualizar el pago.
     */
    async actualizarMetodoPago(pago_id, metodo_pago) {
        // Verificar si el método de pago es válido
        if (!['efectivo', 'tarjeta', 'transferencia'].includes(metodo_pago)) {
            throw new errors.METODO_PAGO_INVALIDO();
        }

        // Obtener el pago por su ID
        const pago = await this.obtenerPagoPorId(pago_id);
        
        // Actualizar el método de pago
        const pagoActualizado = await pago.update({ metodo_pago });
        
        return pagoActualizado;  // Asegurarnos de devolver el pago actualizado
    }
}

export default ControladorPagos;
