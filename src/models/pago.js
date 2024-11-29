import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

import Reserva from "./reserva.js";

const Pago = sequelize.define('Pago', {
    pago_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    reserva_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha_pago: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    monto: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    metodo_pago: {
        type: DataTypes.ENUM('efectivo', 'tarjeta', 'transferencia'),
        allowNull: true
    }
}, {
    sequelize,
    tableName: 'pagos',
    timestamps: false
});

Pago.belongsTo(Reserva, { foreignKey: 'reserva_id' });

export default Pago