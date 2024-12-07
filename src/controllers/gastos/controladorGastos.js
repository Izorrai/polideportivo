import Gasto from "../../models/gasto.js";
import Instalacion from "../../models/instalacion.js";
import errors from "../../helpers/errorGastos.js";

/**
 * Controlador para manejar operaciones relacionadas con los gastos.
 * @class
 */
class ControladorGastos {
  
  /**
   * Obtiene todos los gastos, ordenados por fecha.
   * @returns {Promise<Array>} Lista de objetos de gastos con información de la instalación asociada.
   * @throws {errors.GASTO_LIST_ERROR} Si ocurre un error al obtener la lista de gastos.
   */
  async obtenerTodosGastos() {
    try {
      const gastos = await Gasto.findAll({
        include: [{
          model: Instalacion,
          attributes: ['instalacion_id', 'nombre']
        }],
        order: [['fecha', 'DESC']]
      });
      if (!gastos) throw new errors.GASTO_LIST_ERROR();
      return gastos;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Obtiene un gasto por su ID.
   * @param {number} gasto_id - ID del gasto a obtener.
   * @returns {Promise<Object>} Objeto con los datos del gasto.
   * @throws {errors.GASTO_NOT_FOUND} Si no se encuentra el gasto con el ID proporcionado.
   */
  async obtenerGastoPorId(gasto_id) {
    const gasto = await Gasto.findByPk(gasto_id, {
      include: [{
        model: Instalacion,
        attributes: ['instalacion_id', 'nombre']
      }]
    });
    if (!gasto) throw new errors.GASTO_NOT_FOUND();
    return gasto;
  }

  /**
   * Obtiene todos los gastos de una instalación específica.
   * @param {number} instalacion_id - ID de la instalación cuyos gastos se desean obtener.
   * @returns {Promise<Array>} Lista de objetos de gastos asociados a la instalación.
   */
  async obtenerGastosPorInstalacion(instalacion_id) {
    const gastos = await Gasto.findAll({
      where: { instalacion_id },
      include: [{
        model: Instalacion,
        attributes: ['instalacion_id', 'nombre']
      }],
      order: [['fecha', 'DESC']]
    });
    return gastos;
  }

  /**
   * Verifica que el tipo de gasto sea válido.
   * @param {string} tipo - Tipo de gasto a verificar.
   * @throws {errors.TIPO_GASTO_INVALIDO} Si el tipo de gasto no es válido.
   */
  async verificarTipoGasto(tipo) {
    const tiposValidos = ['mantenimiento', 'servicios', 'personal', 'otros'];
    if (tipo && !tiposValidos.includes(tipo)) {
      throw new errors.TIPO_GASTO_INVALIDO();
    }
  }

  /**
   * Verifica que la instalación exista.
   * @param {number} instalacion_id - ID de la instalación a verificar.
   * @throws {errors.INSTALACION_NOT_FOUND} Si la instalación no se encuentra en la base de datos.
   */
  async verificarInstalacion(instalacion_id) {
    const instalacion = await Instalacion.findByPk(instalacion_id);
    if (!instalacion) throw new errors.INSTALACION_NOT_FOUND();
  }

  /**
   * Crea un nuevo gasto.
   * @param {Object} datosGasto - Datos del gasto a crear.
   * @param {string} datosGasto.concepto - Concepto del gasto.
   * @param {number} datosGasto.precio - Precio del gasto.
   * @param {string} datosGasto.fecha - Fecha del gasto en formato 'YYYY-MM-DD'.
   * @param {string} datosGasto.tipo - Tipo de gasto (mantenimiento, servicios, personal, otros).
   * @param {number} datosGasto.instalacion_id - ID de la instalación asociada.
   * @param {string} [datosGasto.descripcion] - Descripción adicional del gasto.
   * @returns {Promise<Object>} El gasto creado.
   * @throws {errors.DATOS_GASTO_INVALIDOS} Si faltan datos requeridos para crear el gasto.
   * @throws {errors.TIPO_GASTO_INVALIDO} Si el tipo de gasto no es válido.
   * @throws {errors.INSTALACION_NOT_FOUND} Si la instalación asociada no existe.
   */
  async crearGasto(datosGasto) {
    const { concepto, precio, fecha, tipo, instalacion_id, descripcion } = datosGasto;

    if (!concepto || !precio || !fecha || !instalacion_id) {
      throw new errors.DATOS_GASTO_INVALIDOS();
    }

    await this.verificarTipoGasto(tipo);
    await this.verificarInstalacion(instalacion_id);

    return await Gasto.create({
      concepto,
      precio,
      fecha,
      tipo,
      instalacion_id,
      descripcion
    });
  }

  /**
   * Actualiza los datos de un gasto existente.
   * @param {number} gasto_id - ID del gasto a actualizar.
   * @param {Object} datosActualizacion - Datos a actualizar en el gasto.
   * @returns {Promise<Object>} El gasto actualizado.
   * @throws {errors.GASTO_NOT_FOUND} Si no se encuentra el gasto con el ID proporcionado.
   * @throws {errors.TIPO_GASTO_INVALIDO} Si el tipo de gasto no es válido.
   * @throws {errors.INSTALACION_NOT_FOUND} Si la instalación asociada no existe.
   */
  async actualizarGasto(gasto_id, datosActualizacion) {
    const gasto = await this.obtenerGastoPorId(gasto_id);
    
    if (datosActualizacion.tipo) {
      await this.verificarTipoGasto(datosActualizacion.tipo);
    }

    if (datosActualizacion.instalacion_id) {
      await this.verificarInstalacion(datosActualizacion.instalacion_id);
    }

    await gasto.update(datosActualizacion);
    return gasto;
  }

  /**
   * Elimina un gasto por su ID.
   * @param {number} gasto_id - ID del gasto a eliminar.
   * @returns {Promise<Object>} El gasto eliminado.
   * @throws {errors.GASTO_NOT_FOUND} Si no se encuentra el gasto con el ID proporcionado.
   */
  async eliminarGasto(gasto_id) {
    const gasto = await this.obtenerGastoPorId(gasto_id);
    await gasto.destroy();
    return gasto;
  }

  /**
   * Obtiene estadísticas generales de los gastos.
   * @returns {Promise<Object>} Estadísticas de los gastos, incluyendo total de gastos, gastos por tipo y por mes.
   */
  async obtenerEstadisticasGastos() {
    const gastos = await Gasto.findAll();
    
    const estadisticas = {
      totalGastos: gastos.reduce((sum, gasto) => sum + Number(gasto.precio), 0),
      gastosPorTipo: {},
      gastosPorMes: {}
    };

    gastos.forEach(gasto => {
      // Agrupar por tipo
      if (gasto.tipo) {
        estadisticas.gastosPorTipo[gasto.tipo] = (estadisticas.gastosPorTipo[gasto.tipo] || 0) + Number(gasto.precio);
      }

      // Agrupar por mes
      const mes = new Date(gasto.fecha).toLocaleString('default', { month: 'long', year: 'numeric' });
      estadisticas.gastosPorMes[mes] = (estadisticas.gastosPorMes[mes] || 0) + Number(gasto.precio);
    });

    return estadisticas;
  }
}

export default ControladorGastos;
