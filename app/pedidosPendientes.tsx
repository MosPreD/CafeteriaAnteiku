import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text } from 'react-native';

import PedidoPendiente from '@/components/PedidoPendiente';
import { Producto } from "@/components/types";

type Pedido = {
  id: string;
  nroPedido: string;
  productos: Producto[];
};

export default function PedidosPendientesScreen() {
  const [pedidos, setPedidos] = useState<Pedido[]>([
  { 
    id: "1",
    nroPedido: "#001",
    productos: [
      { id: "p1", tipoCafe:"capuchino", cantidad: 3, estado: "pendiente" as const},
      { id: "p2", tipoCafe:"expreso", cantidad: 2, estado: "listo" as const },
      { id: "p3", tipoCafe:"doble", cantidad: 4, estado: "listo" as const },
    ]
  },
  { 
    id: "2",
    nroPedido: "#002",
    productos: [
      { id: "p1", tipoCafe:"macchiato", cantidad: 5, estado: "listo" as const},
      { id: "p2", tipoCafe:"latte", cantidad: 1, estado: "pendiente" as const },
    ]
  },
]);

  const limpiarPedido = (id: string) => {
    setPedidos((prev) => prev.filter((pedido) => pedido.id !== id));
  };
 return (
    <FlatList style={styles.container}
      data={pedidos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <>
        <PedidoPendiente 
        nroPedido={item.nroPedido} 
        productos={item.productos}
        />

          <Pressable style={styles.button} onPress={() => limpiarPedido(item.id)}>
            <Text style={styles.text}>Limpiar Pedido</Text>
          </Pressable>
        </>
      )}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#EFE6DD',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    backgroundColor: "#994625ff",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 15,
    alignSelf: "center",
  },
  text: {
    fontWeight: "bold",
    color: "#FFFFFF",
    flexDirection: "row",
  },
  box: {
    width: 230,
    height: 35,
    backgroundColor: '#a78770ff',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  miniBox: {
    width: 25,
    height: 25,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 50,
  },
  number: {
    width: 50,
    height: 25,
    borderRadius: 50,
    color: "#FFFFFF",
    backgroundColor: '#a78770ff',
    flexDirection: "row",
    textAlign: "center",
    position:"absolute"
  },
});