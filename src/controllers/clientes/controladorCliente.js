import { hashcontrasena } from "../../config/bcrypt.js";
import Cliente from "../../models/cliente.js";
import errors from "../../helpers/errorUsuarios.js";

async function getAllUsers() {
  const usuarios = await Cliente.findAll();
  if (!usuarios) throw new errors.USER_LIST_ERROR();
  return usuarios;
}


async function buscarUserPorId(id) {
  const usuario = await Cliente.findByPk(id, {
    attributes: { exclude: ['contrasena'] } 
  });
  if (!usuario) throw new errors.USER_NOT_FOUND();
  return usuario;
}

async function buscarPorEmail(email) {
  console.log('Buscando usuario con email:', email);
  try {
      const usuario = await Cliente.findOne({
          where: {
              email: email
          }
      });
      console.log('Usuario encontrado:', usuario);
      return usuario;
  } catch (error) {
      console.error('Error al buscar usuario:', error);
      throw error;
  }
}


async function crearUsuario(nombre,apellido, email, telefono, direccion, contrasena, role = "CLIENT") {
    if (!nombre || !apellido || !email || !telefono || !direccion || !contrasena) {
        throw new errors.FALTAN_DATOS_USUARIO();
    }
    const oldUser = await buscarPorEmail(email);
    if(oldUser){
        throw new errors.USER_ALREADY_EXISTS();
    }
    const hash = await hashcontrasena(contrasena);
    const nuevoUsuario = await Cliente.create({
      nombre,
      apellido,
      email,
      telefono,
      direccion,
      contrasena:hash,
      role
    });
   return nuevoUsuario;
}


async function actualizarUsuario(email, contrasena, nombre, apellido, telefono, direccion, roles) {
  const usuario = await Cliente.findByPk(id);
  if (!usuario) {
    throw new errors.USER_NOT_FOUND();
  }
  usuario.email = email || usuario.email;
  usuario.contrasena = contrasena || usuario.contrasena;
  usuario.nombre = nombre || usuario.nombre;
  usuario.apellidio = apellido || usuario.apellido;
  usuario.telefono = telefono || usuario.telefono;
  usuario.direccion = direccion || usuario.direccion;
  usuario.roles = roles || usuario.roles;
  if(contrasena){
    const hash = await hashcontrasena(contrasena);
    usuario.contrasena=hash;
  }

  await usuario.save();
  return usuario;
}




async function actualizarUsuarioPerfil(email, contrasena, nombre, apellido, telefono, direccion, roles, cliente_id) {

  
  const usuario = await Cliente.findByPk(cliente_id);
  if (!usuario) {
    throw new errors.USER_NOT_FOUND();
  }
  usuario.email = email || usuario.email;
  usuario.contrasena = contrasena || usuario.contrasena;
  usuario.nombre = nombre || usuario.nombre;
  usuario.apellidio = apellido || usuario.apellido;
  usuario.telefono = telefono || usuario.telefono;
  usuario.direccion = direccion || usuario.direccion;
  usuario.roles = roles || usuario.roles;
  if(contrasena){
    const hash = await hashcontrasena(contrasena);
    usuario.contrasena=hash;
  }

  await usuario.save();
  return usuario;
}



async function eliminarUsuario(id) {
  const borrarUsuario = await Cliente.findByPk(id);
    if(!borrarUsuario){
        throw new errors.USER_NOT_FOUND();
    }
    await borrarUsuario.destroy();
    return borrarUsuario;
}

export const functions = {
    getAllUsers,
    buscarUserPorId,
    buscarPorEmail,
    crearUsuario,
    actualizarUsuario,
    actualizarUsuarioPerfil,
    eliminarUsuario,

}
export default functions;
