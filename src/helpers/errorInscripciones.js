class INSCRIPCION_NOT_FOUND extends Error {
    constructor() {
        super("Inscripción no encontrada");
        this.status = 404;
    }
}

class INSCRIPCION_YA_EXISTE extends Error {
    constructor() {
        super("Ya te has inscrito en esta clase");
        this.status = 400;
    }
}

class CLASE_COMPLETA extends Error {
    constructor() {
        super("La clase está completa");
        this.status = 400;
    }
}

class CLASE_NOT_FOUND extends Error {
    constructor() {
        super("Clase no encontrada");
        this.status = 404;
    }
}

class INSCRIPCION_LIST_ERROR extends Error {
    constructor() {
        super("Error al obtener la lista de inscripciones");
        this.status = 500;
    }
}

class USUARIO_NO_AUTENTICADO extends Error {
    constructor() {
        super("Usuario no autenticado");
        this.status = 401;
    }
}

export const errors = {
    INSCRIPCION_NOT_FOUND,
    INSCRIPCION_YA_EXISTE,
    CLASE_COMPLETA,
    CLASE_NOT_FOUND,
    INSCRIPCION_LIST_ERROR,
    USUARIO_NO_AUTENTICADO
};

export default errors;