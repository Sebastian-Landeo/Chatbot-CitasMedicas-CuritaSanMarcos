USE curitasanmarcos;
CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    tipo_usuario ENUM('Estudiante', 'Trabajador sanmarquino', 'Externo') NOT NULL,
    codigo VARCHAR(20) DEFAULT '',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE historia_clinica (
    id_historia_clinica INT PRIMARY KEY AUTO_INCREMENT,
    dni VARCHAR(20) UNIQUE NOT NULL,
    edad INT,
    sexo VARCHAR(20),
    telefono VARCHAR(20),
    enfermedades VARCHAR(20),
    operaciones VARCHAR(50),
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

CREATE TABLE especialidades (
    id_especialidad INT PRIMARY KEY AUTO_INCREMENT,
    nombre_especialidad VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE medicos (
    id_medico INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    id_especialidad INT NOT NULL,
    FOREIGN KEY (id_especialidad) REFERENCES especialidades(id_especialidad) ON DELETE CASCADE
);

CREATE TABLE horarios (
    id_horario INT PRIMARY KEY AUTO_INCREMENT,
    id_medico INT NOT NULL,
    fecha DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_final TIME NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_medico) REFERENCES medicos(id_medico) ON DELETE CASCADE
);

CREATE TABLE citas (
    id_cita INT PRIMARY KEY AUTO_INCREMENT,
    id_paciente INT NOT NULL,
    id_atencion INT NOT NULL,
    estado ENUM('Libre', 'Reservado', 'Pagado') DEFAULT 'Libre',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_paciente) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_atencion) REFERENCES horarios(id_horario) ON DELETE CASCADE
);

INSERT INTO especialidades (nombre_especialidad) VALUES
('Cardiología'),
('Dermatología'),
('Gastroenterología'),
('Ginecología'),
('Medicina General'),
('Medicina Interna'),
('Neumología'),
('Neurología'),
('Obstetricia'),
('Odontología'),
('Oftalmología'),
('Otorrinolaringología'),
('Traumatología'),
('Pediatría'),
('Psicología'),
('Podología'),
('Terapia Física y Rehabilitación'),
('Urología');

INSERT INTO medicos (nombre, apellido, id_especialidad) VALUES
('Juan', 'Pérez', 1), ('María', 'Gómez', 1),
('Carlos', 'Rodríguez', 2), ('Ana', 'Martínez', 2),
('Luis', 'Fernández', 3), ('Sofía', 'López', 3),
('Pedro', 'Díaz', 4), ('Laura', 'Hernández', 4),
('Diego', 'Torres', 5), ('Carmen', 'Ruiz', 5),
('Andrés', 'Ramírez', 6), ('Elena', 'Jiménez', 6),
('Javier', 'Santos', 7), ('Patricia', 'Morales', 7),
('Fernando', 'Ortiz', 8), ('Marta', 'Castro', 8),
('Hugo', 'Vargas', 9), ('Isabel', 'Romero', 9),
('Ricardo', 'Mendoza', 10), ('Clara', 'Silva', 10),
('Gustavo', 'Iglesias', 11), ('Beatriz', 'Delgado', 11),
('Emilio', 'Cabrera', 12), ('Daniela', 'Ríos', 12),
('Francisco', 'Reyes', 13), ('Valentina', 'Navarro', 13),
('Samuel', 'Herrera', 14), ('Julia', 'Flores', 14),
('Pablo', 'Marín', 15), ('Rosa', 'Sánchez', 15),
('Alberto', 'Cruz', 16), ('Natalia', 'Guzmán', 16),
('Jesús', 'Paredes', 17), ('Gabriela', 'Peña', 17),
('Manuel', 'Álvarez', 18), ('Andrea', 'Muñoz', 18);

