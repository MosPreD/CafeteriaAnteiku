import pyodbc

def insertar_pedido(usuario_id, producto, cantidad):
    try:
        conexion = pyodbc.connect(
            "DRIVER={ODBC Driver 17 for SQL Server};"
            "SERVER=localhost\\SQLEXPRESS;"
            "DATABASE=Anteiku;"
            "Trusted_Connection=yes;"
            "TrustServerCertificate=yes;"
        )

        cursor = conexion.cursor()

        sql = """
        INSERT INTO Pedidos (UsuarioId, Producto, Cantidad, Estado)
        VALUES (?, ?, ?, ?)
        """

        cursor.execute(sql, (usuario_id, producto, cantidad, "Pendiente"))
        conexion.commit()

        print("Pedido pendiente cargado correctamente")

    except Exception as e:
        print("ERROR:", e)

    finally:
        cursor.close()
        conexion.close()


insertar_pedido(1, "Cafe latte", 2)
