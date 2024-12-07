import errors from '../../helpers/errorGastos.js';

describe('Error Gastos', () => {
    it('debe crear GASTO_NOT_FOUND con mensaje y status correctos', () => {
        const error = new errors.GASTO_NOT_FOUND();
        expect(error.message).toBe('Gasto no encontrado');
        expect(error.status).toBe(404);
    });

    it('debe crear INSTALACION_NOT_FOUND con mensaje y status correctos', () => {
        const error = new errors.INSTALACION_NOT_FOUND();
        expect(error.message).toBe('Instalación no encontrada');
        expect(error.status).toBe(404);
    });

    it('debe crear DATOS_GASTO_INVALIDOS con mensaje y status correctos', () => {
        const error = new errors.DATOS_GASTO_INVALIDOS();
        expect(error.message).toBe('Datos del gasto inválidos o incompletos');
        expect(error.status).toBe(400);
    });

    it('debe crear TIPO_GASTO_INVALIDO con mensaje y status correctos', () => {
        const error = new errors.TIPO_GASTO_INVALIDO();
        expect(error.message).toBe('Tipo de gasto inválido');
        expect(error.status).toBe(400);
    });

    it('debe crear GASTO_LIST_ERROR con mensaje y status correctos', () => {
        const error = new errors.GASTO_LIST_ERROR();
        expect(error.message).toBe('Error al obtener la lista de gastos');
        expect(error.status).toBe(500);
    });
});