from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import sqlite3
import os
import hashlib
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8081",  # Expo Web
        "http://localhost:19006", # Expo antiguo
        "http://127.0.0.1:8081",
        "http://localhost:3000",  # por si usás React web
        "http://192.168.100.99:8081",  # Para dispositivo
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


DB_PATH = os.path.join(os.path.dirname(__file__), "anteiku.db")

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

def get_db():
    return sqlite3.connect(
        DB_PATH,
        timeout=10,
        check_same_thread=False
    )

def hash_password(password: str):
    return hashlib.sha256(password.encode()).hexdigest()

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
@app.post("/register")
def register(usuario: UsuarioRegistro):
    conn = None
    try:
        conn = get_db()
        cursor = conn.cursor()

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

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        if conn:
            conn.close()

@app.post("/login")
def login(usuario: UsuarioLogin):
    conn = None
    try:
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

        if not user:
            raise HTTPException(status_code=401, detail="Credenciales incorrectas")

        return {
            "id": user[0],
            "nombre": user[1],
            "email": user[2]
        }

    finally:
        if conn:
            conn.close()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
