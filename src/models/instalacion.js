import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';


import Deporte from "./deportes.js";

const Instalacion = sequelize.define('Instalacion', {
    instalacion_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    capacidad: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    precio_hora: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('disponible', 'mantenimiento', 'reservada'),
        defaultValue: 'disponible'
    }
}, {
    tableName: 'instalaciones',
    timestamps: false
});



export default Instalacion;