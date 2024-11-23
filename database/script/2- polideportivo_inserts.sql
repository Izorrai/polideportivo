-- Inserts para deportes
INSERT INTO deportes (nombre, descripcion) VALUES
('Fútbol', 'Deporte de equipo con balón'),
('Baloncesto', 'Deporte de equipo en cancha'),
('Tenis', 'Deporte de raqueta individual o dobles'),
('Natación', 'Deporte acuático'),
('Voleibol', 'Deporte de equipo con red'),
('Pádel', 'Deporte de raqueta en pista cerrada'),
('Atletismo', 'Deportes de pista y campo'),
('Gimnasia', 'Ejercicios de fuerza y flexibilidad'),
('Boxeo', 'Deporte de contacto'),
('Yoga', 'Disciplina cuerpo-mente');

-- Inserts para empleados
INSERT INTO empleados (nombre, apellidos, dni, telefono, email, puesto, fecha_contratacion) VALUES
('Juan', 'García López', '11111111A', '611111111', 'juan@dep.com', 'Entrenador', '2023-01-15'),
('María', 'Pérez Ruiz', '22222222B', '622222222', 'maria@dep.com', 'Monitor', '2023-02-20'),
('Carlos', 'López Sanz', '33333333C', '633333333', 'carlos@dep.com', 'Entrenador', '2023-03-10'),
('Ana', 'Martínez Gil', '44444444D', '644444444', 'ana@dep.com', 'Monitor', '2023-04-05'),
('Pablo', 'González Mora', '55555555E', '655555555', 'pablo@dep.com', 'Entrenador', '2023-05-01'),
('Laura', 'Sánchez Vega', '66666666F', '666666666', 'laura@dep.com', 'Monitor', '2023-06-15'),
('David', 'Ruiz Torres', '77777777G', '677777777', 'david@dep.com', 'Entrenador', '2023-07-20'),
('Elena', 'Torres Luna', '88888888H', '688888888', 'elena@dep.com', 'Monitor', '2023-08-10'),
('Miguel', 'Luna Pérez', '99999999I', '699999999', 'miguel@dep.com', 'Entrenador', '2023-09-05'),
('Sara', 'Gil Ruiz', '10101010J', '610101010', 'sara@dep.com', 'Monitor', '2023-10-01');

-- Inserts para instalaciones
INSERT INTO instalaciones (nombre, capacidad, precio_hora, estado) VALUES
('Pabellón Principal', 100, 80.00, 'disponible'),
('Campo de Fútbol', 50, 60.00, 'disponible'),
('Pista Polideportiva 1', 30, 40.00, 'disponible'),
('Piscina Cubierta', 40, 50.00, 'disponible'),
('Sala Multiusos', 25, 30.00, 'disponible'),
('Pista de Tenis 1', 4, 20.00, 'disponible'),
('Gimnasio', 50, 25.00, 'disponible'),
('Sala de Boxeo', 15, 35.00, 'disponible'),
('Pista de Atletismo', 60, 45.00, 'disponible'),
('Sala de Yoga', 20, 25.00, 'disponible');

-- Inserts para instalaciones_deportes
INSERT INTO instalaciones_deportes (instalacion_id, deporte_id) VALUES
(1, 1), -- Pabellón - Fútbol
(1, 2), -- Pabellón - Baloncesto
(1, 5), -- Pabellón - Voleibol
(2, 1), -- Campo - Fútbol
(2, 7), -- Campo - Atletismo
(3, 2), -- Pista - Baloncesto
(3, 5), -- Pista - Voleibol
(4, 4), -- Piscina - Natación
(5, 8), -- Sala Multiusos - Gimnasia
(5, 10); -- Sala Multiusos - Yoga

-- Inserts para clientes
INSERT INTO clientes (nombre, apellidos, dni, telefono, email) VALUES
('Luis', 'Martínez Ruiz', 'A1111111B', '611222333', 'luis@email.com'),
('Carmen', 'García Pérez', 'B2222222C', '622333444', 'carmen@email.com'),
('Jorge', 'López García', 'C3333333D', '633444555', 'jorge@email.com'),
('Isabel', 'Pérez Sanz', 'D4444444E', '644555666', 'isabel@email.com'),
('Alberto', 'Sanz López', 'E5555555F', '655666777', 'alberto@email.com'),
('Marina', 'Ruiz Gil', 'F6666666G', '666777888', 'marina@email.com'),
('Roberto', 'Gil Torres', 'G7777777H', '677888999', 'roberto@email.com'),
('Patricia', 'Torres Luna', 'H8888888I', '688999000', 'patricia@email.com'),
('Diego', 'Luna Vega', 'I9999999J', '699000111', 'diego@email.com'),
('Lucía', 'Vega Ruiz', 'J1010101K', '600111222', 'lucia@email.com');

