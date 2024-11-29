import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

import Cliente from "./cliente.js";
import Instalacion from "./instalacion.js";
import Deporte from "./deportes.js";

const Reserva = sequelize.define('Reserva', {
    reserva_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cliente_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    instalacion_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    deporte_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    hora_inicio: {
        type: DataTypes.TIME,
        allowNull: false
    },
    hora_fin: {
        type: DataTypes.TIME,
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('pendiente', 'confirmada', 'cancelada'),
        defaultValue: 'pendiente'
    },
    precio_total: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    }
}, {
    sequelize,
    tableName: 'reservas',
    timestamps: false
});

Reserva.belongsTo(Cliente, { foreignKey: 'cliente_id' });
Reserva.belongsTo(Instalacion, { foreignKey: 'instalacion_id' });
Reserva.belongsTo(Deporte, { foreignKey: 'deporte_id' });

export default Reserva;