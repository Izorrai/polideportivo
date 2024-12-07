// controladorGastos.test.js
import { jest } from '@jest/globals';
import ControladorGastos from '../../controllers/gastos/controladorGastos.js';
import Gasto from '../../models/gasto.js';
import Instalacion from '../../models/instalacion.js';

// Mock de los modelos
Gasto.findAll = jest.fn();
Gasto.findByPk = jest.fn();
Gasto.create = jest.fn();
Gasto.update = jest.fn();
Instalacion.findByPk = jest.fn();
Instalacion.findAll = jest.fn();

describe('ControladorGastos', () => {
    let controlador;
    let gastoMock;

    beforeEach(() => {
        jest.clearAllMocks();
        controlador = new ControladorGastos();
        
        gastoMock = {
            gasto_id: 1,
            concepto: 'Limpieza',
            precio: 100.00,
            fecha: new Date('2024-01-15'),
            tipo: 'mantenimiento',
            instalacion_id: 1,
            descripcion: 'Limpieza mensual',
            Instalacion: {
                instalacion_id: 1,
                nombre: 'Piscina'
            },
            get: function() { return this; },
            update: jest.fn().mockImplementation(function(datos) {
                Object.assign(this, datos);
                return this;
            })
        };
    });

    describe('obtenerTodosGastos', () => {
        it('debe retornar todos los gastos con relaciones', async () => {
            const gastos = [gastoMock];
            Gasto.findAll.mockResolvedValue(gastos);

            const resultado = await controlador.obtenerTodosGastos();

            expect(Gasto.findAll).toHaveBeenCalledWith({
                include: [{
                    model: Instalacion,
                    attributes: ['instalacion_id', 'nombre']
                }],
                order: [['fecha', 'DESC']]
            });
            expect(resultado).toEqual(gastos);
        });

        it('debe manejar error de base de datos', async () => {
            Gasto.findAll.mockRejectedValue(new Error('Error DB'));
            await expect(controlador.obtenerTodosGastos())
                .rejects
                .toThrow('Error DB');
        });

        it('debe manejar ausencia de gastos', async () => {
            Gasto.findAll.mockResolvedValue(null);
            await expect(controlador.obtenerTodosGastos())
                .rejects
                .toThrow('Error al obtener la lista de gastos');
        });
    });

    describe('obtenerGastosPorInstalacion', () => {
        it('debe obtener todos los gastos de una instalación', async () => {
            const gastosInstalacion = [
                {
                    gasto_id: 1,
                    concepto: 'Limpieza',
                    instalacion_id: 1,
                    Instalacion: {
                        nombre: 'Piscina'
                    }
                },
                {
                    gasto_id: 2,
                    concepto: 'Mantenimiento',
                    instalacion_id: 1,
                    Instalacion: {
                        nombre: 'Piscina'
                    }
                }
            ];

            Gasto.findAll.mockResolvedValue(gastosInstalacion);

            const resultado = await controlador.obtenerGastosPorInstalacion(1);

            expect(Gasto.findAll).toHaveBeenCalledWith({
                where: { instalacion_id: 1 },
                include: [{
                    model: Instalacion,
                    attributes: ['instalacion_id', 'nombre']
                }],
                order: [['fecha', 'DESC']]
            });
            expect(resultado).toHaveLength(2);
            expect(resultado[0].instalacion_id).toBe(1);
        });

        it('debe manejar caso de instalación sin gastos', async () => {
            Gasto.findAll.mockResolvedValue([]);
            
            const resultado = await controlador.obtenerGastosPorInstalacion(1);
            
            expect(resultado).toEqual([]);
        });

        it('debe manejar errores de búsqueda', async () => {
            Gasto.findAll.mockRejectedValue(new Error('Error al buscar gastos'));

            await expect(controlador.obtenerGastosPorInstalacion(1))
                .rejects
                .toThrow('Error al buscar gastos');
        });
    });

    describe('obtenerGastoPorId', () => {
        it('debe retornar un gasto específico con sus relaciones', async () => {
            Gasto.findByPk.mockResolvedValue(gastoMock);

            const resultado = await controlador.obtenerGastoPorId(1);

            expect(Gasto.findByPk).toHaveBeenCalledWith(1, {
                include: [{
                    model: Instalacion,
                    attributes: ['instalacion_id', 'nombre']
                }]
            });
            expect(resultado).toEqual(gastoMock);
        });

        it('debe manejar gasto no encontrado', async () => {
            Gasto.findByPk.mockResolvedValue(null);
            await expect(controlador.obtenerGastoPorId(999))
                .rejects
                .toThrow('Gasto no encontrado');
        });
    });

    describe('verificarTipoGasto', () => {
        it('debe permitir todos los tipos válidos', async () => {
            const tiposValidos = ['mantenimiento', 'servicios', 'personal', 'otros'];
            
            for (const tipo of tiposValidos) {
                await expect(controlador.verificarTipoGasto(tipo))
                    .resolves
                    .not
                    .toThrow();
            }
        });

        it('debe rechazar tipo inválido', async () => {
            await expect(controlador.verificarTipoGasto('tipo_invalido'))
                .rejects
                .toThrow('Tipo de gasto inválido');
        });

        it('debe permitir tipo undefined', async () => {
            await expect(controlador.verificarTipoGasto(undefined))
                .resolves
                .not
                .toThrow();
        });

        it('debe permitir tipo null', async () => {
            await expect(controlador.verificarTipoGasto(null))
                .resolves
                .not
                .toThrow();
        });
    });

    describe('verificarInstalacion', () => {
        it('debe verificar instalación existente', async () => {
            const instalacionMock = {
                instalacion_id: 1,
                nombre: 'Piscina'
            };
            Instalacion.findByPk.mockResolvedValue(instalacionMock);

            await expect(controlador.verificarInstalacion(1))
                .resolves
                .not
                .toThrow();
        });

        it('debe rechazar instalación inexistente', async () => {
            Instalacion.findByPk.mockResolvedValue(null);

            await expect(controlador.verificarInstalacion(999))
                .rejects
                .toThrow('Instalación no encontrada');
        });
    });

    describe('crearGasto', () => {
        const nuevoGasto = {
            concepto: 'Nuevo Gasto',
            precio: 150.00,
            fecha: new Date(),
            tipo: 'servicios',
            instalacion_id: 1,
            descripcion: 'Descripción del gasto'
        };

        it('debe crear un gasto exitosamente', async () => {
            Instalacion.findByPk.mockResolvedValue({ instalacion_id: 1 });
            
            const gastoCreado = {
                gasto_id: 2,
                ...nuevoGasto,
                get: function() { return this; }
            };
            Gasto.create.mockResolvedValue(gastoCreado);

            const resultado = await controlador.crearGasto(nuevoGasto);

            expect(resultado).toHaveProperty('gasto_id');
            expect(resultado.concepto).toBe(nuevoGasto.concepto);
        });

        it('debe validar campos requeridos', async () => {
            const gastoInvalido = {
                concepto: 'Solo concepto'
            };

            await expect(controlador.crearGasto(gastoInvalido))
                .rejects
                .toThrow('Datos del gasto inválidos o incompletos');

            expect(Gasto.create).not.toHaveBeenCalled();
        });

        it('debe validar instalación antes de crear', async () => {
            Instalacion.findByPk.mockResolvedValue(null);

            await expect(controlador.crearGasto(nuevoGasto))
                .rejects
                .toThrow('Instalación no encontrada');
        });

        it('debe validar tipo de gasto válido', async () => {
            const gastoTipoInvalido = {
                ...nuevoGasto,
                tipo: 'tipo_invalido'
            };

            await expect(controlador.crearGasto(gastoTipoInvalido))
                .rejects
                .toThrow('Tipo de gasto inválido');
        });
    });

    describe('actualizarGasto', () => {
        const datosActualizacion = {
            precio: 200.00,
            descripcion: 'Descripción actualizada'
        };

        it('debe actualizar un gasto existente', async () => {
            const gastoActualizado = {
                ...gastoMock,
                get: function() { return this; },
                update: jest.fn().mockImplementation(async function(datos) {
                    Object.assign(this, datos);
                    return this;
                })
            };

            Gasto.findByPk.mockResolvedValue(gastoActualizado);

            const resultado = await controlador.actualizarGasto(1, datosActualizacion);

            expect(gastoActualizado.update).toHaveBeenCalledWith(datosActualizacion);
            expect(resultado.precio).toBe(datosActualizacion.precio);
            expect(resultado.descripcion).toBe(datosActualizacion.descripcion);
        });

        it('debe validar gasto existente', async () => {
            Gasto.findByPk.mockResolvedValue(null);

            await expect(controlador.actualizarGasto(999, datosActualizacion))
                .rejects
                .toThrow('Gasto no encontrado');
        });

        it('debe validar instalación al actualizar', async () => {
            const gastoActual = {
                ...gastoMock,
                get: function() { return this; }
            };
            
            Gasto.findByPk.mockResolvedValue(gastoActual);
            Instalacion.findByPk.mockResolvedValue(null);

            await expect(controlador.actualizarGasto(1, { instalacion_id: 999 }))
                .rejects
                .toThrow('Instalación no encontrada');
        });

        it('debe validar tipo al actualizar', async () => {
            const gastoActual = {
                ...gastoMock,
                get: function() { return this; }
            };
            
            Gasto.findByPk.mockResolvedValue(gastoActual);

            await expect(controlador.actualizarGasto(1, { tipo: 'tipo_invalido' }))
                .rejects
                .toThrow('Tipo de gasto inválido');
        });
    });

    describe('obtenerEstadisticasGastos', () => {
        const gastosMock = [
            {
                precio: 100,
                tipo: 'mantenimiento',
                fecha: new Date('2024-01-15')
            },
            {
                precio: 200,
                tipo: 'servicios',
                fecha: new Date('2024-01-20')
            }
        ];

        it('debe calcular estadísticas correctamente', async () => {
            Gasto.findAll.mockResolvedValue(gastosMock);

            const estadisticas = await controlador.obtenerEstadisticasGastos();

            expect(estadisticas).toHaveProperty('totalGastos', 300);
            expect(estadisticas.gastosPorTipo).toHaveProperty('mantenimiento', 100);
            expect(estadisticas.gastosPorTipo).toHaveProperty('servicios', 200);
            expect(estadisticas).toHaveProperty('gastosPorMes');
        });

        it('debe manejar gastos sin tipo', async () => {
            const gastosConTipoNulo = [
                {
                    precio: 100,
                    tipo: null,
                    fecha: new Date()
                }
            ];
            
            Gasto.findAll.mockResolvedValue(gastosConTipoNulo);
            
            const estadisticas = await controlador.obtenerEstadisticasGastos();
            
            expect(estadisticas.totalGastos).toBe(100);
            expect(Object.keys(estadisticas.gastosPorTipo)).toHaveLength(0);
        });

        it('debe manejar lista vacía de gastos', async () => {
            Gasto.findAll.mockResolvedValue([]);
            
            const estadisticas = await controlador.obtenerEstadisticasGastos();
            
            expect(estadisticas.totalGastos).toBe(0);
            expect(Object.keys(estadisticas.gastosPorTipo)).toHaveLength(0);
            expect(Object.keys(estadisticas.gastosPorMes)).toHaveLength(0);
        });
    });

    describe('eliminarGasto', () => {
        it('debe eliminar un gasto existente', async () => {
            const gastoAEliminar = {
                ...gastoMock,
                destroy: jest.fn().mockResolvedValue(undefined)
            };
            
            Gasto.findByPk.mockResolvedValue(gastoAEliminar);

            await controlador.eliminarGasto(1);

            expect(gastoAEliminar.destroy).toHaveBeenCalled();
        });

        it('debe manejar error al eliminar gasto inexistente', async () => {
            Gasto.findByPk.mockResolvedValue(null);

            await expect(controlador.eliminarGasto(999))
                .rejects
                .toThrow('Gasto no encontrado');
        });

        it('debe manejar error en la eliminación', async () => {
            const gastoError = {
                ...gastoMock,
                destroy: jest.fn().mockRejectedValue(new Error('Error al eliminar'))
            };
            
            Gasto.findByPk.mockResolvedValue(gastoError);

            await expect(controlador.eliminarGasto(1))
                .rejects
                .toThrow('Error al eliminar');
        });
    });
});