-- Actualización de inserts para clases con horarios variados y realistas
INSERT INTO clases (deporte_id, empleado_id, instalacion_id, nombre, nivel, capacidad_maxima, precio, dia_semana, hora_inicio, hora_fin) VALUES
-- Clases de Mañana
(4, 3, 4, 'Natación Temprano', 'Principiante', 8, 20.00, 'Lunes', '07:00', '08:00'),
(10, 7, 5, 'Yoga Amanecer', 'Todos', 15, 20.00, 'Lunes', '08:30', '09:30'),
(8, 5, 5, 'Gimnasia Mañana', 'Intermedio', 12, 25.00, 'Lunes', '10:00', '11:00'),
(4, 3, 4, 'Natación Adultos', 'Intermedio', 10, 25.00, 'Lunes', '11:30', '12:30'),
(1, 1, 2, 'Fútbol Kids', 'Principiante', 15, 22.00, 'Lunes', '13:00', '14:00'),

-- Clases de Tarde
(2, 2, 1, 'Baloncesto Junior', 'Principiante', 12, 25.00, 'Lunes', '16:00', '17:00'),
(5, 4, 1, 'Voleibol Iniciación', 'Principiante', 14, 22.00, 'Lunes', '17:30', '18:30'),
(9, 6, 8, 'Boxeo Fitness', 'Intermedio', 8, 30.00, 'Lunes', '19:00', '20:00'),
(3, 9, 6, 'Tenis Avanzado', 'Avanzado', 4, 35.00, 'Lunes', '20:30', '21:30'),
(7, 8, 9, 'Atletismo Noche', 'Avanzado', 10, 28.00, 'Lunes', '21:00', '22:00'),

-- Martes
(4, 3, 4, 'Natación Temprano', 'Principiante', 8, 20.00, 'Martes', '07:00', '08:00'),
(10, 7, 5, 'Yoga Amanecer', 'Todos', 15, 20.00, 'Martes', '08:30', '09:30'),
(1, 1, 2, 'Fútbol Adultos', 'Intermedio', 20, 30.00, 'Martes', '10:00', '11:30'),
(2, 2, 1, 'Baloncesto Pro', 'Avanzado', 10, 35.00, 'Martes', '16:00', '17:30'),
(5, 4, 1, 'Voleibol Avanzado', 'Avanzado', 12, 28.00, 'Martes', '18:00', '19:30'),

-- Miércoles
(4, 3, 4, 'Natación Temprano', 'Principiante', 8, 20.00, 'Miércoles', '07:00', '08:00'),
(8, 5, 5, 'Gimnasia Rítmica', 'Avanzado', 10, 32.00, 'Miércoles', '09:00', '10:30'),
(3, 9, 6, 'Tenis Kids', 'Principiante', 4, 25.00, 'Miércoles', '16:00', '17:00'),
(9, 6, 8, 'Boxeo Amateur', 'Avanzado', 6, 35.00, 'Miércoles', '18:00', '19:30'),
(7, 8, 9, 'Atletismo Sprint', 'Intermedio', 12, 28.00, 'Miércoles', '20:00', '21:00'),

-- Jueves
(4, 3, 4, 'Natación Temprano', 'Principiante', 8, 20.00, 'Jueves', '07:00', '08:00'),
(10, 7, 5, 'Yoga Flow', 'Intermedio', 12, 25.00, 'Jueves', '08:30', '09:30'),
(1, 1, 2, 'Fútbol Técnica', 'Avanzado', 15, 35.00, 'Jueves', '16:00', '17:30'),
(2, 2, 1, 'Baloncesto Elite', 'Avanzado', 10, 35.00, 'Jueves', '18:00', '19:30'),
(5, 4, 1, 'Voleibol Mixto', 'Intermedio', 14, 25.00, 'Jueves', '20:00', '21:30'),

-- Viernes
(4, 3, 4, 'Natación Temprano', 'Principiante', 8, 20.00, 'Viernes', '07:00', '08:00'),
(8, 5, 5, 'Gimnasia Fitness', 'Todos', 15, 25.00, 'Viernes', '09:00', '10:00'),
(3, 9, 6, 'Tenis Social', 'Todos', 4, 20.00, 'Viernes', '16:00', '17:00'),
(9, 6, 8, 'Boxeo Funcional', 'Principiante', 10, 28.00, 'Viernes', '18:00', '19:00'),
(7, 8, 9, 'Atletismo Resistencia', 'Avanzado', 12, 30.00, 'Viernes', '19:30', '21:00'),

-- Sábado
(4, 3, 4, 'Natación Familiar', 'Todos', 12, 25.00, 'Sábado', '09:00', '10:00'),
(10, 7, 5, 'Yoga Weekend', 'Todos', 20, 22.00, 'Sábado', '10:30', '11:30'),
(1, 1, 2, 'Fútbol Social', 'Todos', 22, 25.00, 'Sábado', '12:00', '13:30'),
(2, 2, 1, 'Baloncesto Libre', 'Todos', 15, 20.00, 'Sábado', '16:00', '17:30'),
(5, 4, 1, 'Voleibol Familiar', 'Todos', 16, 20.00, 'Sábado', '18:00', '19:30'),

