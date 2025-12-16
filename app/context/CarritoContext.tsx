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
  aumentarCantidad: (id: string) => void;
  disminuirCantidad: (id: string) => void;
  limpiarCarrito: () => void;
};

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);

  const agregarAlCarrito = (item: ItemCarrito) => {
    setCarrito(prev => {
      const existente = prev.find(p => p.id === item.id);
      if (existente) {
        return prev.map(p =>
          p.id === item.id
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        );
      }
      return [...prev, { ...item, cantidad: 1 }];
    });
  };

  const aumentarCantidad = (id: string) => {
    setCarrito(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
  };

  const disminuirCantidad = (id: string) => {
    setCarrito(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter(item => item.cantidad > 0)
    );
  };

  const limpiarCarrito = () => {
  setCarrito([]);
  };

  return (
    <CarritoContext.Provider
      value={{ carrito, agregarAlCarrito, aumentarCantidad, disminuirCantidad, limpiarCarrito}}
    >
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
