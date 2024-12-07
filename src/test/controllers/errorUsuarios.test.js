import errors from '../../helpers/errorUsuarios.js';

describe('Error Usuarios', () => {
    it('debe crear USER_NOT_FOUND con mensaje y status correctos', () => {
        const error = new errors.USER_NOT_FOUND();
        expect(error.message).toBe('User not found');
        expect(error.status).toBe(404);
    });

    it('debe crear FALTAN_DATOS_USUARIO con mensaje y status correctos', () => {
        const error = new errors.FALTAN_DATOS_USUARIO();
        expect(error.message).toBe('Faltan datos del usuario');
        expect(error.status).toBe(400);
    });

    it('debe crear USER_LIST_ERROR con mensaje y status correctos', () => {
        const error = new errors.USER_LIST_ERROR();
        expect(error.message).toBe('Error al obtener la lista de usuarios');
        expect(error.status).toBe(500);
    });

    it('debe crear USUARIO_NO_CREADO con mensaje y status correctos', () => {
        const error = new errors.USUARIO_NO_CREADO();
        expect(error.message).toBe('No se pudo crear el usuario');
        expect(error.status).toBe(500);
    });

    it('debe crear USER_ALREADY_EXISTS con mensaje y status correctos', () => {
        const error = new errors.USER_ALREADY_EXISTS();
        expect(error.message).toBe('El usuario ya existe');
        expect(error.status).toBe(409);
    });

    it('debe crear PASSWORDS_DONT_MATCH con mensaje y status correctos', () => {
        const error = new errors.PASSWORDS_DONT_MATCH();
        expect(error.message).toBe('Las contrasenas no coinciden');
        expect(error.status).toBe(400);
    });

    it('debe crear INVALID_CREDENTIALS con mensaje y status correctos', () => {
        const error = new errors.INVALID_CREDENTIALS();
        expect(error.message).toBe('Credenciales inválidas');
        expect(error.status).toBe(400);
    });
});