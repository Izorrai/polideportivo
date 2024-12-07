class EMPLEADO_NOT_FOUND extends Error {
    constructor() {
        super("Empleado no encontrado");
        this.status = 404;
    }
}

class EMPLEADO_YA_EXISTE extends Error {
    constructor() {
        super("Ya existe un empleado con ese DNI o email");
        this.status = 409;
    }
}

class DATOS_EMPLEADO_INVALIDOS extends Error {
    constructor() {
        super("Datos de empleado inválidos o incompletos");
        this.status = 400;
    }
}

class EMPLEADO_LIST_ERROR extends Error {
    constructor() {
        super("Error al obtener la lista de empleados");
        this.status = 500;
    }
}

export const errorsEmpleados = {
    EMPLEADO_NOT_FOUND,
    EMPLEADO_YA_EXISTE,
    DATOS_EMPLEADO_INVALIDOS,
    EMPLEADO_LIST_ERROR
};

export default errorsEmpleados;