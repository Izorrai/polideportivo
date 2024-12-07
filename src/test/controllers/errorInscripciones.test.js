import errors from '../../helpers/errorInscripciones.js';

describe('Error Inscripciones', () => {
    it('debe crear INSCRIPCION_NOT_FOUND con mensaje y status correctos', () => {
        const error = new errors.INSCRIPCION_NOT_FOUND();
        expect(error.message).toBe('Inscripción no encontrada');
        expect(error.status).toBe(404);
    });

    it('debe crear INSCRIPCION_YA_EXISTE con mensaje y status correctos', () => {
        const error = new errors.INSCRIPCION_YA_EXISTE();
        expect(error.message).toBe('Ya te has inscrito en esta clase');
        expect(error.status).toBe(400);
    });

    it('debe crear CLASE_COMPLETA con mensaje y status correctos', () => {
        const error = new errors.CLASE_COMPLETA();
        expect(error.message).toBe('La clase está completa');
        expect(error.status).toBe(400);
    });

    it('debe crear CLASE_NOT_FOUND con mensaje y status correctos', () => {
        const error = new errors.CLASE_NOT_FOUND();
        expect(error.message).toBe('Clase no encontrada');
        expect(error.status).toBe(404);
    });

    it('debe crear INSCRIPCION_LIST_ERROR con mensaje y status correctos', () => {
        const error = new errors.INSCRIPCION_LIST_ERROR();
        expect(error.message).toBe('Error al obtener la lista de inscripciones');
        expect(error.status).toBe(500);
    });

    it('debe crear USUARIO_NO_AUTENTICADO con mensaje y status correctos', () => {
        const error = new errors.USUARIO_NO_AUTENTICADO();
        expect(error.message).toBe('Usuario no autenticado');
        expect(error.status).toBe(401);
    });
});