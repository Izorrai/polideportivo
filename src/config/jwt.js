import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET = process.env.JWT_SECRET || "tu-clave-secreta-de-desarrollo";

function sign(data, expiresIn = "30d") {
    console.log('JWT sign - Datos a firmar:', data);
    const token = jwt.sign(data, SECRET, { expiresIn });
    console.log('JWT sign - Token generado');
    return token;
}

function verify(req, res, next) {
    try {
        console.log('JWT verify - Iniciando verificación');
        const authHeader = req.headers['authorization'];
        
        if (!authHeader) {
            console.log('JWT verify - No se encontró header de autorización');
            return res.status(401).json({ error: 'No se proporcionó token' });
        }

        // Extraer el token
        const token = authHeader.startsWith('Bearer ') 
            ? authHeader.slice(7) 
            : authHeader;
        
        console.log('JWT verify - Token extraído');

        // Verificar y decodificar el token
        const decoded = jwt.verify(token, SECRET);
        console.log('JWT verify - Token decodificado:', decoded);

        // Asignar los datos decodificados a req.user
        req.user = decoded;
        console.log('JWT verify - req.user establecido:', req.user);

        next();
    } catch (error) {
        console.error('JWT verify - Error:', error);
        return res.status(401).json({ 
            error: 'Token inválido',
            details: error.message 
        });
    }
}

export default {
    sign,
    verify
};