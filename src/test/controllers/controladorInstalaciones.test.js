// controladorInstalaciones.test.js
import { jest } from '@jest/globals';
import ControladorInstalaciones from '../../controllers/instalaciones/controladorInstalaciones.js';
import Instalacion from '../../models/instalacion.js';
import Reserva from '../../models/reserva.js';
import Pago from '../../models/pago.js';
import errors from '../../helpers/errorInstalaciones.js';

// Mock de los modelos
Instalacion.findByPk = jest.fn();
Instalacion.findAll = jest.fn();
Instalacion.create = jest.fn();
Instalacion.update = jest.fn();

Reserva.findOne = jest.fn();
Reserva.findAll = jest.fn();
Reserva.create = jest.fn();

Pago.create = jest.fn();

describe('ControladorInstalaciones', () => {
    let controlador;
    let instalacionesMock;

    beforeEach(() => {
        jest.clearAllMocks();
        controlador = new ControladorInstalaciones();
        
        instalacionesMock = [
            {
                instalacion_id: 1,
                nombre: 'Piscina',
                precio_hora: 15.00,
                estado: 'disponible',
                capacidad: 50,
                get: function() { return this; },
                toJSON: function() { return {...this}; }
            }
        ];
    });

    describe('obtenerTodasLasInstalaciones', () => {
        it('debe retornar todas las instalaciones', async () => {
            Instalacion.findAll.mockResolvedValue(instalacionesMock);

            const resultado = await controlador.obtenerTodasLasInstalaciones();
            
            expect(resultado).toEqual(instalacionesMock);
            expect(Instalacion.findAll).toHaveBeenCalled();
        });

        it('debe manejar error cuando no hay instalaciones', async () => {
            Instalacion.findAll.mockResolvedValue(null);

            await expect(controlador.obtenerTodasLasInstalaciones())
                .rejects
                .toThrow('Error al obtener la lista de instalaciones');
        });

        it('debe manejar error de base de datos', async () => {
            const error = new Error('Error de DB');
            Instalacion.findAll.mockRejectedValue(error);

            await expect(controlador.obtenerTodasLasInstalaciones())
                .rejects
                .toThrow(error);
        });
    });

    describe('actualizarInstalacion', () => {
        it('debe actualizar exitosamente una instalación', async () => {
            const instalacionActualizada = {
                instalacion_id: 1,
                nombre: 'Piscina',
                precio_hora: 20.00,
                estado: 'disponible',
                capacidad: 50,
                update: jest.fn().mockImplementation(async function(datos) {
                    Object.assign(this, datos);
                    return this;
                }),
                get: function() { return this; }
            };

            Instalacion.findByPk.mockResolvedValue(instalacionActualizada);

            const resultado = await controlador.actualizarInstalacion(1, { precio_hora: 20.00 });

            expect(instalacionActualizada.update).toHaveBeenCalledWith({ precio_hora: 20.00 });
            expect(resultado.precio_hora).toBe(20.00);
        });

        it('debe manejar error si la instalación no existe', async () => {
            Instalacion.findByPk.mockResolvedValue(null);

            await expect(controlador.actualizarInstalacion(999, { precio_hora: 20.00 }))
                .rejects
                .toThrow('Instalación no encontrada');
        });

        it('debe manejar error en la actualización', async () => {
            const instalacionMock = {
                ...instalacionesMock[0],
                update: jest.fn().mockRejectedValue(new Error('Error de actualización')),
                get: function() { return this; }
            };
            
            Instalacion.findByPk.mockResolvedValue(instalacionMock);

            await expect(controlador.actualizarInstalacion(1, { precio_hora: 20.00 }))
                .rejects
                .toThrow('Error de actualización');
        });

        it('debe ignorar campos no permitidos', async () => {
            const instalacionMock = {
                ...instalacionesMock[0],
                update: jest.fn().mockImplementation(async function(datos) {
                    Object.assign(this, datos);
                    return this;
                }),
                get: function() { return this; }
            };

            Instalacion.findByPk.mockResolvedValue(instalacionMock);

            const datosActualizacion = {
                precio_hora: 20.00,
                campo_invalido: 'valor'
            };

            await controlador.actualizarInstalacion(1, datosActualizacion);

            expect(instalacionMock.update).toHaveBeenCalledWith({ precio_hora: 20.00 });
            expect(instalacionMock.update).not.toHaveBeenCalledWith(
                expect.objectContaining({ campo_invalido: 'valor' })
            );
        });
    });

    describe('crearInstalacion', () => {
        it('debe crear una instalación exitosamente', async () => {
            const nuevaInstalacion = {
                nombre: 'Nueva Piscina',
                precio_hora: 25.00,
                estado: 'disponible',
                capacidad: 60
            };
    
            const instalacionCreada = {
                instalacion_id: 2,
                ...nuevaInstalacion,
                get: function() { return this; }
            };
    
            Instalacion.create.mockResolvedValue(instalacionCreada);
    
            const resultado = await controlador.crearInstalacion(nuevaInstalacion);
    
            // Verificar que se llama a create solo con los campos permitidos
            expect(Instalacion.create).toHaveBeenCalledWith({
                nombre: 'Nueva Piscina',
                precio_hora: 25.00,
                estado: 'disponible',
                capacidad: 60
            });
            expect(resultado).toEqual(instalacionCreada);
        });
    
        it('debe fallar si faltan datos requeridos', async () => {
            const datosIncompletos = {
                nombre: 'Piscina'
                // Falta precio_hora
            };
    
            await expect(controlador.crearInstalacion(datosIncompletos))
                .rejects
                .toThrow('Faltan datos necesarios para la instalación');
            
            expect(Instalacion.create).not.toHaveBeenCalled();
        });
    
        it('debe asignar estado por defecto si no se proporciona', async () => {
            const nuevaInstalacion = {
                nombre: 'Nueva Piscina',
                precio_hora: 25.00,
                capacidad: 60
            };
    
            const instalacionCreada = {
                instalacion_id: 2,
                ...nuevaInstalacion,
                estado: 'disponible',
                get: function() { return this; }
            };
    
            Instalacion.create.mockResolvedValue(instalacionCreada);
    
            const resultado = await controlador.crearInstalacion(nuevaInstalacion);
    
            expect(Instalacion.create).toHaveBeenCalledWith({
                nombre: 'Nueva Piscina',
                precio_hora: 25.00,
                estado: 'disponible',
                capacidad: 60
            });
            expect(resultado.estado).toBe('disponible');
        });
    
        it('debe manejar error en la creación', async () => {
            const nuevaInstalacion = {
                nombre: 'Nueva Piscina',
                precio_hora: 25.00,
                estado: 'disponible',
                capacidad: 60
            };
    
            const errorDB = new Error('Error de base de datos');
            Instalacion.create.mockRejectedValue(errorDB);
    
            await expect(controlador.crearInstalacion(nuevaInstalacion))
                .rejects
                .toThrow('Error de base de datos');
            
            expect(Instalacion.create).toHaveBeenCalledWith({
                nombre: 'Nueva Piscina',
                precio_hora: 25.00,
                estado: 'disponible',
                capacidad: 60
            });
        });
    });

    describe('obtenerInstalacionPorId', () => {
        it('debe encontrar una instalación por ID', async () => {
            Instalacion.findByPk.mockResolvedValue(instalacionesMock[0]);

            const resultado = await controlador.obtenerInstalacionPorId(1);

            expect(resultado).toEqual(instalacionesMock[0]);
            expect(Instalacion.findByPk).toHaveBeenCalledWith(1);
        });

        it('debe manejar error cuando la instalación no existe', async () => {
            Instalacion.findByPk.mockResolvedValue(null);

            await expect(controlador.obtenerInstalacionPorId(999))
                .rejects
                .toThrow('Instalación no encontrada');
        });

        it('debe manejar error de base de datos', async () => {
            const error = new Error('Error de DB');
            Instalacion.findByPk.mockRejectedValue(error);

            await expect(controlador.obtenerInstalacionPorId(1))
                .rejects
                .toThrow(error);
        });
    });

    describe('eliminarInstalacion', () => {
        it('debe eliminar una instalación exitosamente', async () => {
            const instalacionAEliminar = {
                ...instalacionesMock[0],
                destroy: jest.fn().mockResolvedValue(true)
            };

            Instalacion.findByPk.mockResolvedValue(instalacionAEliminar);

            const resultado = await controlador.eliminarInstalacion(1);

            expect(instalacionAEliminar.destroy).toHaveBeenCalled();
            expect(resultado).toEqual(instalacionAEliminar);
        });

        it('debe manejar error si la instalación no existe', async () => {
            Instalacion.findByPk.mockResolvedValue(null);

            await expect(controlador.eliminarInstalacion(999))
                .rejects
                .toThrow('Instalación no encontrada');
        });

        it('debe manejar error en la eliminación', async () => {
            const instalacionMock = {
                ...instalacionesMock[0],
                destroy: jest.fn().mockRejectedValue(new Error('Error al eliminar'))
            };

            Instalacion.findByPk.mockResolvedValue(instalacionMock);

            await expect(controlador.eliminarInstalacion(1))
                .rejects
                .toThrow('Error al eliminar');
        });
    });

    describe('verificarDisponibilidad', () => {
        it('debe permitir reserva si la instalación está disponible', async () => {
            Reserva.findOne.mockResolvedValue(null);

            await expect(controlador.verificarDisponibilidad(1, '2024-01-01', '10:00'))
                .resolves
                .not
                .toThrow();
        });

        it('debe rechazar si la instalación ya está reservada', async () => {
            const reservaExistente = {
                reserva_id: 1,
                instalacion_id: 1,
                fecha: '2024-01-01',
                hora_inicio: '10:00'
            };

            Reserva.findOne.mockResolvedValue(reservaExistente);

            await expect(controlador.verificarDisponibilidad(1, '2024-01-01', '10:00'))
                .rejects
                .toThrow('La instalación ya está reservada para esa fecha y hora');
        });

        it('debe manejar error en la verificación', async () => {
            const error = new Error('Error al verificar disponibilidad');
            Reserva.findOne.mockRejectedValue(error);

            await expect(controlador.verificarDisponibilidad(1, '2024-01-01', '10:00'))
                .rejects
                .toThrow(error);
        });
    });

    describe('obtenerInstalacionesConReservas', () => {
        it('debe retornar instalaciones con sus reservas', async () => {
            Instalacion.findAll.mockResolvedValue(instalacionesMock);
            Reserva.findAll.mockResolvedValue([{
                fecha: '2024-01-01',
                hora_inicio: '10:00',
                hora_fin: '11:00',
                cliente_id: 1
            }]);

            const resultado = await controlador.obtenerInstalacionesConReservas();

            expect(resultado[0].estado).toBe('reservada');
            expect(Array.isArray(resultado[0].reservas)).toBe(true);
            expect(resultado[0].reservas.length).toBe(1);
        });

        it('debe marcar instalaciones sin reservas como disponibles', async () => {
            Instalacion.findAll.mockResolvedValue(instalacionesMock);
            Reserva.findAll.mockResolvedValue([]);

            const resultado = await controlador.obtenerInstalacionesConReservas();

            expect(resultado[0].estado).toBe('disponible');
            expect(resultado[0].reservas).toEqual([]);
        });

        it('debe manejar error al obtener instalaciones con reservas', async () => {
            const error = new Error('Error al obtener reservas');
            Instalacion.findAll.mockRejectedValue(error);

            await expect(controlador.obtenerInstalacionesConReservas())
                .rejects
                .toThrow('Error al obtener instalaciones con reservas: Error al obtener reservas');
        });
    });

    describe('obtenerReservasUsuario', () => {
        it('debe retornar las reservas de un usuario', async () => {
            const reservasUsuario = [{
                reserva_id: 1,
                fecha: '2024-01-01',
                hora_inicio: '10:00',
                hora_fin: '11:00',
                estado: 'confirmada',
                Instalacion: instalacionesMock[0]
            }];

            Reserva.findAll.mockResolvedValue(reservasUsuario);

            const resultado = await controlador.obtenerReservasUsuario(1);

            expect(resultado).toHaveLength(1);
            expect(resultado[0].reserva_id).toBe(1);
            expect(resultado[0].instalacion).toBeDefined();
        });

        it('debe retornar array vacío si no hay reservas', async () => {
            Reserva.findAll.mockResolvedValue([]);

            const resultado = await controlador.obtenerReservasUsuario(1);

            expect(resultado).toEqual([]);
        });

        it('debe manejar error en la consulta de reservas', async () => {
            const errorDB = new Error('Error al consultar reservas');
            Reserva.findAll.mockRejectedValue(errorDB);

            await expect(controlador.obtenerReservasUsuario(1))
                .rejects
                .toThrow('Error al consultar reservas');
            });
        });
    
        describe('crearReserva', () => {
            const datosReserva = {
                cliente_id: 1,
                instalacion_id: 1,
                deporte_id: 1,
                fecha: '2024-01-01',
                hora_inicio: '10:00',
                hora_fin: '11:00'
            };
    
            it('debe crear una reserva exitosamente', async () => {
                const instalacion = {
                    ...instalacionesMock[0],
                    update: jest.fn().mockResolvedValue(true)
                };
    
                const nuevaReserva = {
                    reserva_id: 1,
                    ...datosReserva,
                    estado: 'confirmada'
                };
    
                Instalacion.findByPk.mockResolvedValue(instalacion);
                Reserva.findOne.mockResolvedValue(null);
                Reserva.create.mockResolvedValue(nuevaReserva);
                Pago.create.mockResolvedValue({
                    pago_id: 1,
                    reserva_id: 1,
                    monto: 15.00,
                    estado: 'COMPLETADO'
                });
    
                const resultado = await controlador.crearReserva(datosReserva);
    
                expect(resultado).toEqual(nuevaReserva);
                expect(instalacion.update).toHaveBeenCalledWith({ estado: 'reservada' });
                expect(Pago.create).toHaveBeenCalled();
            });
    
            it('debe validar campos requeridos', async () => {
                const datosIncompletos = {
                    cliente_id: 1,
                    instalacion_id: 1
                    // Faltan campos
                };
    
                await expect(controlador.crearReserva(datosIncompletos))
                    .rejects
                    .toThrow(/Faltan campos requeridos/);
    
                expect(Reserva.create).not.toHaveBeenCalled();
            });
    
            it('debe validar que la instalación exista', async () => {
                Instalacion.findByPk.mockResolvedValue(null);
    
                await expect(controlador.crearReserva(datosReserva))
                    .rejects
                    .toThrow('Instalación no encontrada');
    
                expect(Reserva.create).not.toHaveBeenCalled();
            });
    
            it('debe validar disponibilidad horaria', async () => {
                const instalacion = {
                    ...instalacionesMock[0],
                    update: jest.fn()
                };
    
                Instalacion.findByPk.mockResolvedValue(instalacion);
                Reserva.findOne.mockResolvedValue({
                    reserva_id: 2,
                    fecha: datosReserva.fecha,
                    hora_inicio: datosReserva.hora_inicio
                });
    
                await expect(controlador.crearReserva(datosReserva))
                    .rejects
                    .toThrow('La instalación ya está reservada para esa fecha y hora');
    
                expect(Reserva.create).not.toHaveBeenCalled();
                expect(Pago.create).not.toHaveBeenCalled();
            });
    
            it('debe manejar error en la creación de la reserva', async () => {
                const instalacion = {
                    ...instalacionesMock[0],
                    update: jest.fn()
                };
    
                Instalacion.findByPk.mockResolvedValue(instalacion);
                Reserva.findOne.mockResolvedValue(null);
                
                const errorDB = new Error('Error al crear la reserva');
                Reserva.create.mockRejectedValue(errorDB);
    
                await expect(controlador.crearReserva(datosReserva))
                    .rejects
                    .toThrow(errorDB);
    
                expect(Pago.create).not.toHaveBeenCalled();
                expect(instalacion.update).not.toHaveBeenCalled();
            });
    
            it('debe manejar error en la creación del pago', async () => {
                const instalacion = {
                    ...instalacionesMock[0],
                    update: jest.fn()
                };
    
                const nuevaReserva = {
                    reserva_id: 1,
                    ...datosReserva,
                    estado: 'confirmada'
                };
    
                Instalacion.findByPk.mockResolvedValue(instalacion);
                Reserva.findOne.mockResolvedValue(null);
                Reserva.create.mockResolvedValue(nuevaReserva);
                
                const errorDB = new Error('Error al crear el pago');
                Pago.create.mockRejectedValue(errorDB);
    
                await expect(controlador.crearReserva(datosReserva))
                    .rejects
                    .toThrow(errorDB);
    
                expect(instalacion.update).not.toHaveBeenCalled();
            });
        });
    });