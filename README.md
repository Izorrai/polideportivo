# Sistema de Gestión de Polideportivo

## Descripción del Proyecto
Sistema integral para la gestión de un polideportivo que permite administrar instalaciones deportivas, reservas, clases, empleados y clientes. Esta aplicación está diseñada para facilitar la gestión diaria de un centro deportivo, optimizando los procesos de reservas y administración de recursos a través de una API RESTful.

## Características Principales
- Gestión de Instalaciones Deportivas
  - Reserva de instalaciones
  - Control de disponibilidad
  - Múltiples deportes por instalación
  - Gestión de mantenimiento
  - Control de precios por hora

- Sistema de Clases
  - Programación de clases
  - Gestión de horarios
  - Control de asistencia
  - Inscripción de alumnos
  - Seguimiento de clases disponibles

- Gestión de Personal
  - Registro de empleados
  - Asignación de clases
  - Control de horarios
  - Gestión de especialidades

- Administración de Clientes
  - Registro y autenticación de usuarios
  - Historial de reservas
  - Gestión de pagos
  - Sistema de inscripciones
  - Perfiles personalizados

## Tecnologías Utilizadas
- Backend:
  - Node.js
  - Express.js
  - JWT para autenticación
  - MySQL

- Herramientas de Desarrollo:
  - Postman para testing de API
  - MySQL Workbench para gestión de BD
  - Trello para gestión de proyecto
  - Git y GitHub para control de versiones
  - JSDoc para documentación de código
  - Swagger para documentación de API
  - Jest y Supertest para testing unitario e integración
  - Coverage reports para análisis de cobertura de tests

## API Endpoints

### Gestión de Deportes
```markdown
GET    /deportes/api                # Listar deportes
POST   /deportes/api/crear          # Crear deporte
GET    /deportes/api/actualizar/:id # Actualizar deporte
DELETE /deportes/api/eliminat/:id   # Eliminar deporte
```

### Gestión de Empleados
```markdown
GET    /empleados                   # Listar empleados
GET    /empleados/:id              # Obtener empleado
POST   /empleados/crear            # Crear empleado
DELETE /empleados/api/eliminar/:id # Eliminar empleado
```

### Gestión de Clases
```markdown
GET    /clases/api/disponibles     # Listar clases disponibles
POST   /inscripciones/api/crear    # Crear inscripción
```

### Gestión de Instalaciones
```markdown
GET    /instalaciones/api                    # Listar instalaciones
GET    /instalaciones/api/disponibles        # Ver disponibilidad
POST   /instalaciones/api/crear-instalaciones # Crear instalación
POST   /instalaciones/api/actualizar/:id     # Actualizar instalación
DELETE /instalaciones/api/eliminar/:id       # Eliminar instalación
```

### Gestión de Pagos
```markdown
GET    /pagos/api                  # Listar pagos
GET    /pagos/api/:id             # Obtener pago
POST   /pagos/api/actualizar/:id  # Actualizar método de pago
```

### Autenticación y Usuarios
```markdown
POST   /registro                   # Registro de usuario
POST   /login                      # Inicio de sesión
POST   /logout                     # Cierre de sesión
GET    /usuario                    # Información de usuario
POST   /clientes/actualizar-perfil # Actualizar perfil
```

## Base de Datos
Se utiliza MySQL como sistema de gestión de base de datos, administrado a través de MySQL Workbench para:
- Diseño y modelado de la base de datos
- Administración de tablas y relaciones
- Gestión de usuarios y permisos
- Ejecución y optimización de consultas
- Mantenimiento de la base de datos

### Tablas Principales:
- `deportes`: Catálogo de deportes disponibles
- `instalaciones`: Espacios deportivos del centro
- `empleados`: Personal del polideportivo
- `clientes`: Usuarios registrados
- `clases`: Actividades programadas
- `reservas`: Gestión de reservas
- `pagos`: Registro de transacciones

## Requisitos Previos
- Node.js (v18 o superior)
- MySQL (8.0)
- MySQL Workbench
- Git

## Instalación y Configuración

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd polideportivo
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar base de datos:
- Instalar MySQL y MySQL Workbench
- Importar el esquema de base de datos
- Configurar variables de entorno:
```bash
cp .env.example .env
# Editar .env con credenciales de BD y configuraciones
```

4. Iniciar el servidor:
```bash
npm run start
```

## Documentación
- Documentación de API disponible en Swagger UI
- Documentación de código generada con JSDoc
- Colección de Postman disponible para testing

