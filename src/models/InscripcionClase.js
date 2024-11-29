import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

import Clase from "./clases.js";
import Cliente from "./cliente.js";

const InscripcionClase = sequelize.define('InscripcionClase', {
    inscripcion_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    clase_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cliente_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha_inscripcion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    estado: {
        type: DataTypes.ENUM('activa', 'cancelada', 'completada'),
        defaultValue: 'activa'
    }
}, {
    sequelize,
    tableName: 'inscripciones_clases',
    timestamps: false
});


InscripcionClase.belongsTo(Clase, { foreignKey: 'clase_id' });
InscripcionClase.belongsTo(Cliente, { foreignKey: 'cliente_id' });

export default InscripcionClase