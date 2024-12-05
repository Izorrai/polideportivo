class DEPORTE_NO_ENCONTRADO extends Error {
    constructor() {
      super("deporte no encontrado");
      this.status = 404;
    }
  }
  
  class FALTAN_DATOS_DEPORTE extends Error {
    constructor() {
      super("Faltan datos del deporte");
      this.status = 400;
    }
  }
  
  class ERROR_LISTA_DEPORTES extends Error {
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
  class DEPORTE_YA_EXISTE extends Error {
    constructor(){
        super("El deporte ya existe");
        this.status=409;
    }
  }
  
  class INVALID_CREDENTIALS extends Error{
    constructor(){
        super("Credenciales inválidas");
        this.status=400;
    }
  }
  
  export const errors = {
    DEPORTE_NO_ENCONTRADO,
    FALTAN_DATOS_DEPORTE,
    ERROR_LISTA_DEPORTES,
    DEPORTE_NO_CREADO,
    DEPORTE_YA_EXISTE,
    INVALID_CREDENTIALS
  };
  
  export default errors;
  