import { createContext, ReactNode, useContext, useState } from "react";

export type ItemCarrito = {
  id: string;
  nombre: string;
  tipoCafe: string;
  precio: number;
  cantidad: number;
};

type CarritoContextType = {
  carrito: ItemCarrito[];
  agregarAlCarrito: (item: ItemCarrito) => void;
};

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);

  const agregarAlCarrito = (item: ItemCarrito) => {
    setCarrito(prev => [...prev, item]);
  };

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error("useCarrito debe usarse dentro de CarritoProvider");
  }
  return context;
}
