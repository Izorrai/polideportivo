import controladorCliente from "./controladorCliente.js";

async function getAllUsuarios(req, res) {
  try {
    const usuarios = await controladorCliente.getAllUsers();
    res.json(usuarios);
  } catch (error) {
    error.status ? res.status(error.status) : res.status(500);
    res.json({ error: error.message });
  }
}

async function buscarUsuarioPorId(req, res) {
  try {
    const id = parseInt(req.params.id);
    const usuario = await controladorCliente.buscarUserPorId(id);

    res.json(usuario);
  } catch (error) {
    error.status ? res.status(error.status) : res.status(500);
    res.json({ error: error.message });
  }
}

async function crearUsuario(req, res) {
  try {
    const { email, contraseña, nombre, apellido, telefono, direccion } =
      req.body;
    const newUser = await controladorCliente.crearUsuario(
      email,
      contraseña,
      nombre,
      apellido,
      telefono,
      direccion
    );
    res.json({ usuario: newUser });
  } catch (error) {
    error.status ? res.status(error.status) : res.status(500);
    res.json({ error: error.message });
  }
}

async function actualizarUsuario(req, res) {
  try {
    const { email, contraseña, nombre, apellido, telefono, direccion } =
      req.body;
    const id = parseInt(req.params.id);

    const updatedUser = await controladorCliente.actualizarUsuario(
      email,
      contraseña,
      nombre,
      apellido,
      telefono,
      direccion,
      id
    );
    res.json({ usuario: updatedUser });
  } catch (error) {
    error.status ? res.status(error.status) : res.status(500);
    res.json({ error: error.message });
  }
}

async function eliminarUsuario(req, res) {
  try {
    const id = parseInt(req.params.id);
    const usuarioAEliminar = await controladorCliente.eliminarUsuario(id);
    res.json({ usuario: usuarioAEliminar });
  } catch (error) {
    error.status ? res.status(error.status) : res.status(500);
    res.json({ error: error.message });
  }
}

export const functions = {
  getAllUsuarios,
  buscarUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
};

export default functions;
