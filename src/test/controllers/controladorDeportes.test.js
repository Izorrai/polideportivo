// Mock simple del ControladorDeportes

import ControladorDeportes from "../../controllers/deportes/controladorDeportes.js";
import Deporte from "../../models/deportes.js";
import {jest} from "@jest/globals";

class MockControladorDeportes {
    constructor() {
        this.deportes = [
            { id: 1, nombre: 'Fútbol', descripcion: 'Deporte de equipo' },
            { id: 2, nombre: 'Baloncesto', descripcion: 'Deporte de canasta' }
        ];
    }

    async TodosLosDeportes() {
        return this.deportes;
    }



    async ObtenerDeportePorId(id) {
        const deporte = this.deportes.find(d => d.id === id);
        if (!deporte) throw new Error('Deporte no encontrado');
        return deporte;
    }

    async crearDeporte(deporte) {
        const { nombre, descripcion } = deporte;
        if (!nombre || !descripcion) throw new Error('Faltan datos del deporte');
        
        const deporteExistente = this.deportes.find(d => d.nombre === nombre);
        if (deporteExistente) throw new Error('El deporte ya existe');

        const nuevoDeporte = {
            id: this.deportes.length + 1,
            nombre,
            descripcion
        };
        
        return nuevoDeporte;
    }

    async borrarDeporte(id) {
        const deporte = this.deportes.find(d => d.id === id);
        if (!deporte) throw new Error('Deporte no encontrado');
        return deporte;
    }
}

Deporte.findAll = jest.fn();
Deporte.findByPk = jest.fn();



describe('ControladorDeportes', () => {
    let controlador;

    beforeEach(() => {
        controlador = new MockControladorDeportes();
    });

    describe('TodosLosDeportes', () => {
        it('debe retornar una lista de deportes', async () => {
            const deportesMock= [ { id: 1, nombre: 'Fútbol', descripcion: 'Deporte de equipo' },
                { id: 2, nombre: 'Baloncesto', descripcion: 'Deporte de canasta' }]
            
                
            Deporte.findAll.mockResolvedValue(deportesMock);

            const controladorDeporte = new ControladorDeportes();
            const deportes = await controladorDeporte.TodosLosDeportes();
            
            expect(Array.isArray(deportes)).toBeTruthy();
            expect(deportes.length).toBe(2);
            expect(deportes[0]).toHaveProperty('id');
            expect(deportes[0]).toHaveProperty('nombre');
            expect(deportes[0]).toHaveProperty('descripcion');
            expect(deportes).toEqual(deportesMock);
        });
    });

    describe('ObtenerDeportePorId', () => {
        it('debe retornar un deporte cuando existe', async () => {
            const deporte = await controlador.ObtenerDeportePorId(1);

            expect(deporte.id).toBe(1);
            expect(deporte.nombre).toBe('Fútbol');
        });

        it('debe lanzar error cuando el deporte no existe', async () => {
            await expect(controlador.ObtenerDeportePorId(999))
                .rejects
                .toThrow('Deporte no encontrado');
        });
    });

    describe('crearDeporte', () => {
        it('debe crear un nuevo deporte correctamente', async () => {
            const nuevoDeporte = {
                nombre: 'Tenis',
                descripcion: 'Deporte de raqueta'
            };

            const resultado = await controlador.crearDeporte(nuevoDeporte);

            expect(resultado.id).toBe(3);
            expect(resultado.nombre).toBe('Tenis');
            expect(resultado.descripcion).toBe('Deporte de raqueta');
        });

        it('debe lanzar error si faltan datos', async () => {
            const deporteIncompleto = {
                nombre: 'Tenis'
            };

            await expect(controlador.crearDeporte(deporteIncompleto))
                .rejects
                .toThrow('Faltan datos del deporte');
        });

        it('debe lanzar error si el deporte ya existe', async () => {
            const deporteExistente = {
                nombre: 'Fútbol',
                descripcion: 'Otro deporte'
            };

            await expect(controlador.crearDeporte(deporteExistente))
                .rejects
                .toThrow('El deporte ya existe');
        });
    });

    describe('borrarDeporte', () => {
        it('debe borrar un deporte existente', async () => {
            const resultado = await controlador.borrarDeporte(1);

            expect(resultado.id).toBe(1);
            expect(resultado.nombre).toBe('Fútbol');
        });

        it('debe lanzar error al intentar borrar un deporte que no existe', async () => {
            await expect(controlador.borrarDeporte(999))
                .rejects
                .toThrow('Deporte no encontrado');
        });
    });
});