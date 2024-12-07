// controladorInstalaciones.test.js
import { jest } from '@jest/globals';
import ControladorInstalaciones from '../../controllers/instalaciones/controladorInstalaciones.js';
import Instalacion from '../../models/instalacion.js';
import Reserva from '../../models/reserva.js';
import Pago from '../../models/pago.js';

// Mock de los modelos
Instalacion.findAll = jest.fn();
Instalacion.findByPk = jest.fn();
Instalacion.create = jest.fn();
Instalacion.update = jest.fn();
Reserva.findOne = jest.fn();
Reserva.findAll = jest.fn();
Reserva.create = jest.fn();
Pago.create = jest.fn();

describe('ControladorInstalaciones', () => {
    let controlador;
    
    const mockInstalacion = {
        instalacion_id: 1,
        nombre: 'Piscina',
        precio_hora: 15.00,
        estado: 'disponible',
        descripcion: 'Piscina olímpica',
        capacidad: 50,
        update: jest.fn().mockImplementation(function(datos) {
            Object.assign(this, datos);
            return this;
        }),
        get: function() { return this; },
        toJSON: function() { return this; }
    };

    beforeEach(() => {
        jest.clearAllMocks();
        controlador = new ControladorInstalaciones();
    });

    describe('obtenerTodasLasInstalaciones', () => {
        it('debe retornar todas las instalaciones', async () => {
            const instalacionesMock = [mockInstalacion];
            Instalacion.findAll.mockResolvedValue(instalacionesMock);

            const result = await controlador.obtenerTodasLasInstalaciones();
            
            expect(Instalacion.findAll).toHaveBeenCalled();
            expect(result).toEqual(instalacionesMock);
        });

        it('debe lanzar error si no hay instalaciones', async () => {
            Instalacion.findAll.mockResolvedValue(null);

            await expect(controlador.obtenerTodasLasInstalaciones())
                .rejects
                .toThrow('Error al obtener la lista de instalaciones');
        });

        it('debe manejar errores de base de datos', async () => {
            Instalacion.findAll.mockRejectedValue(new Error('Error DB'));

            await expect(controlador.obtenerTodasLasInstalaciones())
                .rejects
                .toThrow('Error DB');
        });
    });

    describe('obtenerInstalacionesConReservas', () => {
        it('debe retornar instalaciones con sus reservas', async () => {
            const reservasMock = [{
                fecha: '2024-01-15',
                hora_inicio: '10:00',
                hora_fin: '11:00',
                cliente_id: 1
            }];

            Instalacion.findAll.mockResolvedValue([mockInstalacion]);
            Reserva.findAll.mockResolvedValue(reservasMock);

            const result = await controlador.obtenerInstalacionesConReservas();

            expect(result[0].estado).toBe('reservada');
            expect(result[0].reservas).toEqual(reservasMock);
        });

        it('debe manejar instalaciones sin reservas', async () => {
            Instalacion.findAll.mockResolvedValue([mockInstalacion]);
            Reserva.findAll.mockResolvedValue([]);

            const result = await controlador.obtenerInstalacionesConReservas();

            expect(result[0].estado).toBe('disponible');
            expect(result[0].reservas).toHaveLength(0);
        });
    });

    describe('crearReserva', () => {
        const datosReserva = {
            cliente_id: 1,
            instalacion_id: 1,
            deporte_id: 1,
            fecha: '2024-01-15',
            hora_inicio: '10:00',
            hora_fin: '11:00'
        };

        it('debe crear una reserva exitosamente', async () => {
            const reservaCreada = {
                reserva_id: 1,
                ...datosReserva,
                estado: 'confirmada'
            };

            Instalacion.findByPk.mockResolvedValue(mockInstalacion);
            Reserva.findOne.mockResolvedValue(null);
            Reserva.create.mockResolvedValue(reservaCreada);
            Pago.create.mockResolvedValue({ pago_id: 1 });

            const result = await controlador.crearReserva(datosReserva);

            expect(Reserva.create).toHaveBeenCalledWith({
                ...datosReserva,
                estado: 'confirmada'
            });
            expect(Pago.create).toHaveBeenCalled();
            expect(result).toEqual(reservaCreada);
        });

        it('debe validar instalación existente', async () => {
            Instalacion.findByPk.mockResolvedValue(null);

            await expect(controlador.crearReserva(datosReserva))
                .rejects
                .toThrow('Instalación no encontrada');
        });

        it('debe validar disponibilidad horaria', async () => {
            Instalacion.findByPk.mockResolvedValue(mockInstalacion);
            Reserva.findOne.mockResolvedValue({ reserva_id: 999 });

            await expect(controlador.crearReserva(datosReserva))
                .rejects
                .toThrow('Ya existe una reserva para esta hora');
        });
    });

    describe('obtenerReservasUsuario', () => {
        it('debe obtener las reservas de un usuario', async () => {
            const reservasMock = [{
                reserva_id: 1,
                fecha: '2024-01-15',
                hora_inicio: '10:00',
                hora_fin: '11:00',
                Instalacion: mockInstalacion
            }];

            Reserva.findAll.mockResolvedValue(reservasMock);

            const result = await controlador.obtenerReservasUsuario(1);

            expect(Reserva.findAll).toHaveBeenCalledWith(expect.objectContaining({
                where: { cliente_id: 1 }
            }));
            expect(result).toHaveLength(1);
            expect(result[0]).toHaveProperty('fecha', '2024-01-15');
        });

        it('debe retornar array vacío si no hay reservas', async () => {
            Reserva.findAll.mockResolvedValue([]);

            const result = await controlador.obtenerReservasUsuario(1);

            expect(result).toHaveLength(0);
        });
    });

    describe('eliminarInstalacion', () => {
        it('debe eliminar una instalación existente', async () => {
            const instalacionMock = {
                ...mockInstalacion,
                destroy: jest.fn().mockResolvedValue(undefined)
            };
            
            Instalacion.findByPk.mockResolvedValue(instalacionMock);

            await controlador.eliminarInstalacion(1);

            expect(instalacionMock.destroy).toHaveBeenCalled();
        });

        it('debe manejar error si la instalación no existe', async () => {
            Instalacion.findByPk.mockResolvedValue(null);

            await expect(controlador.eliminarInstalacion(999))
                .rejects
                .toThrow('Instalación no encontrada');
        });
    });
});