import * as SQLite from 'expo-sqlite';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { userService } from '../app/services/UserService';

interface DatabaseContextType {
  db: SQLite.SQLiteDatabase | null;
  isReady: boolean;
  initializeDB: () => Promise<void>;
}

const DatabaseContext = createContext<DatabaseContextType>({
  db: null,
  isReady: false,
  initializeDB: async () => {},
});

export const useDatabase = () => useContext(DatabaseContext);

export const DatabaseProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [isReady, setIsReady] = useState(false);

  const initializeDB = async () => {
    try {
      // Abrir la base de datos
      const database = await SQLite.openDatabaseAsync('anteiku.db');
      
      // Configurar el servicio
      userService.setDatabase(database);
      
      // Crear tablas si no existen
      await database.execAsync(`
        CREATE TABLE IF NOT EXISTS Usuarios (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          fecha_creacion TEXT DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE IF NOT EXISTS Sesiones (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          usuario_id INTEGER,
          activa INTEGER DEFAULT 1,
          fecha_inicio TEXT DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
        );
      `);

      console.log('✅ SQLite inicializado correctamente');
      setDb(database);
      setIsReady(true);
    } catch (error) {
      console.error('❌ Error inicializando SQLite:', error);
      setIsReady(true); // Permitir que la app continúe incluso con error
    }
  };

  useEffect(() => {
    initializeDB();
  }, []);

  return (
    <DatabaseContext.Provider value={{ db, isReady, initializeDB }}>
      {children}
    </DatabaseContext.Provider>
  );
};