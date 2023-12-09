-- Este .sql se puede correr con programas como DBeaver
CREATE DATABASE IF NOT EXISTS users;

use users;

-- Tabla de las cuentas de los usuarios
CREATE TABLE cuentas (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    contra VARCHAR(225) NOT NULL
);