## Estructura del Proyecto
```
polideportivo/
├── src/
│   ├── config/
│   │   └── database.js         # Configuración de la base de datos
│   ├── controllers/
│   │   ├── deportesController.js
│   │   ├── empleadosController.js
│   │   ├── clasesController.js
│   │   ├── instalacionesController.js
│   │   ├── inscripcionesController.js
│   │   ├── pagosController.js
│   │   └── authController.js
│   ├── models/
│   │   ├── index.js
│   │   ├── Deporte.js
│   │   ├── Empleado.js
│   │   ├── Clase.js
│   │   ├── Instalacion.js
│   │   ├── Inscripcion.js
│   │   ├── Pago.js
│   │   └── Usuario.js
│   ├── routes/
│   │   ├── deportes.routes.js
│   │   ├── empleados.routes.js
│   │   ├── clases.routes.js
│   │   ├── instalaciones.routes.js
│   │   ├── inscripciones.routes.js
│   │   ├── pagos.routes.js
│   │   └── auth.routes.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── validate.middleware.js
│   └── app.js
├── database/
│   ├── migrations/
│   └── seeders/
├── docs/
│   ├── swagger/
│   └── jsdoc/
├── tests/
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Funcionalidades Implementadas

### Gestión de Deportes ✅
- [x] Listado de deportes disponibles
- [x] Creación de nuevos deportes
- [x] Actualización de información de deportes
- [x] Eliminación de deportes

### Gestión de Empleados ✅
- [x] Registro de empleados
- [x] Consulta de información de empleados
- [x] Eliminación de registros de empleados
- [x] Actualización de datos de empleados

### Gestión de Clases ✅
- [x] Visualización de clases disponibles
- [x] Sistema de inscripciones
- [x] Control de cupos
- [x] Gestión de horarios

### Gestión de Instalaciones ✅
- [x] Catálogo de instalaciones
- [x] Control de disponibilidad
- [x] Sistema de reservas
- [x] Actualización de información
- [x] Gestión de precios por hora

### Sistema de Pagos ✅
- [x] Registro de pagos
- [x] Consulta de historiales
- [x] Actualización de métodos de pago
- [x] Seguimiento de transacciones

### Autenticación y Usuarios ✅
- [x] Registro de usuarios
- [x] Login con JWT
- [x] Gestión de perfiles
- [x] Control de sesiones
- [x] Cierre de sesión

### Funcionalidades Pendientes 🚧
- [ ] Sistema de notificaciones
- [ ] Generación de reportes
- [ ] Estadísticas de uso
- [ ] App móvil
- [ ] Sistema de valoraciones
- [ ] Chat de soporte
- [ ] Calendario integrado
- [ ] Sistema de facturación automática

## Tests y Calidad del Código

### Tests Implementados ✅

#### Tests de Controladores
```
tests/
├── controllers/
│   ├── deportes.test.js
│   ├── empleados.test.js
│   ├── clases.test.js
│   ├── instalaciones.test.js
│   ├── inscripciones.test.js
│   ├── pagos.test.js
│   └── auth.test.js
```

#### Deportes Controller Tests
- [x] Listar deportes
- [x] Crear nuevo deporte
- [x] Actualizar deporte
- [x] Eliminar deporte

#### Empleados Controller Tests
- [x] Obtener lista de empleados
- [x] Obtener empleado por ID
- [x] Crear empleado
- [x] Eliminar empleado

#### Clases Controller Tests
- [x] Obtener clases disponibles
- [x] Gestión de inscripciones

#### Instalaciones Controller Tests
- [x] Listar instalaciones
- [x] Verificar disponibilidad
- [x] Crear instalación
- [x] Actualizar instalación
- [x] Eliminar instalación

#### Inscripciones Controller Tests
- [x] Crear inscripción
- [x] Validar datos de inscripción
- [x] Verificar disponibilidad de cupos

#### Pagos Controller Tests
- [x] Listar pagos
- [x] Obtener pago por ID
- [x] Actualizar método de pago

#### Auth Controller Tests
- [x] Registro de usuario
- [x] Login de usuario
- [x] Logout de usuario
- [x] Actualización de perfil

### Herramientas de Testing
- Jest para pruebas unitarias
- Supertest para pruebas de integración
- Coverage reports para análisis de cobertura

### Comandos de Testing
```bash
# Ejecutar todos los tests
npm run test

# Ejecutar tests con coverage
npm run test:coverage

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests de un controlador específico
npm test tests/controllers/deportes.test.js
```

### Cobertura de Tests
- Objetivo de cobertura: >80%
- Tests unitarios para cada controlador
- Tests de integración para flujos críticos
- Validación de casos de éxito y error

## Gestión del Proyecto
- **Trello**: Gestión ágil y seguimiento de tareas
- **GitHub**: Control de versiones y colaboración
- **Postman**: Testing y documentación de API
- **MySQL Workbench**: Gestión y modelado de base de datos

## Estado del Proyecto
En desarrollo - Fase inicial

## Licencia
MIT License

## Contacto
[Información de contacto del equipo de desarrollo]