INSERT INTO usuarios (nombres, apellidos, correo, contrasena, tipo_usuario, codigo) VALUES
('Sebastian Alonso', 'Landeo Cuentas', 'sebastian.landeo@unmsm.edu.pe', '123', 'Estudiante', '21200224'),
('Kevin', 'Tupac Agüero', 'kevin.tupac@unmsm.edu.pe', '123', 'Estudiante', '21200195'),
('Alex Antonio', 'Cancio Bedon', 'alex.cancio@unmsm.edu.pe', '123', 'Estudiante', '12200219'),
('Jazmin Karla', 'Caqui Asto', 'jazmin.caqui@unmsm.edu.pe', '123', 'Estudiante', '19200263'),
('Max Bruno', 'Saavedra Monterrey', 'max.saavedra@unmsm.edu.pe', '123', 'Estudiante', '21200259'),
('Carlos', 'Ascue Orosco', 'carlos.ascue@unmsm.edu.pe', '123', 'Estudiante', '20200246'),
('Jose Richard', 'Castillo Carranza', 'jose.castillo32@unmsm.edu.pe', '123', 'Estudiante', '21200212'),
('Joaquin Enrique', 'Hidalgo Cock', 'joaquin.hidalgo@unmsm.edu.pe', '123', 'Estudiante', '21200220'),
('Elvis', 'Manco Méndez', 'elvis.manco@unmsm.edu.pe', '123', 'Estudiante', '21200255'),
('Jesus Ernesto', 'Condor Marin', 'jesus.condor3@unmsm.edu.pe', '123', 'Estudiante', '21200025'),
('Jhordan Brayan', 'Medina Montoya', 'jhordan.medina@unmsm.edu.pe', '123', 'Estudiante', '20200273'),
('Abraham Josue', 'Pacheco Garrido', 'abraham.pacheco1@unmsm.edu.pe', '123', 'Estudiante', '17200291'),
('Sergio Daniel', 'Quiroz Ardiles', 'sergio.quiroz2@unmsm.edu.pe', '123', 'Estudiante', '21200030'),
('Jefferson Jesus', 'Ventura Ruiz', 'jefferson.ventura@unmsm.edu.pe', '123', 'Estudiante', '20200305'),
('Daniel Huber', 'Triveño Ruffner', 'daniel.triveno@unmsm.edu.pe', '123', 'Estudiante', '20200301'),
('Bruno Omar', 'Chochoca Yarleque', 'bruno.chochoca@unmsm.edu.pe', '123', 'Estudiante', '22200258'),
('Hugo Sebastian', 'Alvarez Mora', 'hugo.alvarez4@unmsm.edu.pe', '123', 'Estudiante', '22200295'),
('Jose Alessandro', 'Quispe Cabello', 'jose.quispe35@unmsm.edu.pe', '123', 'Estudiante', '21200205'),
('Jatziry Fernanda', 'Sanchez Wong', 'jatziry.sanchez@unmsm.edu.pe', '123', 'Estudiante', '21200302'),
('David Ricardo Javier', 'Villacis Alvear', 'david.villacis@unmsm.edu.pe', '123', 'Estudiante', '18200106'),
('Geomar Willy', 'Fernandez Camacho', 'geomar.fernandez@unmsm.edu.pe', '123', 'Estudiante', '21200207'),
('Fabricio Vidal', 'Chuquispuma Merino', 'fabricio.chuquispuma@unmsm.edu.pe', '123', 'Estudiante', '21200256'),
('Brisa Valeria', 'Coronel Vilca', 'brisa.coronel@unmsm.edu.pe', '123', 'Estudiante', '21200301'),
('Marko Jhunior', 'Rique García', 'marko.rique@unmsm.edu.pe', '123', 'Estudiante', '21200234'),
('Kenneth Evander', 'Ortega Moran', 'kenneth.ortega@unmsm.edu.pe', '123', 'Estudiante', '21200029'),
('Roddy David', 'Pérez Acosta', 'roddy.perez@unmsm.edu.pe', '123', 'Estudiante', '21200193'),
('Erick Fabrizio', 'Asencios Gutierrez', 'erick.asencios@unmsm.edu.pe', '123', 'Estudiante', '19200273'),
('Manuel Steven', 'Bejar Bonifacio', 'manuel.bejar@unmsm.edu.pe', '123', 'Estudiante', '19200285'),
('Jorge Luis', 'Tomayquispe Ramos', 'jorge.tomayquispe@unmsm.edu.pe', '123', 'Estudiante', '20200300'),
('Tito Camilo', 'Bohorquez Quito', 'tito.bohorquez1@unmsm.edu.pe', '123', 'Estudiante', '16200056'),
('Annie', 'Espinola Ravello', 'annie.espinola@unmsm.edu.pe', '123', 'Estudiante', '19200252'),
('Alex Marcelo', 'Palomino Julian', 'alex.palomino@unmsm.edu.pe', '123', 'Estudiante', '21200244'),
('Airton Wilson', 'Collachagua Poma', 'airton.collachagua@unmsm.edu.pe', '123', 'Estudiante', '21200281'),
('Abigail Yomela', 'Llana Osorio', 'abigail.llana@unmsm.edu.pe', '123', 'Estudiante', '22200248'),
('Daniel Vides', 'Ames Camayo', 'daniel.ames@unmsm.edu.pe', '123', 'Estudiante', '21200023');


