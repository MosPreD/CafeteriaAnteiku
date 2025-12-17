import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "anteiku.db")

conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

# ---- TABLA USUARIOS ----
cursor.execute("""
CREATE TABLE IF NOT EXISTS Usuarios (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Nombre TEXT NOT NULL,
    Email TEXT UNIQUE NOT NULL,
    Password TEXT NOT NULL
)
""")

# ---- TABLA PEDIDOS ----
cursor.execute("""
CREATE TABLE IF NOT EXISTS Pedidos (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    UsuarioId INTEGER NOT NULL,
    Producto TEXT NOT NULL,
    Cantidad INTEGER NOT NULL,
    Estado TEXT NOT NULL,
    FOREIGN KEY (UsuarioId) REFERENCES Usuarios(Id)
)
""")

conn.commit()
conn.close()

print("✅ Tablas Usuarios y Pedidos creadas correctamente")
