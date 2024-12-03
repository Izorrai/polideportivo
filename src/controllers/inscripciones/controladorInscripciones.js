import InscripcionClase from "../../models/InscripcionClase.js";
import Clase from "../../models/clases.js";
import jwt from "../../config/jwt.js";



async function obtenerInscripciones(req, res) {
    try {
        const inscripciones = await InscripcionClase.findAll();
        res.status(200).json({
            status: 'success',
            data: inscripciones
        });
    } catch (error) {
        console.error('Error al obtener las inscripciones:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener las inscripciones',
            error: error.message
        });
    }
}



async function crearInscripcion(req, res) {
    const { cliente_id, clase_id } = req.body;

    try {
        const clase = await Clase.findByPk(clase_id);    
        if (!clase) {
            return res.status(404).json({
                status: 'error',
                message: 'Clase no encontrada'
            });
        }

        
        const inscripcionExistente = await InscripcionClase.findOne({
            where: {
                cliente_id: cliente_id,
                clase_id: clase_id
            }
        });

        if (inscripcionExistente) {
            return res.status(400).json({
                status: 'error',
                message: 'Ya te has inscrito en esta clase'
            });
        }

        
        const inscripcionesCount = await InscripcionClase.count({
            where: {
                clase_id: clase_id
            }
        });

        
        if (inscripcionesCount >= clase.capacidad_maxima) {        
            return res.status(400).json({
                status: 'error',
                message: 'Clase completa'
            });
        }

        
        const nuevaInscripcion = await InscripcionClase.create({
            cliente_id: cliente_id, 
            clase_id: clase_id
        });

        res.status(201).json({
            status: 'success',
            message: 'Inscripción creada exitosamente',
            data: nuevaInscripcion
        });
    } catch (error) {
        console.error('Error al crear la inscripción:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error al crear la inscripción',
            error: error.message
        });
    }
}



async function crearInscripcionPerfil(req, res) {
    console.log('Datos del request:', {
        user: req.user,
        body: req.body,
        headers: req.headers
    });

    if (!req.user) {
        return res.status(401).json({
            status: 'error',
            message: 'Usuario no autenticado'
        });
    }

    if (!req.user.cliente_id) {
        return res.status(401).json({
            status: 'error',
            message: 'ID de cliente no encontrado en el token'
        });
    }

    const { clase_id } = req.body;
    const cliente_id = req.user.cliente_id;

    console.log('Datos de la inscripción:', {
        cliente_id,
        clase_id
    });

    try {
        const clase = await Clase.findByPk(clase_id);    
        if (!clase) {
            return res.status(404).json({
                status: 'error',
                message: 'Clase no encontrada'
            });
        }

        const inscripcionExistente = await InscripcionClase.findOne({
            where: {
                cliente_id: cliente_id,
                clase_id: clase_id
            }
        });

        if (inscripcionExistente) {
            return res.status(400).json({
                status: 'error',
                message: 'Ya te has inscrito en esta clase'
            });
        }

        const inscripcionesCount = await InscripcionClase.count({
            where: {
                clase_id: clase_id
            }
        });

        if (inscripcionesCount >= clase.capacidad_maxima) {        
            return res.status(400).json({
                status: 'error',
                message: 'Clase completa'
            });
        }

        const nuevaInscripcion = await InscripcionClase.create({
            cliente_id: cliente_id, 
            clase_id: clase_id
        });

        res.status(201).json({
            status: 'success',
            message: 'Inscripción creada exitosamente',
            data: nuevaInscripcion
        });
    } catch (error) {
        console.error('Error al crear la inscripción:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error al crear la inscripción',
            error: error.message
        });
    }
}

async function obtenerMisInscripciones(req, res) {
    console.log('Datos del request en obtenerMisInscripciones:', {
        user: req.user,
        headers: req.headers
    });

    if (!req.user) {
        return res.status(401).json({
            status: 'error',
            message: 'Usuario no autenticado'
        });
    }

    if (!req.user.cliente_id) {
        return res.status(401).json({
            status: 'error',
            message: 'ID de cliente no encontrado en el token'
        });
    }

    try {
        const cliente_id = req.user.cliente_id;
        const inscripciones = await InscripcionClase.findAll({
            where: {
                cliente_id: cliente_id
            },
            include: [Clase]
        });

        res.status(200).json({
            status: 'success',
            data: inscripciones
        });
    } catch (error) {
        console.error('Error al obtener las inscripciones:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener tus inscripciones',
            error: error.message
        });
    }
}

export const functions = {
    obtenerInscripciones,
    crearInscripcion,
    crearInscripcionPerfil,
    obtenerMisInscripciones
};

export default functions;       


