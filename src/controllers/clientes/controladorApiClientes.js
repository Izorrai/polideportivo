import ControladorCliente from "./controladorCliente.js";

const controladorCliente = new ControladorCliente();

async function getAllUsuarios(req, res) {
  try {
    const usuarios = await controladorCliente.getAllUsers();
    res.json(usuarios);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
}

async function buscarUsuarioPorId(req, res) {
  try {
    const id = parseInt(req.params.id);
    const usuario = await controladorCliente.buscarUserPorId(id);
    res.json(usuario);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
}

async function crearUsuario(req, res) {
  try {
    const { email, contraseña, nombre, apellido, telefono, direccion } =
      req.body;
    const newUser = await controladorCliente.crearUsuario(
      nombre,
      apellido,
      email,
      telefono,
      direccion,
      contraseña
    );
    res.json({ usuario: newUser });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
}

async function actualizarUsuario(req, res) {
  try {
    const { email, contraseña, nombre, apellido, telefono, direccion } =
      req.body;
    const id = parseInt(req.params.id);

    const updatedUser = await controladorCliente.actualizarUsuario(
      id,
      email,
      contraseña,
      nombre,
      apellido,
      telefono,
      direccion
    );
    res.json({ usuario: updatedUser });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
}

async function actualizarUsuarioPerfil(req, res) {
  try {
    const cliente_id = req.user.cliente_id;
    const { email, contrasena, nombre, apellido, telefono, direccion, roles } = req.body;

    // Primero, obtenemos al usuario actual
    const usuario = await controladorCliente.actualizarUsuarioPerfil(cliente_id, email, contrasena, nombre, apellido, telefono, direccion, roles);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Respondemos con el usuario actualizado
    return res.json({ usuario: usuario });

  } catch (error) {
    // Si hay un error en cualquier parte del proceso, lo manejamos y respondemos con un mensaje
    return res.status(500).json({ error: error.message });
  }
}


async function eliminarUsuario(req, res) {
  try {
    const id = parseInt(req.params.id);
    const usuarioAEliminar = await controladorCliente.eliminarUsuario(id);
    res.json({ usuario: usuarioAEliminar });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
}

export const functions = {
  getAllUsuarios,
  buscarUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  actualizarUsuarioPerfil,
  eliminarUsuario,
};

export default functions;
