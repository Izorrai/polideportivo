import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';


const Cliente = sequelize.define('Cliente', {
    cliente_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    dni: {
        type: DataTypes.STRING(9),
        allowNull: false,
        unique: true
    },
    telefono: {
        type: DataTypes.STRING(15),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: true
    },
    fecha_registro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    tableName: 'clientes',
    timestamps: false
});

export default Cliente;