import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';



const Empleado = sequelize.define('Empleado', {
    empleado_id: {
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
    puesto: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    fecha_contratacion: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize,
    tableName: 'empleados',
    timestamps: false
});

export default Empleado;