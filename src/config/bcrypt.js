import bcrypt from "bcrypt";


async function hashcontrasena(contrasena){
    const hash = await bcrypt.hash(contrasena,10);
    return hash;
}

async function verificarcontrasena(contrasena,hash){
  const match = await bcrypt.compare(contrasena, hash);
  return match;
}

export {
    hashcontrasena,
    verificarcontrasena
}