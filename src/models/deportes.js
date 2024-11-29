import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

import Instalacion from "./instalacion.js";

const Deporte = sequelize.define('Deporte', {
    deporte_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    sequelize,   
    tableName: 'deportes',
    timestamps: false
});

    Deporte.belongsToMany(Instalacion, { through: 'instalaciones_deportes', foreignKey: 'deporte_id'
});

export default Deporte;