import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

import Instalacion from "./instalacion.js";


const Gasto = sequelize.define('Gasto', {
    gasto_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    concepto: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    tipo: {
        type: DataTypes.ENUM('mantenimiento', 'servicios', 'personal', 'otros'),
        allowNull: true
    },
    instalacion_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    sequelize,
    tableName: 'gastos',
    timestamps: false
});

    Gasto.belongsTo(Instalacion, { foreignKey: 'instalacion_id' });

export default Gasto