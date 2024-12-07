// controladorEmpleados.test.js
import { jest } from '@jest/globals';
import ControladorEmpleados from '../../controllers/empleados/controladorEmpleados.js';
import Empleado from '../../models/empleado.js';

// Mock del modelo Empleado
Empleado.findAll = jest.fn();
Empleado.findByPk = jest.fn();
Empleado.findOne = jest.fn();
Empleado.create = jest.fn();

describe('ControladorEmpleados', () => {
    let controlador;
    
    const empleadoMock = {
        empleado_id: 1,
        nombre: 'Juan',
        apellidos: 'Pérez',
        dni: '12345678A',
        telefono: '666555444',
        email: 'juan@test.com',
        puesto: 'Monitor',
        fecha_contratacion: new Date(),
        update: jest.fn().mockImplementation(function(datos) {
            Object.assign(this, datos);
            return this;
        }),
        get: function() { return this; }
    };

    beforeEach(() => {
        jest.clearAllMocks();
        controlador = new ControladorEmpleados();
    });

    describe('verificarEmpleadoExistente', () => {
        it('debe permitir dni y email únicos', async () => {
            Empleado.findOne.mockResolvedValue(null);

            await expect(controlador.verificarEmpleadoExistente('99999999X', 'nuevo@test.com'))
                .resolves
                .not
                .toThrow();
        });

        it('debe rechazar dni duplicado', async () => {
            Empleado.findOne.mockResolvedValue(empleadoMock);

            await expect(controlador.verificarEmpleadoExistente(empleadoMock.dni, 'nuevo@test.com'))
                .rejects
                .toThrow('Ya existe un empleado con ese DNI o email');
        });

        it('debe rechazar email duplicado', async () => {
            Empleado.findOne.mockResolvedValue(empleadoMock);

            await expect(controlador.verificarEmpleadoExistente('99999999X', empleadoMock.email))
                .rejects
                .toThrow('Ya existe un empleado con ese DNI o email');
        });
    });

    describe('actualizarEmpleado con validaciones de unicidad', () => {
        it('debe actualizar cuando el dni y email no cambian', async () => {
            const empleadoExistente = {
                ...empleadoMock,
                update: jest.fn().mockImplementation(function(datos) {
                    Object.assign(this, datos);
                    return this;
                })
            };

            Empleado.findByPk.mockResolvedValue(empleadoExistente);
            Empleado.findOne.mockResolvedValue(null);

            const datosActualizacion = {
                nombre: 'Juan Actualizado',
                telefono: '666000999'
            };

            const resultado = await controlador.actualizarEmpleado(1, datosActualizacion);

            expect(empleadoExistente.update).toHaveBeenCalledWith(datosActualizacion);
            expect(resultado.nombre).toBe('Juan Actualizado');
            expect(resultado.telefono).toBe('666000999');
            expect(resultado.dni).toBe(empleadoMock.dni); // Verificar que el DNI no cambió
        });

        it('debe validar dni único al actualizar', async () => {
            const empleadoExistente = {
                ...empleadoMock,
                update: jest.fn()
            };

            Empleado.findByPk.mockResolvedValue(empleadoExistente);
            // Simular que existe otro empleado con el DNI que queremos usar
            Empleado.findOne.mockResolvedValue({ ...empleadoMock, empleado_id: 2 });

            await expect(controlador.actualizarEmpleado(1, {
                dni: '99999999X'
            })).rejects.toThrow('Ya existe un empleado con ese DNI o email');
            
            expect(empleadoExistente.update).not.toHaveBeenCalled();
        });

        it('debe validar email único al actualizar', async () => {
            const empleadoExistente = {
                ...empleadoMock,
                update: jest.fn()
            };

            Empleado.findByPk.mockResolvedValue(empleadoExistente);
            // Simular que existe otro empleado con el email que queremos usar
            Empleado.findOne.mockResolvedValue({ ...empleadoMock, empleado_id: 2 });

            await expect(controlador.actualizarEmpleado(1, {
                email: 'otro@test.com'
            })).rejects.toThrow('Ya existe un empleado con ese DNI o email');
            
            expect(empleadoExistente.update).not.toHaveBeenCalled();
        });

        it('debe permitir actualizar otros campos sin validar dni/email', async () => {
            const empleadoExistente = {
                ...empleadoMock,
                update: jest.fn().mockImplementation(function(datos) {
                    Object.assign(this, datos);
                    return this;
                })
            };

            Empleado.findByPk.mockResolvedValue(empleadoExistente);

            const datosActualizacion = {
                telefono: '999888777',
                puesto: 'Supervisor'
            };

            const resultado = await controlador.actualizarEmpleado(1, datosActualizacion);

            expect(empleadoExistente.update).toHaveBeenCalledWith(datosActualizacion);
            expect(resultado.telefono).toBe('999888777');
            expect(resultado.puesto).toBe('Supervisor');
            expect(Empleado.findOne).not.toHaveBeenCalled(); // No debería verificar dni/email
        });
    });

    describe('crearEmpleado', () => {
        it('debe crear empleado con todos los campos requeridos', async () => {
            const nuevoEmpleado = {
                nombre: 'Ana',
                apellidos: 'García',
                dni: '87654321B',
                telefono: '666777888',
                email: 'ana@test.com',
                puesto: 'Recepcionista'
            };

            Empleado.findOne.mockResolvedValue(null);
            Empleado.create.mockResolvedValue({
                ...nuevoEmpleado,
                empleado_id: 2,
                fecha_contratacion: new Date(),
                get: function() { return this; }
            });

            const resultado = await controlador.crearEmpleado(nuevoEmpleado);

            expect(resultado.nombre).toBe(nuevoEmpleado.nombre);
            expect(resultado.dni).toBe(nuevoEmpleado.dni);
            expect(resultado.fecha_contratacion).toBeDefined();
        });

        it('debe fallar si falta el dni', async () => {
            const empleadoSinDni = {
                nombre: 'Ana',
                apellidos: 'García',
                telefono: '666777888',
                email: 'ana@test.com',
                puesto: 'Recepcionista'
            };

            await expect(controlador.crearEmpleado(empleadoSinDni))
                .rejects
                .toThrow('Datos de empleado inválidos o incompletos');
        });

        it('debe fallar si falta algún campo requerido', async () => {
            const datosIncompletos = [
                { apellidos: 'García', dni: '87654321B' }, // Sin nombre
                { nombre: 'Ana', dni: '87654321B' }, // Sin apellidos
                { nombre: 'Ana', apellidos: 'García' } // Sin DNI
            ];

            for (const datos of datosIncompletos) {
                await expect(controlador.crearEmpleado(datos))
                    .rejects
                    .toThrow('Datos de empleado inválidos o incompletos');
            }

            expect(Empleado.create).not.toHaveBeenCalled();
        });
    });
});