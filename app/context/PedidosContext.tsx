import { API_URL } from "@/app/config/api";
import { useAuth } from "@/app/context/AuthContext";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type Pedido = {
  id: number;
  producto: string;
  cantidad: number;
  estado: string;
};

type PedidosContextType = {
  pedidos: Pedido[];
  cargarPedidos: () => Promise<void>;
  crearPedido: (producto: string, cantidad: number) => Promise<void>;
  limpiarPedido: (id: number) => Promise<void>;
  pedidoListo: (id: number) => boolean;
};

const PedidosContext = createContext<PedidosContextType | undefined>(undefined);

export function PedidosProvider({ children }: { children: ReactNode }) {
  const { usuario } = useAuth(); // 🔥 CLAVE
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  // -------- cargar pedidos --------
  const cargarPedidos = async () => {
    if (!usuario) return;

    const res = await fetch(`${API_URL}/pedidos/${usuario.id}`);
    if (!res.ok) return;

    const data = await res.json();
    setPedidos(data);
  };

  useEffect(() => {
    cargarPedidos();
  }, [usuario]);

  // -------- crear pedido --------
  const crearPedido = async (producto: string, cantidad: number) => {
  if (!usuario) {
    console.error("Usuario no cargado");
    throw new Error("Debe iniciar sesión para realizar un pedido");
  }

  const response = await fetch(`${API_URL}/pedidos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      usuario_id: usuario.id, // 🔥 AHORA SÍ EXISTE
      producto,
      cantidad,
    }),
  });

  if (!response.ok) {
    throw new Error("Error al crear pedido");
  }
};


  // -------- limpiar pedido --------
  const limpiarPedido = async (id: number) => {
    await fetch(`${API_URL}/pedidos/${id}`, {
      method: "DELETE"
    });

    setPedidos(prev => prev.filter(p => p.id !== id));
  };

  const pedidoListo = (id: number) => {
    const pedido = pedidos.find(p => p.id === id);
    return pedido?.estado === "Listo";
  };

  return (
    <PedidosContext.Provider
      value={{
        pedidos,
        cargarPedidos,
        crearPedido,
        limpiarPedido,
        pedidoListo
      }}
    >
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
