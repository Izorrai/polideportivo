import Clase from "../../models/clases.js";
import InscripcionClase from "../../models/InscripcionClase.js";


// obtener todas las clases
async function obtenerClases(req, res) {
    try {
        const clases = await Clase.findAll();
        res.status(200).json({
            status: 'success',
            data: clases
        });
    } catch (error) {
        console.error('Error al obtener las clases:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener las clases',
            error: error.message
        });
    }
    
}

//obtener clases que no esten completas
async function obtenerClasesDisponibles(req, res) {
    try {
        
        const clases = await Clase.findAll({
            attributes: ['clase_id', 'capacidad_maxima']
        });

        
        const clasesConInscripciones = await Promise.all(clases.map(async (clase) => {
            const inscripcionesCount = await InscripcionClase.count({
                where: {
                    clase_id: clase.clase_id
                }
            });
            
            return {
                ...clase.toJSON(),
                inscripcionesCount
            };
        }));

        
        const clasesDisponibles = clasesConInscripciones.filter(clase => clase.inscripcionesCount < clase.capacidad_maxima);

        
        res.status(200).json({
            status: 'success',
            data: clasesDisponibles
        });
    } catch (error) {
        console.error('Error al obtener las clases:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener las clases',
            error: error.message
        });
    }
}

export const functions = {
    obtenerClases,
    obtenerClasesDisponibles
};

export default functions;
