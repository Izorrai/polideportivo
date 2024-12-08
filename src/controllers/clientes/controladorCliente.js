import { hashcontrasena } from "../../config/bcrypt.js";
import Cliente from "../../models/cliente.js";
import errors from "../../helpers/errorUsuarios.js";

/**
 * Controlador para gestionar las operaciones de los clientes.
 */
class ControladorCliente {

  /**
   * Obtiene todos los usuarios.
   * @returns {Promise<Array>} Lista de todos los usuarios.
   * @throws {Error} Si no se pueden obtener los usuarios.
   */
  async getAllUsers() {
    const usuarios = await Cliente.findAll();
    if (!usuarios) throw new errors.USER_LIST_ERROR();
    return usuarios;
  }

  /**
   * Busca un usuario por su ID.
   * @param {number} id - El ID del usuario.
   * @returns {Promise<Object>} El usuario encontrado.
   * @throws {Error} Si no se encuentra el usuario.
   */
  async buscarUserPorId(id) {
    const usuario = await Cliente.findByPk(id, {
      attributes: { exclude: ['contrasena'] }
    });
    if (!usuario) throw new errors.USER_NOT_FOUND();
    return usuario;
  }

  /**
   * Busca un usuario por su correo electrónico.
   * @param {string} email - El correo electrónico del usuario.
   * @returns {Promise<Object|null>} El usuario encontrado o null si no existe.
   * @throws {Error} Si ocurre un error durante la búsqueda.
   */
  async buscarPorEmail(email) {
    try {
      const usuario = await Cliente.findOne({
        where: { email: email }
      });
      return usuario;
    } catch (error) {
      throw new Error('Error al buscar usuario');
    }
  }

  /**
   * Crea un nuevo usuario.
   * @param {string} nombre - El nombre del usuario.
   * @param {string} apellido - El apellido del usuario.
   * @param {string} email - El correo electrónico del usuario.
   * @param {string} telefono - El número de teléfono del usuario.
   * @param {string} direccion - La dirección del usuario.
   * @param {string} contrasena - La contraseña del usuario.
   * @param {string} [role="CLIENT"] - El rol del usuario (opcional).
   * @returns {Promise<Object>} El nuevo usuario creado.
   * @throws {Error} Si faltan datos o el usuario ya existe.
   */
  async crearUsuario(nombre, apellido, email, telefono, direccion, contrasena, roles = "CLIENTE") {
    if (!nombre || !apellido || !email || !telefono || !direccion || !contrasena) {
      throw new errors.FALTAN_DATOS_USUARIO();
    }
    const oldUser = await this.buscarPorEmail(email);
    if (oldUser) {
      throw new errors.USER_ALREADY_EXISTS();
    }
    const hash = await hashcontrasena(contrasena);
    const nuevoUsuario = await Cliente.create({
      nombre,
      apellido,
      email,
      telefono,
      direccion,
      contrasena: hash,
      roles 
    });
    return nuevoUsuario;
  }

  /**
   * Actualiza un usuario existente.
   * @param {number} cliente_id - El ID del cliente a actualizar.
   * @param {string} [email] - El nuevo correo electrónico del usuario (opcional).
   * @param {string} [contrasena] - La nueva contraseña del usuario (opcional).
   * @param {string} [nombre] - El nuevo nombre del usuario (opcional).
   * @param {string} [apellido] - El nuevo apellido del usuario (opcional).
   * @param {string} [telefono] - El nuevo teléfono del usuario (opcional).
   * @param {string} [direccion] - La nueva dirección del usuario (opcional).
   * @param {string} [roles] - Los nuevos roles del usuario (opcional).
   * @returns {Promise<Object>} El usuario actualizado.
   * @throws {Error} Si el usuario no se encuentra.
   */
  async actualizarUsuario(cliente_id, email, contrasena, nombre, apellido, telefono, direccion, roles) {
    const usuario = await Cliente.findByPk(cliente_id);
    if (!usuario) {
      throw new errors.USER_NOT_FOUND();
    }
    usuario.email = email || usuario.email;
    usuario.contrasena = contrasena || usuario.contrasena;
    usuario.nombre = nombre || usuario.nombre;
    usuario.apellido = apellido || usuario.apellido;
    usuario.telefono = telefono || usuario.telefono;
    usuario.direccion = direccion || usuario.direccion;
    usuario.roles = roles || usuario.roles;

    if (contrasena) {
      const hash = await hashcontrasena(contrasena);
      usuario.contrasena = hash;
    }

    await usuario.save();
    return usuario;
  }

  /**
   * Actualiza el perfil de un usuario (en el contexto del usuario autenticado).
   * @param {number} cliente_id - El ID del cliente a actualizar.
   * @param {string} email - El nuevo correo electrónico del usuario (opcional).
   * @param {string} contrasena - La nueva contraseña del usuario (opcional).
   * @param {string} nombre - El nuevo nombre del usuario (opcional).
   * @param {string} apellido - El nuevo apellido del usuario (opcional).
   * @param {string} telefono - El nuevo teléfono del usuario (opcional).
   * @param {string} direccion - La nueva dirección del usuario (opcional).
   * @param {string} roles - Los nuevos roles del usuario (opcional).
   * @returns {Promise<Object>} El usuario actualizado.
   * @throws {Error} Si el usuario no se encuentra.
   */
  async actualizarUsuarioPerfil(cliente_id, email, contrasena, nombre, apellido, telefono, direccion, roles) {
    const usuario = await Cliente.findByPk(cliente_id);
    if (!usuario) {
      throw new errors.USER_NOT_FOUND();
    }

    usuario.email = email || usuario.email;
    usuario.contrasena = contrasena || usuario.contrasena;
    usuario.nombre = nombre || usuario.nombre;
    usuario.apellido = apellido || usuario.apellido;
    usuario.telefono = telefono || usuario.telefono;
    usuario.direccion = direccion || usuario.direccion;
    usuario.roles = roles || usuario.roles;

    if (contrasena) {
      const hash = await hashcontrasena(contrasena);
      usuario.contrasena = hash;
    }

    await usuario.save();
    return usuario;
  }


  /**
   * Elimina un usuario.
   * @param {number} id - El ID del usuario a eliminar.
   * @returns {Promise<Object>} El usuario eliminado.
   * @throws {Error} Si el usuario no se encuentra.
   */
  async eliminarUsuario(id) {
    const borrarUsuario = await Cliente.findByPk(id);
    if (!borrarUsuario) {
      throw new errors.USER_NOT_FOUND();
    }
    await borrarUsuario.destroy();
    return borrarUsuario;
  }
}

export default ControladorCliente;
