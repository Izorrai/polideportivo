import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const DB_DATABASE= process.env.DB_DATABASE
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_HOST=process.env.DB_HOST;
const DB_PORT=3306;


const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  dialect: "mysql",
  host: DB_HOST,
  port: DB_PORT,
  define: {
    freezeTableName: true,  
    timestamps: false,      
  },
})


async function testConexion() {
  try {
   
    await sequelize.authenticate();
    console.log("Conexión establecida con éxito.");
  } catch (error) {
   
    console.error("No se ha podido conectar a la base de datos.");
    console.error("Detalles del error: ", error.message);
    console.error("Stack: ", error.stack);
  }
}

testConexion();

export default sequelize;