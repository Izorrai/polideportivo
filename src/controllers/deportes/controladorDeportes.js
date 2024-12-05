
import Deporte from "../../models/deportes.js";
import errors from "../../helpers/errorDeportes.js";

class ControladorDeportes {
  
  async TodosLosDeportes() {
    
      const deportes = await Deporte.findAll();
      
      if (!deportes)throw new errors.ERROR_LISTA_DEPORTES();
      /* return deportes.map(deporte => deporte.get()); */
      return deportes;
    } 
  


  async ObtenerDeportePorId(id) {    
      const deporte = await Deporte.findByPk(id);
      
      if (!deporte)throw new errors.DEPORTE_NO_ENCONTRADO();
      return deporte;
  
  }


  async crearDeporte(deporte) {
      if(!nombre || !descripcion) throw new errors.FALTAN_DATOS_DEPORTE();

      const viejoDeporte = await Deporte.findOne({ where: { nombre } });
      if (viejoDeporte) throw new errors.DEPORTE_YA_EXISTE();
      const nuevoDeporte = await Deporte.create(deporte);
      if (!deporte)throw new errors.DEPORTE_NO_CREADO();
      return nuevoDeporte;
  }

  async borrarDeporte(id) {
    
      const deporte = await Deporte.findByPk(id);
      if (!deporte) {
        throw new errors.DEPORTE_NO_ENCONTRADO();
      }
      await deporte.destroy();
      return deporte;
   
  }



}

export default ControladorDeportes;
