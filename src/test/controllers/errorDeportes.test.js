import errors from '../../helpers/errorDeportes.js';

describe('Error Deportes', () => {
    describe('DEPORTE_NOT_FOUND', () => {
        it('debe crear error con mensaje y estado correctos', () => {
            const error = new errors.DEPORTE_NOT_FOUND();
            expect(error.message).toBe('Deporte no encontrado');
            expect(error.status).toBe(404);
        });
    });

    describe('FALTAN_DATOS_DEPORTE', () => {
        it('debe crear error con mensaje y estado correctos', () => {
            const error = new errors.FALTAN_DATOS_DEPORTE();
            expect(error.message).toBe('Faltan datos del deporte');
            expect(error.status).toBe(400);
        });
    });

    describe('DEPORTE_YA_EXISTE', () => {
        it('debe crear error con mensaje y estado correctos', () => {
            const error = new errors.DEPORTE_YA_EXISTE();
            expect(error.message).toBe('El deporte ya existe');
            expect(error.status).toBe(409);
        });
    });

    describe('DEPORTE_LIST_ERROR', () => {
        it('debe crear error con mensaje y estado correctos', () => {
            const error = new errors.DEPORTE_LIST_ERROR();
            expect(error.message).toBe('Error al obtener la lista de deportes');
            expect(error.status).toBe(500);
        });
    });

    describe('DEPORTE_NO_CREADO', () => {
        it('debe crear error con mensaje y estado correctos', () => {
            const error = new errors.DEPORTE_NO_CREADO();
            expect(error.message).toBe('No se pudo crear el deporte');
            expect(error.status).toBe(500);
        });
    });

    describe('Exports', () => {
        it('debe exportar todos los errores correctamente', () => {
            expect(errors).toHaveProperty('DEPORTE_NOT_FOUND');
            expect(errors).toHaveProperty('FALTAN_DATOS_DEPORTE');
            expect(errors).toHaveProperty('DEPORTE_YA_EXISTE');
            expect(errors).toHaveProperty('DEPORTE_LIST_ERROR');
            expect(errors).toHaveProperty('DEPORTE_NO_CREADO');
        });

        it('cada error debe ser una clase de error válida', () => {
            Object.values(errors).forEach(ErrorClass => {
                const error = new ErrorClass();
                expect(error).toBeInstanceOf(Error);
                expect(error.message).toBeDefined();
                expect(error.status).toBeDefined();
            });
        });
    });
});