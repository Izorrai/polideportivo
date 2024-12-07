import { jest } from '@jest/globals';
import ControladorDeportes from '../../controllers/deportes/controladorDeportes.js';
import Deporte from '../../models/deportes.js';

// Mockear los métodos del modelo Deporte
Deporte.findAll = jest.fn();
Deporte.findByPk = jest.fn();
Deporte.create = jest.fn();
Deporte.findOne = jest.fn();
Deporte.destroy = jest.fn();

describe('ControladorDeportes', () => {
    let controladorDeporte;
    
    const deportesMock = [
        { 
            id: 1, 
            nombre: 'Fútbol', 
            descripcion: 'Deporte de equipo',
            get: function() { return this; }
        },
        { 
            id: 2, 
            nombre: 'Baloncesto', 
            descripcion: 'Deporte de canasta',
            get: function() { return this; }
        }
    ];

    beforeEach(() => {
        // Limpiar todos los mocks antes de cada test
        jest.clearAllMocks();
        controladorDeporte = new ControladorDeportes();
    });

    describe('TodosLosDeportes', () => {
        it('debe retornar una lista de deportes', async () => {
            Deporte.findAll.mockResolvedValue(deportesMock);

            const deportes = await controladorDeporte.TodosLosDeportes();
            
            expect(Deporte.findAll).toHaveBeenCalled();
            expect(Array.isArray(deportes)).toBeTruthy();
            expect(deportes).toHaveLength(2);
            expect(deportes[0]).toEqual(expect.objectContaining({
                id: 1,
                nombre: 'Fútbol',
                descripcion: 'Deporte de equipo'
            }));
        });

        it('debe manejar errores al obtener deportes', async () => {
            Deporte.findAll.mockRejectedValue(new Error('Error de base de datos'));

            await expect(controladorDeporte.TodosLosDeportes())
                .rejects
                .toThrow('Error de base de datos');
        });
    });

    describe('ObtenerDeportePorId', () => {
        it('debe retornar un deporte cuando existe', async () => {
            Deporte.findByPk.mockResolvedValue(deportesMock[0]);

            const deporte = await controladorDeporte.ObtenerDeportePorId(1);

            expect(Deporte.findByPk).toHaveBeenCalledWith(1);
            expect(deporte).toEqual(expect.objectContaining({
                id: 1,
                nombre: 'Fútbol',
                descripcion: 'Deporte de equipo'
            }));
        });

        it('debe lanzar error cuando el deporte no existe', async () => {
            Deporte.findByPk.mockResolvedValue(null);

            await expect(controladorDeporte.ObtenerDeportePorId(999))
                .rejects
                .toThrow('Deporte no encontrado');
        });
    });

    describe('crearDeporte', () => {
        const nuevoDeporte = {
            nombre: 'Tenis',
            descripcion: 'Deporte de raqueta'
        };

        it('debe crear un nuevo deporte correctamente', async () => {
            Deporte.findOne.mockResolvedValue(null);
            Deporte.create.mockResolvedValue({
                id: 3,
                ...nuevoDeporte,
                get: function() { return this; }
            });

            const resultado = await controladorDeporte.crearDeporte(nuevoDeporte);

            expect(Deporte.findOne).toHaveBeenCalled();
            expect(Deporte.create).toHaveBeenCalledWith(nuevoDeporte);
            expect(resultado).toEqual(expect.objectContaining({
                id: 3,
                nombre: 'Tenis',
                descripcion: 'Deporte de raqueta'
            }));
        });

        it('debe lanzar error si faltan datos', async () => {
            const deporteIncompleto = {
                nombre: 'Tenis'
            };

            await expect(controladorDeporte.crearDeporte(deporteIncompleto))
                .rejects
                .toThrow('Faltan datos del deporte');
        });

        it('debe lanzar error si el deporte ya existe', async () => {
            Deporte.findOne.mockResolvedValue(deportesMock[0]);

            await expect(controladorDeporte.crearDeporte(nuevoDeporte))
                .rejects
                .toThrow('El deporte ya existe');
        });
    });

    describe('borrarDeporte', () => {
        it('debe borrar un deporte existente', async () => {
            const deporteABorrar = {
                ...deportesMock[0],
                destroy: jest.fn()
            };
            
            Deporte.findByPk.mockResolvedValue(deporteABorrar);

            const resultado = await controladorDeporte.borrarDeporte(1);

            expect(Deporte.findByPk).toHaveBeenCalledWith(1);
            expect(deporteABorrar.destroy).toHaveBeenCalled();
            expect(resultado).toEqual(expect.objectContaining({
                id: 1,
                nombre: 'Fútbol',
                descripcion: 'Deporte de equipo'
            }));
        });

        it('debe lanzar error al intentar borrar un deporte que no existe', async () => {
            Deporte.findByPk.mockResolvedValue(null);

            await expect(controladorDeporte.borrarDeporte(999))
                .rejects
                .toThrow('Deporte no encontrado');
        });
    });
});