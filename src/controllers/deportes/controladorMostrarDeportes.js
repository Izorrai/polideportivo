// routes.js o donde tengas definidas las rutas de Express
import express from 'express';
import ControladorDeportes from './controladorDeportes.js';

async function mostrarDeportes(req, res) {
  
  const controladorDeportes = new ControladorDeportes();
  try {
    
    const deportes = await controladorDeportes.TodosLosDeportes();
    
    res.render('deportes', { deportes });
  } catch (error) {
    console.error('Error al mostrar los deportes:', error);
    
    res.status(500).send('Error al obtener los deportes');
  }
}

export const functions = {
  mostrarDeportes
};

export default functions;
