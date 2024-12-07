class DEPORTE_NOT_FOUND extends Error {
  constructor() {
      super("Deporte no encontrado");
      this.status = 404;
  }
}

class FALTAN_DATOS_DEPORTE extends Error {
  constructor() {
      super("Faltan datos del deporte");
      this.status = 400;
  }
}

class DEPORTE_YA_EXISTE extends Error {
  constructor() {
      super("El deporte ya existe");
      this.status = 409;
  }
}

class DEPORTE_LIST_ERROR extends Error {  // Cambiado de ERROR_LISTA_DEPORTES a DEPORTE_LIST_ERROR
  constructor() {
      super("Error al obtener la lista de deportes");
      this.status = 500;
  }
}

class DEPORTE_NO_CREADO extends Error {
  constructor() {
      super("No se pudo crear el deporte");
      this.status = 500;
  }
}

export const errors = {
  DEPORTE_NOT_FOUND,
  FALTAN_DATOS_DEPORTE,
  DEPORTE_YA_EXISTE,
  DEPORTE_LIST_ERROR,  // Actualizado aquí también
  DEPORTE_NO_CREADO
};

export default errors;