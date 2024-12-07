import { jest } from '@jest/globals';

// Desactivar console.log durante los tests
global.console.log = jest.fn();
global.console.error = jest.fn();

// Mock de modelos
jest.mock('../src/models/deportes.js', () => ({
    default: {
        findAll: jest.fn(),
        findByPk: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn(),
        belongsToMany: jest.fn()
    }
}));

jest.mock('../src/models/instalacion.js', () => ({
    default: {
        findAll: jest.fn(),
        findByPk: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn(),
        belongsToMany: jest.fn()
    }
}));

jest.mock('../src/models/relations.js', () => ({
    initializeRelations: jest.fn()
}));