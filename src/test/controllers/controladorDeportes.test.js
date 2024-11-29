import ControladorDeportes from '../../controllers/controladorDeportes.js';


describe('ControladorDeportes', () => {
    let controladorDeportes;

    beforeEach(() => {
        controladorDeportes = new ControladorDeportes();
    });

    it('debe retornar una lista de deportes', async () => {
        
        const deportes = await controladorDeportes.TodosLosDeportes();

        
        expect(Array.isArray(deportes)).toBeTruthy(); 
        expect(deportes.length).toBeGreaterThan(0);   
        expect(typeof deportes[0]).toBe("object"); 
    });
});
