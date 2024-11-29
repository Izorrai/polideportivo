import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

import Deporte from "./deportes.js"
import Empleado from "./empleado.js";
import Instalacion from "./instalacion.js";

const Clase = sequelize.define('Clase', {
    clase_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    deporte_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    empleado_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    instalacion_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    nivel: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    capacidad_maxima: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    precio: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    dia_semana: {
        type: DataTypes.ENUM('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'),
        allowNull: true
    },
    hora_inicio: {
        type: DataTypes.TIME,
        allowNull: true
    },
    hora_fin: {
        type: DataTypes.TIME,
        allowNull: true
    }
}, {
    sequelize,
    tableName: 'clases',
    timestamps: false
});


    Clase.belongsTo(Deporte, { foreignKey: 'deporte_id' });
    Clase.belongsTo(Empleado, { foreignKey: 'empleado_id' });
    Clase.belongsTo(Instalacion, { foreignKey: 'instalacion_id' });
    
    export default Clase;
