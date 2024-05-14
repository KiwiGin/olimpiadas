CREATE DATABASE IF NOT EXISTS bdRedSocial;
USE bdRedSocial;

-- Tabla de Usuarios
CREATE TABLE Usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE,
    genero ENUM('Masculino', 'Femenino', 'Otro'),
    direccion VARCHAR(255),
    telefono VARCHAR(20)
);

-- Tabla de Relaciones de Amistad
CREATE TABLE RelacionesAmistad (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario1 INT,
    id_usuario2 INT,
    FOREIGN KEY (id_usuario1) REFERENCES Usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario2) REFERENCES Usuarios(id) ON DELETE CASCADE,
    UNIQUE KEY (id_usuario1, id_usuario2)
);

-- Tabla de Estudio
CREATE TABLE Estudio (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    escuela VARCHAR(255) NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    pais VARCHAR(100) NOT NULL,
    id_usuario INT,
    fecha_inicio DATE,
    fecha_fin DATE,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id) ON DELETE CASCADE
);

-- Tabla de Trabajo
CREATE TABLE Trabajo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    empresa VARCHAR(255) NOT NULL,
    puesto VARCHAR(100) NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    pais VARCHAR(100) NOT NULL,
    id_usuario INT,
    fecha_inicio DATE,
    fecha_fin DATE,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id) ON DELETE CASCADE
);

-- Tabla de Contenido
CREATE TABLE Contenido (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    ruta VARCHAR(255) NOT NULL,
    fecha_subida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id) ON DELETE CASCADE
);


-- Tabla de Comentario
CREATE TABLE Comentario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    contenido TEXT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_usuario INT,
    id_contenido INT,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (id_contenido) REFERENCES Contenido(id) ON DELETE CASCADE
);
