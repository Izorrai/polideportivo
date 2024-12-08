// helpers/errorClases.js

class ClaseError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        this.name = this.constructor.name;
    }
}

class CLASE_NOT_FOUND extends ClaseError {
    constructor() {
        super('Clase no encontrada', 404);
    }
}

class CLASE_LIST_ERROR extends ClaseError {
    constructor() {
        super('Error al obtener la lista de clases', 500);
    }
}

class CLASE_CREATE_ERROR extends ClaseError {
    constructor() {
        super('Error al crear la clase', 500);
    }
}

class CLASE_NO_DISPONIBLE extends ClaseError {
    constructor() {
        super('No hay clases disponibles', 404);
    }
}

class CLASE_COMPLETA extends ClaseError {
    constructor() {
        super('La clase está completa', 400);
    }
}

class CLASE_DATOS_INVALIDOS extends ClaseError {
    constructor(mensaje = 'Los datos proporcionados no son válidos') {
        super(mensaje, 400);
    }
}

class CLASE_DELETE_ERROR extends ClaseError {
    constructor(mensaje = 'Error al eliminar la clase') {
        super(mensaje, 400);
    }
}

export default {
    CLASE_NOT_FOUND,
    CLASE_LIST_ERROR,
    CLASE_CREATE_ERROR,
    CLASE_NO_DISPONIBLE,
    CLASE_COMPLETA,
    CLASE_DATOS_INVALIDOS,
    CLASE_DELETE_ERROR
};