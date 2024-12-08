import Empleado from "../../models/empleado.js";
import errors from "../../helpers/errorEmpleados.js";

/**
 * Controlador para gestionar las operaciones relacionadas con los empleados.
 */
class ControladorEmpleados {
  
  /**
   * Obtiene todos los empleados.
   * @returns {Promise<Array>} Lista de todos los empleados.
   * @throws {Error} Si ocurre un error al obtener los empleados.
   */
  async obtenerTodosEmpleados() {
    try {
      const empleados = await Empleado.findAll();
      if (!empleados) throw new errors.EMPLEADO_LIST_ERROR();
      return empleados;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Obtiene un empleado por su ID.
   * @param {number} empleado_id - El ID del empleado.
   * @returns {Promise<Object>} El empleado encontrado.
   * @throws {Error} Si el empleado no se encuentra.
   */
  async obtenerEmpleadoPorId(empleado_id) {
    const empleado = await Empleado.findByPk(empleado_id);
    if (!empleado) throw new errors.EMPLEADO_NOT_FOUND();
    return empleado;
  }

  /**
   * Verifica si ya existe un empleado con el mismo DNI o email.
   * @param {string} dni - El DNI del empleado.
   * @param {string} email - El email del empleado.
   * @throws {Error} Si el empleado con el mismo DNI o email ya existe.
   */
  async verificarEmpleadoExistente(dni, email) {
    try {
        // Verificar DNI
        const existeDNI = await Empleado.findOne({
            where: { dni }
        });
        
        if (existeDNI) {
            throw new errors.EMPLEADO_YA_EXISTE();
        }

        // Verificar email solo si se proporciona uno
        if (email) {
            const existeEmail = await Empleado.findOne({
                where: { email }
            });
            
            if (existeEmail) {
                throw new errors.EMPLEADO_YA_EXISTE();
            }
        }
    } catch (error) {
        throw error;
    }
}

  /**
   * Crea un nuevo empleado.
   * @param {Object} datosEmpleado - Los datos del nuevo empleado.
   * @param {string} datosEmpleado.nombre - El nombre del empleado.
   * @param {string} datosEmpleado.apellidos - Los apellidos del empleado.
   * @param {string} datosEmpleado.dni - El DNI del empleado.
   * @param {string} datosEmpleado.telefono - El teléfono del empleado.
   * @param {string} datosEmpleado.email - El email del empleado.
   * @param {string} datosEmpleado.puesto - El puesto del empleado.
   * @returns {Promise<Object>} El nuevo empleado creado.
   * @throws {Error} Si faltan datos o si el empleado ya existe.
   */
  async crearEmpleado(datosEmpleado) {
    const { nombre, apellidos, dni, telefono, email, puesto } = datosEmpleado;

    if (!nombre || !apellidos || !dni) {
      throw new errors.DATOS_EMPLEADO_INVALIDOS();
    }

    await this.verificarEmpleadoExistente(dni, email);
    return await Empleado.create({
      ...datosEmpleado,
      fecha_contratacion: new Date()
    });
  }

  /**
   * Actualiza los datos de un empleado.
   * @param {number} empleado_id - El ID del empleado a actualizar.
   * @param {Object} datosActualizacion - Los datos a actualizar.
   * @returns {Promise<Object>} El empleado actualizado.
   * @throws {Error} Si el empleado no se encuentra o si hay datos inválidos.
   */
  async actualizarEmpleado(empleado_id, datosActualizacion) {
    const empleado = await this.obtenerEmpleadoPorId(empleado_id);
    
    // Verificar si se está intentando actualizar DNI o email
    if (datosActualizacion.dni || datosActualizacion.email) {
        // Solo verificar si al menos uno de los valores es diferente al actual
        if (datosActualizacion.dni !== empleado.dni || datosActualizacion.email !== empleado.email) {
            // Usar el valor actual si no se proporciona uno nuevo
            await this.verificarEmpleadoExistente(
                datosActualizacion.dni || empleado.dni,
                datosActualizacion.email || empleado.email
            );
        }
    }

    await empleado.update(datosActualizacion);
    return empleado;
}

  /**
   * Elimina un empleado.
   * @param {number} empleado_id - El ID del empleado a eliminar.
   * @returns {Promise<Object>} El empleado eliminado.
   * @throws {Error} Si el empleado no se encuentra.
   */
  async eliminarEmpleado(empleado_id) {
    const empleado = await this.obtenerEmpleadoPorId(empleado_id);
    await empleado.destroy();
    return empleado;
  }
}



export default ControladorEmpleados;
