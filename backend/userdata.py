import pyodbc

def guardar_usuario(nombre, email, password):
    conexion = pyodbc.connect(
        "DRIVER={ODBC Driver 17 for SQL Server};"
        "SERVER=localhost\\SQLEXPRESS;"
        "DATABASE=Anteiku;"
        "Trusted_Connection=yes;"
        "TrustServerCertificate=yes;"
    )

    cursor = conexion.cursor()

    sql = """
    INSERT INTO Usuarios (Nombre, Email, Password)
    VALUES (?, ?, ?)
    """

    cursor.execute(sql, (nombre, email, password))
    conexion.commit()

    print("Usuario guardado correctamente")

    cursor.close()
    conexion.close()
