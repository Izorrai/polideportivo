import controladorCliente from "../clientes/controladorCliente.js";
import { verificarcontrasena } from "../../config/bcrypt.js";
import errors  from "../../helpers/errorUsuarios.js"; 

async function registro (nombre,apellido,email,telefono,direccion,contrasena,confirmacionContrasena){
    if(contrasena!= confirmacionContrasena){
        throw new errors.PASSWORDS_DONT_MATCH();
    }
    const usuarioAntiguo = await controladorCliente.buscarPorEmail(email);
    if(usuarioAntiguo){
        throw new errors.USER_ALREADY_EXISTS();
    }
    const nuevoUsuario = await controladorCliente.crearUsuario(nombre,apellido,email,telefono,direccion,contrasena);
    return nuevoUsuario;
}

async function login(email, contrasena) {
    const usuario = await controladorCliente.buscarPorEmail(email);
    console.log('Usuario encontrado:', usuario ? usuario.toJSON() : null);
    
    if (!usuario) {
        throw new errors.USER_NOT_FOUND(); 
    }
    
    const verificada = await verificarcontrasena(contrasena, usuario.contrasena);
    if (!verificada) {
        throw new errors.INVALID_CREDENTIALS();
    }
    
    // Recargar usuario para datos actualizados
    const usuarioActualizado = await controladorCliente.buscarUserPorId(usuario.cliente_id);
    console.log('Usuario actualizado:', usuarioActualizado ? usuarioActualizado.toJSON() : null);
    
    return usuarioActualizado;
}

export default {
    registro,
    login
}