from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import sqlite3
import os
import hashlib
from fastapi.middleware.cors import CORSMiddleware

# ---------- APP ----------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- DB ----------
DB_PATH = os.path.join(os.path.dirname(__file__), "anteiku.db")

def get_db():
    return sqlite3.connect(
        DB_PATH,
        timeout=10,
        check_same_thread=False
    )

def hash_password(password: str):
    return hashlib.sha256(password.encode()).hexdigest()

# ---------- MODELOS ----------
class Pedido(BaseModel):
    usuario_id: int
    producto: str
    cantidad: int

class UsuarioRegistro(BaseModel):
    nombre: str
    email: str
    password: str

class UsuarioLogin(BaseModel):
    email: str
    password: str

# ---------- PEDIDOS ----------
@app.post("/pedidos")
def crear_pedido(pedido: Pedido):
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO Pedidos (UsuarioId, Producto, Cantidad, Estado)
        VALUES (?, ?, ?, ?)
    """, (
        pedido.usuario_id,
        pedido.producto,
        pedido.cantidad,
        "Pendiente"
    ))

    conn.commit()
    conn.close()

    return {"mensaje": "Pedido creado correctamente"}

@app.get("/pedidos/{usuario_id}")
def pedidos_usuario(usuario_id: int):
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT Id, Producto, Cantidad, Estado
        FROM Pedidos
        WHERE UsuarioId = ?
    """, (usuario_id,))

    pedidos = cursor.fetchall()
    conn.close()

    return [
        {
            "id": p[0],
            "producto": p[1],
            "cantidad": p[2],
            "estado": p[3]
        }
        for p in pedidos
    ]

# ---------- USUARIOS ----------
@app.post("/register")
def register(usuario: UsuarioRegistro):
    conn = get_db()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            INSERT INTO Usuarios (Nombre, Email, Password)
            VALUES (?, ?, ?)
        """, (
            usuario.nombre,
            usuario.email,
            hash_password(usuario.password)
        ))
        conn.commit()
        return {"mensaje": "Usuario registrado correctamente"}

    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="El email ya está registrado")

    finally:
        conn.close()

@app.post("/login")
def login(usuario: UsuarioLogin):
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT Id, Nombre, Email
        FROM Usuarios
        WHERE Email = ? AND Password = ?
    """, (
        usuario.email,
        hash_password(usuario.password)
    ))

    user = cursor.fetchone()
    conn.close()

    if not user:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")

    return {
        "id": user[0],
        "nombre": user[1],
        "email": user[2]
    }
