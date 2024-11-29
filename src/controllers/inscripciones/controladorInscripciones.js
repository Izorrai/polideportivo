import InscripcionClase from "../../models/InscripcionClase.js";
import Clase from "../../models/clases.js";


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

        


export const functions = {
    obtenerInscripciones,
    crearInscripcion
};

export default functions;