-- Domingo
(4, 3, 4, 'Natación Libre', 'Todos', 15, 20.00, 'Domingo', '09:00', '10:00'),
(10, 7, 5, 'Yoga Relax', 'Todos', 20, 20.00, 'Domingo', '10:30', '11:30'),
(8, 5, 5, 'Gimnasia Suave', 'Principiante', 12, 20.00, 'Domingo', '12:00', '13:00'),
(1, 1, 2, 'Fútbol Familiar', 'Todos', 22, 25.00, 'Domingo', '16:00', '17:30'),
(2, 2, 1, 'Baloncesto Familiar', 'Todos', 15, 20.00, 'Domingo', '18:00', '19:30');

-- Inserts para empleados_deportes
INSERT INTO empleados_deportes (empleado_id, deporte_id, nivel_certificacion) VALUES
(1, 1, 'Experto'),
(2, 2, 'Avanzado'),
(3, 4, 'Experto'),
(4, 5, 'Avanzado'),
(5, 8, 'Experto'),
(6, 9, 'Avanzado'),
(7, 10, 'Experto'),
(8, 7, 'Avanzado'),
(9, 3, 'Experto'),
(10, 1, 'Avanzado');

-- Inserts para inscripciones_clases
INSERT INTO inscripciones_clases (clase_id, cliente_id, estado) VALUES
(1, 1, 'activa'),
(2, 2, 'activa'),
(3, 3, 'activa'),
(4, 4, 'activa'),
(5, 5, 'activa'),
(6, 6, 'activa'),
(7, 7, 'activa'),
(8, 8, 'activa'),
(9, 9, 'activa'),
(10, 10, 'activa');

-- Inserts para reservas
INSERT INTO reservas (cliente_id, instalacion_id, deporte_id, fecha, hora_inicio, hora_fin, estado, precio_total) VALUES
(1, 1, 1, '2024-03-15', '10:00', '11:00', 'confirmada', 80.00),
(2, 2, 1, '2024-03-15', '11:00', '12:00', 'confirmada', 60.00),
(3, 3, 2, '2024-03-15', '12:00', '13:00', 'confirmada', 40.00),
(4, 4, 4, '2024-03-15', '16:00', '17:00', 'confirmada', 50.00),
(5, 5, 8, '2024-03-15', '17:00', '18:00', 'confirmada', 30.00),
(6, 6, 3, '2024-03-16', '10:00', '11:00', 'pendiente', 20.00),
(7, 7, 8, '2024-03-16', '11:00', '12:00', 'pendiente', 25.00),
(8, 8, 9, '2024-03-16', '12:00', '13:00', 'pendiente', 35.00),
(9, 9, 7, '2024-03-16', '16:00', '17:00', 'pendiente', 45.00),
(10, 10, 10, '2024-03-16', '17:00', '18:00', 'pendiente', 25.00);

-- Inserts para gastos
INSERT INTO gastos (concepto, precio, fecha, tipo, instalacion_id, descripcion) VALUES
('Mantenimiento Pabellón', 1500.00, '2024-03-01', 'mantenimiento', 1, 'Mantenimiento mensual pabellón'),
('Limpieza Campo', 800.00, '2024-03-01', 'servicios', 2, 'Servicio limpieza campo'),
('Material Deportivo', 600.00, '2024-03-02', 'otros', 3, 'Compra balones y redes'),
('Productos Piscina', 1000.00, '2024-03-02', 'mantenimiento', 4, 'Químicos y mantenimiento'),
('Reparación Equipos', 400.00, '2024-03-03', 'mantenimiento', 5, 'Reparación equipamiento'),
('Personal Limpieza', 1200.00, '2024-03-03', 'servicios', 6, 'Servicio limpieza mensual'),
('Equipamiento Nuevo', 2000.00, '2024-03-04', 'otros', 7, 'Nuevas máquinas gimnasio'),
('Mantenimiento Ring', 300.00, '2024-03-04', 'mantenimiento', 8, 'Reparación ring boxeo'),
('Pintura Pista', 1500.00, '2024-03-05', 'mantenimiento', 9, 'Repintado pista atletismo'),
('Material Yoga', 250.00, '2024-03-05', 'otros', 10, 'Esterillas y bloques nuevos');

-- Inserts para pagos
INSERT INTO pagos (reserva_id, monto, metodo_pago) VALUES
(1, 80.00, 'tarjeta'),
(2, 60.00, 'efectivo'),
(3, 40.00, 'transferencia'),
(4, 50.00, 'tarjeta'),
(5, 30.00, 'efectivo'),
(6, 20.00, 'transferencia'),
(7, 25.00, 'tarjeta'),
(8, 35.00, 'efectivo'),
(9, 45.00, 'transferencia'),
(10, 25.00, 'tarjeta');