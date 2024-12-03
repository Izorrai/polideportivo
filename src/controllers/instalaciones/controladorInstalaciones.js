import Instalacion from "../../models/instalacion.js";


class ControladorInstalaciones {
  
  async TodasLasInstalaciones() {
    try {
      const instalaciones = await Instalacion.findAll();
      console.log(instalaciones);
      
      return instalaciones.map(instalaciones => instalaciones.get());
    } catch (error) {
      console.error('Error al obtener las instalaciones:', error);
      throw new Error('Error al obtener las instalaciones');
    }
  }

  async crearInstalaciones(datosInstalacion) {
    try {
      console.log('Datos recibidos:', datosInstalacion);
      const nuevaInstalacion = await Instalacion.create(datosInstalacion);
      return nuevaInstalacion;
    } catch (error) {
      console.error('Error al crear la instalación:', error);
      throw error;
    }
  }



  async obtenerInstalacionesPorId(req, res) {
    const controladorInstalaciones = new ControladorInstalaciones();
    try {
      const instalaciones = await instalaciones.findbyPk(instalacion_id);
      if (!instalaciones) {
        return res.status(404).json({
          status: 'error',
          message: 'Instalaciones no encontradas'
        });
      }
      res.status(200).json({
        status: 'success',
        data: instalaciones
      });
    } catch (error) {
      console.error('Error al obtener las instalaciones:', error);
      res.status(500).json({
        status: 'error',
        message: 'Error al obtener las instalaciones',
        error: error.message
      });
    }
  }


}

export default ControladorInstalaciones;

