import { useCarrito } from "@/app/context/CarritoContext";
import { imagenesCafe } from "@/components/imagenesCafe";
import { Text } from '@/components/Themed';
import { FlatList, Image, Pressable, StyleSheet, View } from 'react-native';

export default function CarritoScreen() {
  const { carrito } = useCarrito();

  return (
    <View style={[{paddingTop:60, flex:1, backgroundColor: '#EFE6DD'}]}>
      <View style={styles.container}>

        <FlatList
          data={carrito}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Image
                source={imagenesCafe[item.tipoCafe] ?? imagenesCafe.default}
                style={styles.image}
              />
              <View style={{ backgroundColor: '#fff5e8ff', padding: 10, borderRadius: 8 }}>
                <Text style={styles.text}>{item.nombre}</Text>
                <Text style={styles.precio}>Gs. {item.precio}</Text>
                <Text style={styles.cantidad}>{item.cantidad}</Text>
              </View>

            </View>

          )}
        />
        <Text style={[styles.text, {}]}>tes</Text>
        <Pressable style={[styles.button, { flexDirection: "row"}]} >
          <Text style={[styles.text, { top: 2, color: "#FFFFFF" }]}>Realizar Pedido</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFE6DD',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  nombre: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tipo: {
    fontSize: 13,
    color: '#777',
  },
  precio: {
    fontSize: 15,
    fontWeight: '600',
    color: '#75370A',
  },
  cantidad: {
    fontSize: 14,
    color: '#ff0000ff',
    top: 2,
  },
  button: {
    backgroundColor: "#9B7C66",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 15,
    alignSelf: "center",
  },
});