// errorPagos.test.js
import errorsPagos from '../../helpers/errorPagos.js';

describe('Error Pagos', () => {
    describe('PAGO_NOT_FOUND', () => {
        it('debe crear error con mensaje y estado correctos', () => {
            const error = new errorsPagos.PAGO_NOT_FOUND();
            expect(error.message).toBe('Pago no encontrado');
            expect(error.status).toBe(404);
        });
    });

    describe('METODO_PAGO_INVALIDO', () => {
        it('debe crear error con mensaje y estado correctos', () => {
            const error = new errorsPagos.METODO_PAGO_INVALIDO();
            expect(error.message).toBe('Método de pago inválido');
            expect(error.status).toBe(400);
        });
    });

    describe('PAGO_LIST_ERROR', () => {
        it('debe crear error con mensaje y estado correctos', () => {
            const error = new errorsPagos.PAGO_LIST_ERROR();
            expect(error.message).toBe('Error al obtener la lista de pagos');
            expect(error.status).toBe(500);
        });
    });

    describe('USUARIO_NO_AUTORIZADO', () => {
        it('debe crear error con mensaje y estado correctos', () => {
            const error = new errorsPagos.USUARIO_NO_AUTORIZADO();
            expect(error.message).toBe('Usuario no autorizado para ver estos pagos');
            expect(error.status).toBe(401);
        });
    });

    describe('Manejo de errores en uso práctico', () => {
        it('debe poder usar los errores en try/catch', () => {
            const verificarPago = () => {
                throw new errorsPagos.PAGO_NOT_FOUND();
            };

            expect(() => verificarPago()).toThrow('Pago no encontrado');
        });

        it('debe mantener el status code al atrapar el error', () => {
            try {
                throw new errorsPagos.METODO_PAGO_INVALIDO();
            } catch (error) {
                expect(error.status).toBe(400);
            }
        });

        it('debe funcionar con async/await', async () => {
            const verificarPagoAsync = async () => {
                throw new errorsPagos.USUARIO_NO_AUTORIZADO();
            };

            await expect(verificarPagoAsync()).rejects.toThrow('Usuario no autorizado para ver estos pagos');
        });
    });

    describe('Verificación de exportación', () => {
        it('debe exportar todos los errores definidos', () => {
            const errorClasses = [
                'PAGO_NOT_FOUND',
                'METODO_PAGO_INVALIDO',
                'PAGO_LIST_ERROR',
                'USUARIO_NO_AUTORIZADO'
            ];

            errorClasses.forEach(errorClass => {
                expect(errorsPagos).toHaveProperty(errorClass);
                expect(new errorsPagos[errorClass]()).toBeInstanceOf(Error);
            });
        });
    });

    describe('Propiedades de los errores', () => {
        it('debe mantener las propiedades básicas de Error', () => {
            const error = new errorsPagos.PAGO_NOT_FOUND();
            expect(error.name).toBe('Error');
            expect(error.message).toBeDefined();
            expect(error.stack).toBeDefined();
        });

        it('cada error debe tener un status code válido', () => {
            Object.values(errorsPagos).forEach(ErrorClass => {
                const error = new ErrorClass();
                expect(error.status).toBeDefined();
                expect(typeof error.status).toBe('number');
                expect(error.status).toBeGreaterThanOrEqual(400);
                expect(error.status).toBeLessThan(600);
            });
        });

        it('los mensajes de error deben ser strings no vacíos', () => {
            Object.values(errorsPagos).forEach(ErrorClass => {
                const error = new ErrorClass();
                expect(typeof error.message).toBe('string');
                expect(error.message.length).toBeGreaterThan(0);
            });
        });
    });

    describe('Comportamiento con múltiples instancias', () => {
        it('debe crear instancias independientes', () => {
            const error1 = new errorsPagos.PAGO_NOT_FOUND();
            const error2 = new errorsPagos.PAGO_NOT_FOUND();
            
            expect(error1).not.toBe(error2);
            expect(error1.message).toBe(error2.message);
            expect(error1.status).toBe(error2.status);
        });
    });
});