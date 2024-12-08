// errorInstalaciones.test.js
import errors from '../../helpers/errorInstalaciones.js';

describe('Error Instalaciones', () => {
    describe('INSTALACION_NOT_FOUND', () => {
        it('debe crear error con mensaje y estado correctos', () => {
            const error = new errors.INSTALACION_NOT_FOUND();
            expect(error.message).toBe('Instalación no encontrada');
            expect(error.status).toBe(404);
        });
    });

    describe('INSTALACION_YA_RESERVADA', () => {
        it('debe crear error con mensaje y estado correctos', () => {
            const error = new errors.INSTALACION_YA_RESERVADA();
            expect(error.message).toBe('La instalación ya está reservada para esa fecha y hora');
            expect(error.status).toBe(400);
        });
    });

    describe('DATOS_INSTALACION_INVALIDOS', () => {
        it('debe crear error con mensaje y estado correctos', () => {
            const error = new errors.DATOS_INSTALACION_INVALIDOS();
            expect(error.message).toBe('Faltan datos necesarios para la instalación');
            expect(error.status).toBe(400);
        });
    });

    describe('RESERVA_ERROR', () => {
        it('debe crear error con mensaje y estado correctos', () => {
            const error = new errors.RESERVA_ERROR();
            expect(error.message).toBe('Error al crear la reserva');
            expect(error.status).toBe(500);
        });
    });

    describe('USUARIO_NO_AUTENTICADO', () => {
        it('debe crear error con mensaje y estado correctos', () => {
            const error = new errors.USUARIO_NO_AUTENTICADO();
            expect(error.message).toBe('Usuario no autenticado');
            expect(error.status).toBe(401);
        });
    });

    describe('INSTALACION_LIST_ERROR', () => {
        it('debe crear error con mensaje y estado correctos', () => {
            const error = new errors.INSTALACION_LIST_ERROR();
            expect(error.message).toBe('Error al obtener la lista de instalaciones');
            expect(error.status).toBe(500);
        });
    });

    describe('Comportamiento de errores', () => {
        it('los errores deben extender de Error', () => {
            Object.values(errors).forEach(ErrorClass => {
                const error = new ErrorClass();
                expect(error).toBeInstanceOf(Error);
            });
        });

        it('todos los errores deben tener un status válido', () => {
            Object.values(errors).forEach(ErrorClass => {
                const error = new ErrorClass();
                expect(error.status).toBeDefined();
                expect(typeof error.status).toBe('number');
                expect(error.status).toBeGreaterThanOrEqual(400);
                expect(error.status).toBeLessThan(600);
            });
        });

        it('los errores deben poder ser usados en try/catch', () => {
            expect(() => {
                throw new errors.INSTALACION_NOT_FOUND();
            }).toThrow('Instalación no encontrada');
        });

        it('los errores deben mantener su status en el catch', () => {
            try {
                throw new errors.INSTALACION_NOT_FOUND();
            } catch (error) {
                expect(error.status).toBe(404);
            }
        });
    });

    describe('Verificación de exportación', () => {
        it('debe exportar todos los errores definidos', () => {
            const expectedErrors = [
                'INSTALACION_NOT_FOUND',
                'INSTALACION_YA_RESERVADA',
                'DATOS_INSTALACION_INVALIDOS',
                'RESERVA_ERROR',
                'USUARIO_NO_AUTENTICADO',
                'INSTALACION_LIST_ERROR'
            ];

            expectedErrors.forEach(errorName => {
                expect(errors).toHaveProperty(errorName);
                expect(typeof errors[errorName]).toBe('function');
            });
        });
    });
});