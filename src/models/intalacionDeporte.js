import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';


const InstalacionDeporte = sequelize.define('InstalacionDeporte', {
    instalacion_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'instalaciones',
            key: 'instalacion_id'
        }
    },
    deporte_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'deportes',
            key: 'deporte_id'
        }
    }
}, {
    sequelize,
    tableName: 'instalaciones_deportes',
    timestamps: false
});

export default InstalacionDeporte;