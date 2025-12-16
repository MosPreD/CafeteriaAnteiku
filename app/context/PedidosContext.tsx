import { Producto } from "@/components/types";
import { createContext, ReactNode, useContext, useState } from "react";

export type Pedido = {
  id: string;
  nroPedido: string;
  productos: Producto[];
};

type PedidosContextType = {
  pedidos: Pedido[];
  agregarPedido: (productos: Producto[]) => void;
  limpiarPedido: (id: string) => void;
};

const PedidosContext = createContext<PedidosContextType | undefined>(undefined);

export function PedidosProvider({ children }: { children: ReactNode }) {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const agregarPedido = (productos: Producto[]) => {
    const nuevoPedido: Pedido = {
      id: Date.now().toString(),
      nroPedido: `#${(pedidos.length + 1).toString().padStart(3, "0")}`,
      productos,
    };

    setPedidos(prev => [...prev, nuevoPedido]);
  };

  const limpiarPedido = (id: string) => {
    setPedidos(prev => prev.filter(p => p.id !== id));
  };

  return (
    <PedidosContext.Provider value={{ pedidos, agregarPedido, limpiarPedido }}>
      {children}
    </PedidosContext.Provider>
  );
}

export function usePedidos() {
  const context = useContext(PedidosContext);
  if (!context) {
    throw new Error("usePedidos debe usarse dentro de PedidosProvider");
  }
  return context;
}
