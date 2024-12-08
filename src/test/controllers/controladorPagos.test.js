// controladorPagos.test.js
import { jest } from '@jest/globals';
import ControladorPagos from '../../controllers/pagos/controladorPagos.js';
import Pago from '../../models/pago.js';
import Reserva from '../../models/reserva.js';
import errors from "../../helpers/errorPagos.js";

// Mock de los modelos
Pago.findAll = jest.fn();
Pago.findByPk = jest.fn();

describe('ControladorPagos', () => {
    let controladorPagos;
    let pagosMock;
    
    const crearPagoMock = (metodo_pago = 'efectivo') => ({
        pago_id: 1,
        reserva_id: 1,
        monto: 50.00,
        metodo_pago,
        fecha_pago: new Date(),
        Reserva: {
            reserva_id: 1,
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
        // Inicializar pagosMock
        pagosMock = [
            crearPagoMock('efectivo'),
            crearPagoMock('tarjeta')
        ];
    });

    describe('actualizarMetodoPago', () => {
        it('debe actualizar el método de pago correctamente', async () => {
            const pagoMock = crearPagoMock('efectivo');
            const pagoActualizado = {
                ...pagoMock,
                metodo_pago: 'tarjeta',
                get: function() { return this; }
            };
            
            pagoMock.update.mockResolvedValue(pagoActualizado);
            Pago.findByPk.mockResolvedValue(pagoMock);

            const resultado = await controladorPagos.actualizarMetodoPago(1, 'tarjeta');

            expect(Pago.findByPk).toHaveBeenCalledWith(1, {
                include: [{
                    model: Reserva
                }]
            });
            expect(pagoMock.update).toHaveBeenCalledWith({ metodo_pago: 'tarjeta' });
            expect(resultado.metodo_pago).toBe('tarjeta');
        });

        it('debe manejar errores inesperados durante la actualización', async () => {
            const pagoMock = crearPagoMock('efectivo');
            Pago.findByPk.mockResolvedValue(pagoMock);
            
            const errorInesperado = new Error('Error inesperado de base de datos');
            pagoMock.update.mockRejectedValue(errorInesperado);
        
            await expect(controladorPagos.actualizarMetodoPago(1, 'tarjeta'))
                .rejects
                .toThrow('Error al actualizar el método de pago: Error inesperado de base de datos');
        });

        it('debe validar método de pago inválido', async () => {
            await expect(controladorPagos.actualizarMetodoPago(1, 'invalido'))
                .rejects
                .toThrow(errors.METODO_PAGO_INVALIDO);
        });

        it('debe lanzar error si el pago no existe', async () => {
            Pago.findByPk.mockResolvedValue(null);

            await expect(controladorPagos.actualizarMetodoPago(999, 'tarjeta'))
                .rejects
                .toThrow(errors.PAGO_NOT_FOUND);
        });
    });

    describe('obtenerTodosPagos', () => {
        it('debe retornar todos los pagos', async () => {
            Pago.findAll.mockResolvedValue(pagosMock);

            const pagos = await controladorPagos.obtenerTodosPagos();

            expect(Pago.findAll).toHaveBeenCalledWith({
                include: [{
                    model: Reserva
                }]
            });
            expect(pagos).toEqual(pagosMock);
            expect(pagos).toHaveLength(2);
        });

        it('debe lanzar error si no hay pagos', async () => {
            Pago.findAll.mockResolvedValue(null);

            await expect(controladorPagos.obtenerTodosPagos())
                .rejects
                .toThrow(errors.PAGO_LIST_ERROR);
        });

        it('debe manejar error de base de datos', async () => {
            const errorDB = new Error('Error de conexión a base de datos');
            Pago.findAll.mockRejectedValue(errorDB);

            await expect(controladorPagos.obtenerTodosPagos())
                .rejects
                .toThrow('Error al obtener los pagos: Error de conexión a base de datos');
        });
    });

    describe('obtenerPagoPorId', () => {
        it('debe retornar un pago cuando existe', async () => {
            const pagoMock = crearPagoMock();
            Pago.findByPk.mockResolvedValue(pagoMock);

            const pago = await controladorPagos.obtenerPagoPorId(1);

            expect(Pago.findByPk).toHaveBeenCalledWith(1, {
                include: [{
                    model: Reserva
                }]
            });
            expect(pago).toEqual(pagoMock);
        });

        it('debe lanzar error cuando el pago no existe', async () => {
            Pago.findByPk.mockResolvedValue(null);

            await expect(controladorPagos.obtenerPagoPorId(999))
                .rejects
                .toThrow(errors.PAGO_NOT_FOUND);
        });

        it('debe manejar error de base de datos', async () => {
            const errorDB = new Error('Error de conexión');
            Pago.findByPk.mockRejectedValue(errorDB);

            await expect(controladorPagos.obtenerPagoPorId(1))
                .rejects
                .toThrow('Error al obtener el pago: Error de conexión');
        });
    });

    describe('obtenerPagosUsuario', () => {
        it('debe retornar los pagos de un usuario', async () => {
            const pagoUsuario = crearPagoMock();
            Pago.findAll.mockResolvedValue([pagoUsuario]);

            const pagos = await controladorPagos.obtenerPagosUsuario(1);

            expect(Pago.findAll).toHaveBeenCalledWith({
                include: [{
                    model: Reserva,
                    where: { cliente_id: 1 },
                    attributes: ['reserva_id', 'fecha', 'hora_inicio', 'hora_fin', 'cliente_id']
                }],
                order: [['fecha_pago', 'DESC']]
            });
            expect(pagos).toEqual([pagoUsuario]);
            expect(pagos).toHaveLength(1);
        });

        it('debe retornar array vacío si el usuario no tiene pagos', async () => {
            Pago.findAll.mockResolvedValue([]);

            const pagos = await controladorPagos.obtenerPagosUsuario(1);

            expect(pagos).toEqual([]);
            expect(pagos).toHaveLength(0);
        });

        it('debe manejar error de base de datos', async () => {
            const errorDB = new Error('Error de conexión');
            Pago.findAll.mockRejectedValue(errorDB);

            await expect(controladorPagos.obtenerPagosUsuario(1))
                .rejects
                .toThrow('Error al obtener los pagos del usuario: Error de conexión');
        });
    });
});