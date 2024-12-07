class GASTO_NOT_FOUND extends Error {
    constructor() {
        super("Gasto no encontrado");
        this.status = 404;
    }
}

class INSTALACION_NOT_FOUND extends Error {
    constructor() {
        super("Instalación no encontrada");
        this.status = 404;
    }
}

class DATOS_GASTO_INVALIDOS extends Error {
    constructor() {
        super("Datos del gasto inválidos o incompletos");
        this.status = 400;
    }
}

class TIPO_GASTO_INVALIDO extends Error {
    constructor() {
        super("Tipo de gasto inválido");
        this.status = 400;
    }
}

class GASTO_LIST_ERROR extends Error {
    constructor() {
        super("Error al obtener la lista de gastos");
        this.status = 500;
    }
}

export const errorsGastos = {
    GASTO_NOT_FOUND,
    INSTALACION_NOT_FOUND,
    DATOS_GASTO_INVALIDOS,
    TIPO_GASTO_INVALIDO,
    GASTO_LIST_ERROR
};

export default errorsGastos;