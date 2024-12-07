class PAGO_NOT_FOUND extends Error {
    constructor() {
        super("Pago no encontrado");
        this.status = 404;
    }
}

class METODO_PAGO_INVALIDO extends Error {
    constructor() {
        super("Método de pago inválido");
        this.status = 400;
    }
}

class PAGO_LIST_ERROR extends Error {
    constructor() {
        super("Error al obtener la lista de pagos");
        this.status = 500;
    }
}

class USUARIO_NO_AUTORIZADO extends Error {
    constructor() {
        super("Usuario no autorizado para ver estos pagos");
        this.status = 401;
    }
}

export const errorsPagos = {
    PAGO_NOT_FOUND,
    METODO_PAGO_INVALIDO,
    PAGO_LIST_ERROR,
    USUARIO_NO_AUTORIZADO
};

export default errorsPagos;