INSERT INTO usuarios (nombres, apellidos, correo, contrasena, tipo_usuario, codigo) VALUES
('David Joel', 'Aldana Chavez', 'david.aldana@unmsm.edu.pe', '123', 'Estudiante', '23200076'),
('Milagros Guadalupe', 'Siancas Ramírez', 'milagros.siancas@unmsm.edu.pe', '123', 'Estudiante', '22200154'),
('Elina Kiara', 'Terrones Ulloa', 'Eliana.terrones1@unmsm.edu.pe', '123', 'Estudiante', '22200147'),
('Fabio Sthefano Sneyder', 'Zapata Aguinaga', 'fabio.zapata@unmsm.edu.pe', '123', 'Estudiante', '21200196'),
('José Benjamín', 'Flores Gómez', 'jose.flores39@unmsm.edu.pe', '123', 'Estudiante', '22200289'),
('Gian Franco', 'Alejandro Santaria', 'gian.alejandro@unmsm.edu.pe', '123', 'Estudiante', '21200021'),
('Santiago Jesús', 'Cumpa Pareja', 'santiago.cumpa@unmsm.edu.pe', '123', 'Estudiante', '20200258'),
('Gianlucas Amed', 'Hinostroza Quispe', 'gianlucas.hinostroza@unmsm.edu.pe', '123', 'Estudiante', '21200284'),
('Jose Carlos', 'Cjumo Chumbes', 'jose.cjumo@unmsm.edu.pe', '123', 'Estudiante', '21200219'),
('Akcel Eduardo', 'Ortiz Quispe', 'akcel.ortiz@unmsm.edu.pe', '123', 'Estudiante', '20200278'),
('Victor Hugo', 'Layme Moya', 'victor.layme1@unmsm.edu.pe', '123', 'Estudiante', '21200263'),
('Oscar Isaac', 'Laguna Santa Cruz', 'oscar.laguna@unmsm.edu.pe', '123', 'Estudiante', '21200295'),
('Monica', 'Chambi Flores', 'monica.chambi@unmsm.edu.pe', '123', 'Estudiante', '17200266');

-- Se importo en la tabla horarios el archivo horarios.csv

SELECT * FROM citas;
SELECT nombre, apellido FROM medicos;
SELECT * FROM history;
select * from horarios;

SELECT horarios.fecha, horarios.hora_inicio, horarios.hora_final
                    FROM medicos
                    JOIN horarios ON horarios.id_medico = medicos.id_medico
                    WHERE medicos.id_medico = 1;

SELECT * FROM horarios
-- JOIN citas ON horarios.id_horario = citas.id_atencion
WHERE horarios.id_horario = 1;

SELECT * FROM citas;
UPDATE citas SET estado = 'Reservado', id_paciente = 'id del usuario (probar con 1 x mientras hasta que se ponga la validación deusuario)',
id_atencion = 'valor del diccionario' WHERE id_atencion = 1; 

INSERT INTO citas (id_paciente, id_atencion, estado)
VALUES (1, ?, 'Reservado');

UPDATE citas SET estado = 'Reservado', id_paciente = 1 ,
id_atencion = 1 WHERE id_atencion = 1; 

SELECT * FROM citas;

SELECT correo, 
       SUBSTRING_INDEX(nombres, ' ', 1) AS primer_nombre, 
       codigo 
FROM usuarios;

SELECT * FROM usuarios;

