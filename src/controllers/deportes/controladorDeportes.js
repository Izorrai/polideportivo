
import Deporte from "../../models/deportes.js";

class ControladorDeportes {
  
  async TodosLosDeportes() {
    try {
      const deportes = await Deporte.findAll();
      console.log(deportes);
      
      return deportes.map(deporte => deporte.get());
    } catch (error) {
      console.error('Error al obtener los deportes:', error);
      throw new Error('Error al obtener los deportes');
    }
  }
}

export default ControladorDeportes;
