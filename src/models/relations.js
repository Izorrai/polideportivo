import Deporte from './deportes.js';
import Instalacion from './instalacion.js';

const initializeRelations = () => {
    Deporte.belongsToMany(Instalacion, {
        through: 'instalaciones_deportes',
        foreignKey: 'deporte_id'
    });

    Instalacion.belongsToMany(Deporte, {
        through: 'instalaciones_deportes',
        foreignKey: 'instalacion_id'
    });
};

export { initializeRelations };