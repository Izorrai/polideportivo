// controladorClientes.test.js
import { jest } from '@jest/globals';
import Cliente from '../../models/cliente.js';

// Mock del modelo Cliente
Cliente.findByPk = jest.fn();
Cliente.create = jest.fn();
Cliente.findOne = jest.fn();
Cliente.destroy = jest.fn();

let mockHashContrasena;
let ControladorCliente;

jest.isolateModules(() => {
    mockHashContrasena = jest.fn().mockImplementation(pwd => Promise.resolve(`hashed_${pwd}`));
    jest.unstable_mockModule('../../config/bcrypt.js', () => ({
        hashcontrasena: mockHashContrasena,
        default: { hashcontrasena: mockHashContrasena }
    }));
});

// Importar el controlador después del mock
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
        roles: 'CLIENT',
        save: jest.fn().mockResolvedValue(true),
        get: function() { return this; }
    };

    beforeAll(async () => {
        await importControlador();
    });

    beforeEach(() => {
        jest.clearAllMocks();
        controladorCliente = new ControladorCliente();
    });

    describe('actualizarUsuario', () => {
        it('debe actualizar un usuario existente', async () => {
            const datosActualizacion = {
                email: 'nuevo@test.com',
                nombre: 'Juan Updated',
                telefono: '999888777'
            };

            const clienteActualizado = {
                ...clienteMock,
                ...datosActualizacion,
                save: jest.fn().mockResolvedValue(true)
            };

            Cliente.findByPk.mockResolvedValue(clienteActualizado);

            const resultado = await controladorCliente.actualizarUsuario(
                clienteMock.cliente_id,
                datosActualizacion.email,
                null,
                datosActualizacion.nombre,
                'Pérez',
                datosActualizacion.telefono,
                'Calle Test 1',
                'CLIENT'
            );

            expect(Cliente.findByPk).toHaveBeenCalledWith(clienteMock.cliente_id);
            expect(resultado.email).toBe(datosActualizacion.email);
            expect(resultado.nombre).toBe(datosActualizacion.nombre);
            expect(clienteActualizado.save).toHaveBeenCalled();
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
                'CLIENT'
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
                'CLIENT'
            )).rejects.toThrow('User not found');
        });
    });
});