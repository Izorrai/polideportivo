// controladorPagos.test.js
import { jest } from '@jest/globals';
import ControladorPagos from '../../controllers/pagos/controladorPagos.js';
import Pago from '../../models/pago.js';
import Reserva from '../../models/reserva.js';

// Mock de los modelos
Pago.findAll = jest.fn();
Pago.findByPk = jest.fn();

describe('ControladorPagos', () => {
    let controladorPagos;
    
    const crearPagoMock = (metodo_pago = 'efectivo') => ({
        pago_id: 1,
        reserva_id: 1,
        monto: 50.00,
        metodo_pago,
        fecha_pago: new Date(),
        Reserva: {
            fecha: new Date(),
            hora_inicio: '10:00',
            hora_fin: '11:00',
            cliente_id: 1
        },
        get: function() { return this; },
        update: jest.fn()
    });

    beforeEach(() => {
        jest.clearAllMocks();
        controladorPagos = new ControladorPagos();
    });

    describe('actualizarMetodoPago', () => {
        it('debe actualizar el método de pago correctamente', async () => {
            // Crear el mock del pago con el método update
            const pagoMock = crearPagoMock('efectivo');
            
            // El método update devolverá un nuevo objeto con el método de pago actualizado
            const pagoActualizado = {
                ...pagoMock,
                metodo_pago: 'tarjeta',
                get: function() { return this; }
            };
            
            // Configurar el comportamiento del mock
            pagoMock.update.mockResolvedValue(pagoActualizado);
            Pago.findByPk.mockResolvedValue(pagoMock);

            // Ejecutar el método
            const resultado = await controladorPagos.actualizarMetodoPago(1, 'tarjeta');

            // Verificaciones
            expect(Pago.findByPk).toHaveBeenCalledWith(1, {
                include: [{
                    model: Reserva
                }]
            });
            expect(pagoMock.update).toHaveBeenCalledWith({ metodo_pago: 'tarjeta' });
            expect(resultado.metodo_pago).toBe('tarjeta');
        });

        it('debe validar método de pago inválido', async () => {
            await expect(controladorPagos.actualizarMetodoPago(1, 'invalido'))
                .rejects
                .toThrow('Método de pago inválido');
        });

        it('debe lanzar error si el pago no existe', async () => {
            Pago.findByPk.mockResolvedValue(null);
            await expect(controladorPagos.actualizarMetodoPago(999, 'tarjeta'))
                .rejects
                .toThrow('Pago no encontrado');
        });
    });

    describe('obtenerTodosPagos', () => {
        it('debe retornar todos los pagos', async () => {
            const pagosMock = [crearPagoMock(), crearPagoMock()];
            Pago.findAll.mockResolvedValue(pagosMock);

            const pagos = await controladorPagos.obtenerTodosPagos();

            expect(Pago.findAll).toHaveBeenCalledWith({
                include: [{
                    model: Reserva
                }]
            });
            expect(pagos).toHaveLength(2);
        });

        it('debe lanzar error si no hay pagos', async () => {
            Pago.findAll.mockResolvedValue(null);
            await expect(controladorPagos.obtenerTodosPagos())
                .rejects
                .toThrow('Error al obtener la lista de pagos');
        });
    });

    describe('obtenerPagoPorId', () => {
        it('debe retornar un pago cuando existe', async () => {
            Pago.findByPk.mockResolvedValue(pagosMock[0]);

            const pago = await controladorPagos.obtenerPagoPorId(1);

            expect(pago).toEqual(pagosMock[0]);
        });

        it('debe lanzar error cuando el pago no existe', async () => {
            Pago.findByPk.mockResolvedValue(null);

            await expect(controladorPagos.obtenerPagoPorId(999))
                .rejects
                .toThrow('Pago no encontrado');
        });
    });

    describe('obtenerPagosUsuario', () => {
        it('debe retornar los pagos de un usuario', async () => {
            Pago.findAll.mockResolvedValue([pagosMock[0]]);

            const pagos = await controladorPagos.obtenerPagosUsuario(1);

            expect(Pago.findAll).toHaveBeenCalledWith({
                include: [{
                    model: Reserva,
                    where: { cliente_id: 1 },
                    attributes: ['reserva_id', 'fecha', 'hora_inicio', 'hora_fin', 'cliente_id']
                }],
                order: [['fecha_pago', 'DESC']]
            });
            expect(pagos).toHaveLength(1);
        });
    });
});