import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import PedidoPendiente from '@/components/PedidoPendiente';
import { Producto } from "@/components/types";

import { usePedidos } from "@/app/context/PedidosContext";
import { Stack } from 'expo-router';


type Pedido = {
  id: string;
  nroPedido: string;
  productos: Producto[];
};

type Props = {
  item: Pedido;
  onLimpiar: (id: string) => void;
};

export function PedidoItem({ item, onLimpiar }: Props) {

  const pedidoEstaListo = item.productos.every(
  (p) => p.estado === "listo"
);
  
  return (
    <View style={{ marginBottom: 30 }}>
      <PedidoPendiente
        nroPedido={item.nroPedido}
        productos={item.productos}
      />

      {pedidoEstaListo && (
        <Pressable
          style={styles.button}
          onPress={() => onLimpiar(item.id)}
        >
          <Text style={styles.text}>Limpiar Pedido</Text>
        </Pressable>
      )}
    </View>
  );
}

export default function PedidosPendientesScreen() {
  const { pedidos, limpiarPedido } = usePedidos();

 return (
  <View style={[{paddingTop:50, flex:1, backgroundColor: '#EFE6DD'}]}>
  <>
  <Stack.Screen options={{ title: 'Pedidos Pendientes' }} />
  
  <View style={{ flex: 1, backgroundColor: "#EFE6DD" }}>
    <FlatList
      style={{ backgroundColor: "#EFE6DD" }}
      contentContainerStyle={{ paddingBottom: 40 }}
      data={pedidos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PedidoItem
          item={item}
          onLimpiar={limpiarPedido}
        />
      )}
       ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 40 }}>
            No hay pedidos pendientes
          </Text>
        }
    />
    
  </View>
  
  </>
  </View>
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