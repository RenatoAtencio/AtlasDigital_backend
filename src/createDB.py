import mariadb  # pip3 install mariadb
import sys

# Connect to MariaDB Platform
try:
    conn = mariadb.connect(  # Todos estos datos deberian ser var de entorno
        user="root",
        password="contra",  # Es la contrasena que uno define
        host="127.0.0.1",
        port=3306,
    )

except mariadb.Error as e:
    print(f"Error connecting to MariaDB Platform: {e}")
    sys.exit(1)

cur = conn.cursor()

# Nombre db
db_name = "users"
# Verificar si existe
cur.execute(f"SHOW DATABASES LIKE '{db_name}'")
result = cur.fetchone()

if result:
    print(f"La base de datos '{db_name}' ya existe. Desea eliminarla?(s/n): ")
    x = input()
    if x == "n":
        print("No se eliminara la db")
        sys.exit(1)
    print("Eliminando y creando la base de datos")
    cur.execute(f"DROP DATABASE {db_name}")

# Crear la db
query_create = "CREATE DATABASE users"
cur.execute(query_create)
cur.execute("USE users")

# Crear las tablas
cur.execute(
    "CREATE TABLE cuentas (user_id INT AUTO_INCREMENT PRIMARY KEY,nombre VARCHAR(255) NOT NULL,contra VARCHAR(225) NOT NULL,email VARCHAR(255) NOT NULL,userType VARCHAR(50),UNIQUE KEY email_unico (email));"
)
