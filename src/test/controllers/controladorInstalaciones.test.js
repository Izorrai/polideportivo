// controladorInstalaciones.test.js
import { jest } from '@jest/globals';
import ControladorInstalaciones from '../../controllers/instalaciones/controladorInstalaciones.js';
import Instalacion from '../../models/instalacion.js';

// Mock de los métodos del modelo
Instalacion.findByPk = jest.fn();
Instalacion.findAll = jest.fn();
Instalacion.create = jest.fn();
Instalacion.update = jest.fn();

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
                descripcion: 'Piscina olímpica',
                capacidad: 50,
                get: function() { return this; }
            }
        ];
    });

    describe('actualizarInstalacion', () => {
        it('debe actualizar exitosamente una instalación', async () => {
            const instalacionActualizada = {
                instalacion_id: 1,
                nombre: 'Piscina',
                precio_hora: 20.00,
                estado: 'disponible',
                descripcion: 'Piscina olímpica',
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
    });

    describe('crearInstalacion', () => {
        it('debe crear una instalación exitosamente', async () => {
            const nuevaInstalacion = {
                nombre: 'Nueva Piscina',
                precio_hora: 25.00,
                estado: 'disponible',
                descripcion: 'Piscina nueva',
                capacidad: 60
            };

            const instalacionCreada = {
                instalacion_id: 2,
                ...nuevaInstalacion,
                get: function() { return this; }
            };

            Instalacion.create.mockResolvedValue(instalacionCreada);

            const resultado = await controlador.crearInstalacion(nuevaInstalacion);

            expect(Instalacion.create).toHaveBeenCalledWith(nuevaInstalacion);
            expect(resultado).toEqual(instalacionCreada);
        });

        it('debe fallar si faltan datos requeridos', async () => {
            const datosIncompletos = {
                nombre: 'Piscina'
            };

            await expect(controlador.crearInstalacion(datosIncompletos))
                .rejects
                .toThrow('Faltan datos necesarios para la instalación');
            
            expect(Instalacion.create).not.toHaveBeenCalled();
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
    });
});