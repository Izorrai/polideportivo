import controladorAuth from "./controladorAuth.js";
import jwt from "../../config/jwt.js";

async function registro(req, res) {
    try {
        const { nombre, apellido, email, telefono, direccion, contrasena, confirmacionContrasena } = req.body;
        const result = await controladorAuth.registro(nombre, apellido, email, telefono, direccion, contrasena, confirmacionContrasena);
        res.json(result);
    } catch (error) {
        console.error(error);
        if (error.status) {
            res.status(error.status);
        } else {
            res.status(500);
        }
        res.json({ error: error.message });
    }
}

async function login(req, res) {
    try {
        const { email, contrasena } = req.body;
        const usuario = await controladorAuth.login(email, contrasena);
        
        console.log("Usuario encontrado:", {
            cliente_id: usuario.cliente_id,
            email: usuario.email,
            roles: usuario.roles
        });

        const tokenData = {
            cliente_id: usuario.cliente_id,
            roles: usuario.roles
        };
        
        console.log("Datos del token:", tokenData);
        
        const token = jwt.sign(tokenData);
        res.json({token});
    } catch (error) {
        console.error(error);
        if (error.status) {
            res.status(error.status);
        } else {
            res.status(500);
        }
        res.json({ error: error.message });
    }
}

export default {
    registro,
    login
}