/*Creaci�n DB*/
create database controlDeAcceso;

use controlDeAcceso;

/*Empleados del Colegio*/
INSERT INTO empleados (Nombre, Apellido) VALUES
('RICARDO F', 'ALBUERNEZ');
INSERT INTO empleados (Nombre, Apellido) VALUES
('PABLO', 'ALMADA');
INSERT INTO empleados (Nombre, Apellido) VALUES
('ALEJANDRO', 'ARINCI');
INSERT INTO empleados (Nombre, Apellido) VALUES
('SILVIA C', 'AYALA');
INSERT INTO empleados (Nombre, Apellido) VALUES
('ESTELA', 'CABRERA');
INSERT INTO empleados (Nombre, Apellido) VALUES
('RAMONA', 'CHAVEZ');
INSERT INTO empleados (Nombre, Apellido) VALUES
('FRANCA PAULA', 'DEL GRECO');
INSERT INTO empleados (Nombre, Apellido) VALUES
('MARIA PAULA', 'FERELLA');
INSERT INTO empleados (Nombre, Apellido) VALUES
('NOELIA S', 'FERRARI');
INSERT INTO empleados (Nombre, Apellido) VALUES
('MARIA ESTER', 'HERRERA');
INSERT INTO empleados (Nombre, Apellido) VALUES
('MARIANA DEL C', 'MONZON');
INSERT INTO empleados (Nombre, Apellido) VALUES
('CORTES MARIA', 'OJEDA');
INSERT INTO empleados (Nombre, Apellido) VALUES
('MARISA G', 'ROMERO');
INSERT INTO empleados (Nombre, Apellido) VALUES
('ISABEL B', 'SALINAS');
INSERT INTO empleados (Nombre, Apellido) VALUES
('MARIA S', 'VECCHIO');
INSERT INTO empleados (Nombre, Apellido) VALUES
('MARIA C', 'VELASCO');

/* Modificar tipo de dato de tablas */
alter table ingresos alter column fecha Date
alter table egresos alter column fecha Date

/* Ejemplos insercion */
insert into ingresos (fecha, hora, EmpleadoId) values ('2021/07/03', '10:21', 1)