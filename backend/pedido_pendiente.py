import pyodbc

def ver_pedidos_pendientes():
    conexion = pyodbc.connect(
        "DRIVER={ODBC Driver 17 for SQL Server};"
        "SERVER=localhost\\SQLEXPRESS;"
        "DATABASE=Anteiku;"
        "Trusted_Connection=yes;"
        "TrustServerCertificate=yes;"
    )

    cursor = conexion.cursor()

    sql = """
    SELECT P.Id, U.Nombre, P.Producto, P.Cantidad, P.FechaPedido, P.Estado
    FROM Pedidos P
    JOIN Usuarios U ON P.UsuarioId = U.Id
    WHERE P.Estado = 'Pendiente'
    """

    cursor.execute(sql)

    pedidos = cursor.fetchall()

    if pedidos:
        for pedido in pedidos:
            print(f"ID: {pedido[0]}, Usuario: {pedido[1]}, Producto: {pedido[2]}, Cantidad: {pedido[3]}, Fecha: {pedido[4]}, Estado: {pedido[5]}")
    else:
        print("No hay pedidos pendientes")

    cursor.close()
    conexion.close()

# --- Ver los pedidos pendientes ---
ver_pedidos_pendientes()

