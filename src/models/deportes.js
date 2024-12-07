// deportes.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

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

export default Deporte;