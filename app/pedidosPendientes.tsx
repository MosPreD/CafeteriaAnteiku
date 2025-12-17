import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { Producto } from "@/components/types";

import { Pedido, usePedidos } from "@/app/context/PedidosContext";
import { imagenesCafe } from "@/components/imagenesCafe";
import { nombresCafe } from "@/components/nombresCafe";
import { Stack, useFocusEffect } from 'expo-router';
import { useCallback, useEffect } from "react";
import { Image } from "react-native";


type LocalPedido = {
  id: string;
  nroPedido: string;
  productos: Producto[];
};

type Props = {
  item: Pedido;
  onLimpiar: (id: number) => void;
};

export function PedidoItem({ item, onLimpiar }: Props) {

  const pedidoEstaListo = item.estado === "Listo";
  const imagen = imagenesCafe[item.producto] || imagenesCafe["default"];

  return (
    <View
  style={{
    marginBottom: 15,
    padding: 10,
    backgroundColor: pedidoEstaListo ? "#339436ff" : "#c99343ff",
    borderRadius: 15,
    width: "200%",
    alignSelf: "center",
    alignContent: "center"
  }}
>
      
      <Text style={{ fontWeight: "bold", fontSize: 16 }}>
        Pedido #{item.id}
      </Text>

      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
        <Image
          source={imagen}
          style={{ width: 60, height: 60, borderRadius: 30, marginRight: 15 }}
        />

        <View>
          <Text style={{ fontWeight: "bold" }}>
            {nombresCafe[item.producto] || nombresCafe.default}
          </Text>
          <Text>
            Cantidad: {item.cantidad}
          </Text>
          <Text>
            Estado: {item.estado}
          </Text>
        </View>
      </View>

      {pedidoEstaListo && (
        <Pressable
          style={[styles.button, { marginTop: 15 }]}
          onPress={() => onLimpiar(item.id)}
        >
          <Text style={styles.text}>Limpiar Pedido</Text>
        </Pressable>
      )}
    </View>
  );
}

export default function PedidosPendientesScreen() {
  const { pedidos, limpiarPedido, cargarPedidos, marcarPedidoListo  } = usePedidos();
  
  
useFocusEffect(
    useCallback(() => {
      cargarPedidos();
    }, [])
  );
  
  useEffect(() => {
  pedidos.forEach(pedido => {
    if (pedido.estado === "Pendiente") {
      const delay = Math.floor(Math.random() * 2000) + 5000; // 5–7s

      setTimeout(() => {
        marcarPedidoListo(pedido.id);
      }, delay);
    }
  });
}, [pedidos]);

    const pedidosVisibles = pedidos.filter(
  p => p.estado === "Pendiente" || p.estado === "Listo"
);

 return (
  <View style={[{paddingTop:50, flex:1, backgroundColor: '#EFE6DD'}]}>
  <>
  <Stack.Screen options={{ title: 'Pedidos' }} />
  
  <View style={{ flex: 1, backgroundColor: "#EFE6DD" }}>
    <FlatList
      style={{ backgroundColor: "#EFE6DD" }}
      contentContainerStyle={{
        paddingBottom: 40,
        alignItems: "center",
      }}
      data={pedidosVisibles}
      keyExtractor={(item) => item.id.toString()}
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
    backgroundColor: "#75370A",
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