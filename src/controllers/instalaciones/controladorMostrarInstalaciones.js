// routes.js o donde tengas definidas las rutas de Express
import express from 'express';
import ControladorInstalaciones from './controladorInstalaciones.js';
import Reserva from '../../models/reserva.js';
import Instalacion from '../../models/instalacion.js';


async function mostrarInstalaciones(req, res) {
  
  const controladorInstalaciones = new ControladorInstalaciones();
  try {
    
    const instalaciones = await controladorInstalaciones.TodasLasInstalaciones();
    
    res.render('deportes', { instalaciones });
  } catch (error) {
    console.error('Error al mostrar las instalaciones:', error);
    
    res.status(500).send('Error al obtener las instalaciones');
  }
}



export const functions = {
    mostrarInstalaciones
  };
  
  export default functions;
  

