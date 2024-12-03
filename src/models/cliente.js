import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';


const Cliente = sequelize.define('Cliente', {
    cliente_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      },
      contrasena: {
        type: DataTypes.STRING(80),
        allowNull: false
      },
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      apellido: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      telefono: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      direccion: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      fecha_registro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true
      },
      roles: {
        type: DataTypes.ENUM('CLIENTE', 'ADMIN'),
        defaultValue: 'CLIENTE',
        allowNull: false 
      }
    
    }, {
      sequelize,
      tableName: 'clientes',
      timestamps: false
    });

export default Cliente;