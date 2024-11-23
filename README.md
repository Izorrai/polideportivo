# Sistema de Gestión de Polideportivo

## Descripción del Proyecto
Sistema integral para la gestión de un polideportivo que permite administrar instalaciones deportivas, reservas, clases, empleados y clientes. Esta aplicación está diseñada para facilitar la gestión diaria de un centro deportivo, optimizando los procesos de reservas y administración de recursos.

## Características Principales
- Gestión de Instalaciones Deportivas
  - Reserva de instalaciones
  - Control de disponibilidad
  - Múltiples deportes por instalación
  - Gestión de mantenimiento

- Sistema de Clases
  - Programación de clases
  - Gestión de horarios
  - Control de asistencia
  - Inscripción de alumnos

- Gestión de Personal
  - Registro de empleados
  - Asignación de clases
  - Control de horarios
  - Gestión de especialidades

- Administración de Clientes
  - Registro de usuarios
  - Historial de reservas
  - Gestión de pagos
  - Sistema de inscripciones

## Tecnologías Utilizadas
- Backend:
  - Node.js
  - Express.js
  - Sequelize ORM
  - MySQL

- Frontend:
  - Pug (Template Engine)
  - CSS
  - JavaScript

- Herramientas:
  - Docker
  - Docker Compose
  - Git

## Estructura del Proyecto
```
polideportivo/
├── src/
│   ├── config/
│   │   └── sequelize.js
│   ├── controllers/
│   │   ├── clases/
│   │   ├── instalaciones/
│   │   ├── empleados/
│   │   └── clientes/
│   ├── models/
│   │   ├── index.js
│   │   ├── clase.js
│   │   ├── deporte.js
│   │   ├── empleado.js
│   │   └── instalacion.js
│   ├── routes/
│   │   └── view/
│   ├── views/
│   │   ├── clases/
│   │   ├── instalaciones/
│   │   └── layout.pug
│   └── app.js
├── database/
│   ├── script/
│   └── conf/
├── public/
│   ├── css/
│   ├── js/
│   └── resources/
├── docker-compose.yml
├── Dockerfile
└── README.md
```

## Requisitos Previos
- Docker y Docker Compose
- Node.js (v18 o superior)
- MySQL (8.0)
- Git

## Instalación y Configuración

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd polideportivo
```

2. Configurar variables de entorno:
```bash
# Crear archivo .env
cp .env.example .env

# Editar variables según necesidad
DB_HOST=polideportivo_db
DB_PORT=3308
DB_USER=user
DB_PASSWORD=1234
DB_DATABASE=polideportivo
DB_ROOT_PASSWORD=Polideportivo_24
```

3. Iniciar servicios con Docker:
```bash
docker-compose up --build
```

4. Acceder a la aplicación:
```
http://localhost:3001
```

## Estructura de la Base de Datos

### Tablas Principales:
- `deportes`: Catálogo de deportes disponibles
- `instalaciones`: Espacios deportivos del centro
- `empleados`: Personal del polideportivo
- `clientes`: Usuarios registrados
- `clases`: Actividades programadas
- `reservas`: Gestión de reservas
- `pagos`: Registro de transacciones

### Relaciones:
- Instalaciones pueden albergar múltiples deportes
- Empleados pueden estar certificados en varios deportes
- Clientes pueden inscribirse en múltiples clases
- Cada clase está asociada a una instalación y un empleado

## Funcionalidades por Implementar

### Fase 1:
- [x] Gestión básica de instalaciones
- [x] Sistema de reservas
- [ ] Gestión de empleados
- [ ] Registro de clientes

### Fase 2:
- [ ] Sistema de clases y horarios
- [ ] Gestión de pagos
- [ ] Panel de administración
- [ ] Reportes y estadísticas

### Fase 3:
- [ ] Sistema de notificaciones
- [ ] App móvil
- [ ] Integración con sistemas de pago
- [ ] Sistema de fidelización

## Contribución
1. Fork del repositorio
2. Crear rama para nueva característica (`git checkout -b feature/nueva-caracteristica`)
3. Commit de cambios (`git commit -am 'Añadir nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Crear Pull Request

## Licencia
[Tipo de Licencia]

## Contacto
[Información de contacto del equipo de desarrollo]

## Estado del Proyecto
En desarrollo - Fase inicial

## Agradecimientos
- Equipo de desarrollo
- Colaboradores
- Referencias y recursos utilizados