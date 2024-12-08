// errorInstalaciones.js
class INSTALACION_NOT_FOUND extends Error {
    constructor() {
        super('Instalación no encontrada');
        this.status = 404;
    }
}

class INSTALACION_LIST_ERROR extends Error {
    constructor() {
        super('Error al obtener la lista de instalaciones');
        this.status = 500;
    }
}

class INSTALACION_YA_RESERVADA extends Error {
    constructor() {
        super('La instalación ya está reservada para esa fecha y hora');
        this.status = 400;
    }
}

class DATOS_INSTALACION_INVALIDOS extends Error {
    constructor() {
        super('Faltan datos necesarios para la instalación');
        this.status = 400;
    }
}

class DATOS_RESERVA_INVALIDOS extends Error {
    constructor(message = 'Datos de reserva inválidos o incompletos') {
        super(message);
        this.status = 400;
    }
}

class RESERVA_ERROR extends Error {
    constructor() {
        super('Error al crear la reserva');
        this.status = 500;
    }
}

class USUARIO_NO_AUTENTICADO extends Error {
    constructor() {
        super('Usuario no autenticado');
        this.status = 401;
    }
}

const errors = {
    INSTALACION_NOT_FOUND,
    INSTALACION_LIST_ERROR,
    INSTALACION_YA_RESERVADA,
    DATOS_INSTALACION_INVALIDOS,
    DATOS_RESERVA_INVALIDOS,
    RESERVA_ERROR,
    USUARIO_NO_AUTENTICADO
};

export default errors;