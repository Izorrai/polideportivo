// controladorClientes.test.js
import { jest } from '@jest/globals';
import Cliente from '../../models/cliente.js';

// Mock Sequelize
jest.unstable_mockModule('../../config/sequelize.js', () => ({
    testConexion: jest.fn(),
    sequelize: {
        authenticate: jest.fn().mockResolvedValue(),
        define: jest.fn(),
        sync: jest.fn()
    }
}));

let mockHashContrasena;
let ControladorCliente;

// Mock Cliente model methods
Cliente.findByPk = jest.fn();
Cliente.create = jest.fn();
Cliente.findOne = jest.fn();
Cliente.destroy = jest.fn();
Cliente.findAll = jest.fn();

// Setup mocks before importing the controller
jest.isolateModules(async () => {
    mockHashContrasena = jest.fn().mockImplementation(pwd => Promise.resolve(`hashed_${pwd}`));
    await jest.unstable_mockModule('../../config/bcrypt.js', () => ({
        hashcontrasena: mockHashContrasena,
        default: { hashcontrasena: mockHashContrasena }
    }));
});

const importControlador = async () => {
    const module = await import('../../controllers/clientes/controladorCliente.js');
    ControladorCliente = module.default;
};

describe('ControladorCliente', () => {
    let controladorCliente;

    const clienteMock = {
        cliente_id: 1,
        email: 'juan@test.com',
        nombre: 'Juan',
        apellido: 'Pérez',
        telefono: '666555444',
        direccion: 'Calle Test 1',
        contrasena: 'hashedpassword',
        roles: 'CLIENTE',
        save: jest.fn().mockResolvedValue(true),
        destroy: jest.fn().mockResolvedValue(true),
        get: function() { return this; }
    };

    beforeAll(async () => {
        await importControlador();
    });

    beforeEach(() => {
        jest.clearAllMocks();
        controladorCliente = new ControladorCliente();
    });

    describe('getAllUsers', () => {
        it('debe obtener todos los usuarios exitosamente', async () => {
            const usuariosMock = [clienteMock, {...clienteMock, cliente_id: 2, email: 'otro@test.com'}];
            Cliente.findAll.mockResolvedValue(usuariosMock);

            const resultado = await controladorCliente.getAllUsers();

            expect(Cliente.findAll).toHaveBeenCalled();
            expect(resultado).toEqual(usuariosMock);
        });

        it('debe manejar error cuando no se pueden obtener usuarios', async () => {
            Cliente.findAll.mockResolvedValue(null);

            await expect(controladorCliente.getAllUsers())
                .rejects.toThrow('Error al obtener la lista de usuarios');
        });
    });

    describe('buscarUserPorId', () => {
        it('debe encontrar un usuario por ID exitosamente', async () => {
            Cliente.findByPk.mockResolvedValue(clienteMock);

            const resultado = await controladorCliente.buscarUserPorId(1);

            expect(Cliente.findByPk).toHaveBeenCalledWith(1, {
                attributes: { exclude: ['contrasena'] }
            });
            expect(resultado).toEqual(clienteMock);
        });

        it('debe manejar usuario no encontrado por ID', async () => {
            Cliente.findByPk.mockResolvedValue(null);

            await expect(controladorCliente.buscarUserPorId(999))
                .rejects.toThrow('User not found');
        });
    });

    describe('buscarPorEmail', () => {
        it('debe encontrar un usuario por email exitosamente', async () => {
            Cliente.findOne.mockResolvedValue(clienteMock);

            const resultado = await controladorCliente.buscarPorEmail('juan@test.com');

            expect(Cliente.findOne).toHaveBeenCalledWith({
                where: { email: 'juan@test.com' }
            });
            expect(resultado).toEqual(clienteMock);
        });

        it('debe manejar errores de búsqueda', async () => {
            const error = new Error('Error al buscar usuario');
            Cliente.findOne.mockRejectedValue(error);

            await expect(controladorCliente.buscarPorEmail('juan@test.com'))
                .rejects.toThrow('Error al buscar usuario');
        });
    });

    describe('crearUsuario', () => {
        it('debe crear un nuevo usuario con rol por defecto', async () => {
            const datosUsuario = {
                nombre: 'Nuevo',
                apellido: 'Usuario',
                email: 'nuevo@test.com',
                telefono: '123456789',
                direccion: 'Nueva Dirección',
                contrasena: 'password123'
                // roles not provided, should default to "CLIENT"
            };

            Cliente.findOne.mockResolvedValue(null);
            const usuarioCreado = {
                ...datosUsuario,
                roles: 'CLIENTE', // default role
                cliente_id: 2,
                contrasena: `hashed_${datosUsuario.contrasena}`,
                get: function() { return this; }
            };
            Cliente.create.mockResolvedValue(usuarioCreado);

            const resultado = await controladorCliente.crearUsuario(
                datosUsuario.nombre,
                datosUsuario.apellido,
                datosUsuario.email,
                datosUsuario.telefono,
                datosUsuario.direccion,
                datosUsuario.contrasena
                // roles parameter omitted
            );

            expect(Cliente.create).toHaveBeenCalledWith({
                nombre: datosUsuario.nombre,
                apellido: datosUsuario.apellido,
                email: datosUsuario.email,
                telefono: datosUsuario.telefono,
                direccion: datosUsuario.direccion,
                contrasena: expect.any(String),
                roles: 'CLIENTE' // verify default role is used
            });
            expect(resultado.roles).toBe('CLIENTE');
        });

        it('debe manejar error cuando faltan datos', async () => {
            await expect(controladorCliente.crearUsuario(
                'Juan',           // nombre
                'Pérez',          // apellido
                'juan@test.com',   // email
                '',               // telefono (faltante)
                'Calle Test 1',   // direccion
                'password123',    // contrasena
                'CLIENTE'          // roles
            )).rejects.toThrow('Faltan datos del usuario');
        });

        it('debe manejar error cuando el email ya existe', async () => {
            Cliente.findOne.mockResolvedValue(clienteMock);

            await expect(controladorCliente.crearUsuario(
                'Juan',           // nombre
                'Pérez',          // apellido
                'juan@test.com',   // email
                '666555444',      // telefono
                'Calle Test 1',   // direccion
                'password123',    // contrasena
                'CLIENTE'          // roles
            )).rejects.toThrow('El usuario ya existe');
        });
    });

    describe('actualizarUsuario', () => {
        it('debe manejar correctamente la actualización de roles', async () => {
            const clienteBase = {
                ...clienteMock,
                roles: 'CLIENTE',
                save: jest.fn().mockResolvedValue(true)
            };

            Cliente.findByPk.mockResolvedValue(clienteBase);

            // Test with undefined roles (should keep original)
            const resultadoUndefined = await controladorCliente.actualizarUsuario(
                clienteMock.cliente_id,
                undefined,          // email
                undefined,         // contrasena
                undefined,         // nombre
                undefined,         // apellido
                undefined,         // telefono
                undefined,         // direccion
                undefined         // roles undefined - should keep original
            );

            expect(resultadoUndefined.roles).toBe('CLIENTE');  // should keep original role
            expect(clienteBase.save).toHaveBeenCalled();

            // Reset mock counts
            jest.clearAllMocks();
            clienteBase.save.mockResolvedValue(true);

            // Test with new role value (should update)
            const resultadoNuevoRol = await controladorCliente.actualizarUsuario(
                clienteMock.cliente_id,
                undefined,          // email
                undefined,         // contrasena
                undefined,         // nombre
                undefined,         // apellido
                undefined,         // telefono
                undefined,         // direccion
                'ADMIN'           // new role - should update
            );

            expect(resultadoNuevoRol.roles).toBe('ADMIN');  // should be updated
            expect(clienteBase.save).toHaveBeenCalled();
        });

        it('debe actualizar contraseña si se proporciona', async () => {
            const nuevaContraseña = 'nueva_contraseña';
            const clienteConNuevaPass = {
                ...clienteMock,
                save: jest.fn().mockResolvedValue(true)
            };

            Cliente.findByPk.mockResolvedValue(clienteConNuevaPass);

            await controladorCliente.actualizarUsuario(
                clienteMock.cliente_id,
                'juan@test.com',
                nuevaContraseña,
                'Juan',
                'Pérez',
                '666555444',
                'Calle Test 1',
                'CLIENTE'
            );

            expect(mockHashContrasena).toHaveBeenCalledWith(nuevaContraseña);
            expect(clienteConNuevaPass.save).toHaveBeenCalled();
        });

        it('debe manejar usuario no encontrado', async () => {
            Cliente.findByPk.mockResolvedValue(null);

            await expect(controladorCliente.actualizarUsuario(
                999,
                'noexiste@test.com',
                null,
                'Juan',
                'Pérez',
                '666555444',
                'Calle Test 1',
                'CLIENTE'
            )).rejects.toThrow('User not found');
        });
    });

    describe('eliminarUsuario', () => {
        it('debe eliminar un usuario existente', async () => {
            const clienteABorrar = {
                ...clienteMock,
                destroy: jest.fn().mockResolvedValue(true)
            };
            
            Cliente.findByPk.mockResolvedValue(clienteABorrar);

            await controladorCliente.eliminarUsuario(clienteMock.cliente_id);

            expect(Cliente.findByPk).toHaveBeenCalledWith(clienteMock.cliente_id);
            expect(clienteABorrar.destroy).toHaveBeenCalled();
        });

        it('debe manejar usuario no encontrado al eliminar', async () => {
            Cliente.findByPk.mockResolvedValue(null);

            await expect(controladorCliente.eliminarUsuario(999))
                .rejects.toThrow('User not found');
        });
   
    });
});