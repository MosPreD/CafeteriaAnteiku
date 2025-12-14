import pyodbc

def conectar():
    return pyodbc.connect(
        "DRIVER={ODBC Driver 17 for SQL Server};"
        "SERVER=localhost\\SQLEXPRESS;"
        "DATABASE=Anteiku;"
        "Trusted_Connection=yes;"
        "TrustServerCertificate=yes;"
    )

def cargar_pedido():
    usuario_id = int(input("ID Usuario: "))
    producto = input("Producto: ")
    cantidad = int(input("Cantidad: "))

    conn = conectar()
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO Pedidos (UsuarioId, Producto, Cantidad, Estado) VALUES (?, ?, ?, ?)",
        (usuario_id, producto, cantidad, "Pendiente")
    )

    conn.commit()
    conn.close()

    print("✅ Pedido pendiente cargado")

def ver_pedidos_pendientes():
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT Id, UsuarioId, Producto, Cantidad, FechaPedido
        FROM Pedidos
        WHERE Estado = 'Pendiente'
    """)

    pedidos = cursor.fetchall()

    if not pedidos:
        print("No hay pedidos pendientes")
    else:
        for p in pedidos:
            print(f"ID:{p[0]} | Usuario:{p[1]} | {p[2]} x{p[3]} | {p[4]}")

    conn.close()

def entregar_pedido():
    pedido_id = int(input("ID del pedido a entregar: "))

    conn = conectar()
    cursor = conn.cursor()

    cursor.execute(
        "UPDATE Pedidos SET Estado = 'Entregado' WHERE Id = ?",
        (pedido_id,)
    )

    conn.commit()
    conn.close()

    print("📦 Pedido marcado como ENTREGADO")

# ---------------- MENÚ ----------------

while True:
    print("\n--- MENU PEDIDOS ---")
    print("1 - Cargar pedido pendiente")
    print("2 - Ver pedidos pendientes")
    print("3 - Marcar pedido como entregado")
    print("0 - Salir")

    opcion = input("Opcion: ")

    if opcion == "1":
        cargar_pedido()
    elif opcion == "2":
        ver_pedidos_pendientes()
    elif opcion == "3":
        entregar_pedido()
    elif opcion == "0":
        print("Saliendo...")
        break
    else:
        print("Opcion invalida")
