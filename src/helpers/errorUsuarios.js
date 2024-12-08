class USER_NOT_FOUND extends Error {
  constructor() {
    super("User not found");
    this.status = 404;
  }
}

class FALTAN_DATOS_USUARIO extends Error {
  constructor() {
    super("Faltan datos del usuario");
    this.status = 400;
  }
}

class USER_LIST_ERROR extends Error {
  constructor() {
    super("Error al obtener la lista de usuarios");
    this.status = 500;
  }
}

class USUARIO_NO_CREADO extends Error {
  constructor() {
    super("No se pudo crear el usuario");
    this.status = 500;
  }
}

class USER_ALREADY_EXISTS extends Error {
  constructor() {
    super("El usuario ya existe");
    this.status = 409;
  }
}

class PASSWORDS_DONT_MATCH extends Error {
  constructor() {
    super("Las contrasenas no coinciden");
    this.status = 400;
  }
}

class INVALID_CREDENTIALS extends Error {
  constructor() {
    super("Credenciales inválidas");
    this.status = 400;
  }
}

export const errors = {
  USER_NOT_FOUND,
  USER_LIST_ERROR,
  FALTAN_DATOS_USUARIO,
  USUARIO_NO_CREADO,
  USER_ALREADY_EXISTS,
  PASSWORDS_DONT_MATCH,
  INVALID_CREDENTIALS
};

export default errors;
