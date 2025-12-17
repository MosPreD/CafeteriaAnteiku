import { useAuth } from "@/app/context/AuthContext";
import { useCarrito } from "@/app/context/CarritoContext";
import { imagenesCafe } from "@/components/imagenesCafe";
import { Text } from '@/components/Themed';
import { router } from 'expo-router';
import { Alert, FlatList, Image, Pressable, StyleSheet, View } from 'react-native';

export default function CarritoScreen() {
  const { carrito, aumentarCantidad, disminuirCantidad, limpiarCarrito  } = useCarrito();
  const { usuario } = useAuth();

  const total = carrito.reduce(
  (acc, item) => acc + item.precio * item.cantidad,
  0
);

  return (
    <View style={[{paddingTop:60, flex:1, backgroundColor: '#EFE6DD'}]}>
      <View style={styles.container}>

        {carrito.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Pedido vacío, agregue sus favoritos en el{' '}
              <Text style={styles.link} onPress={() => router.push('/catalogo')}>
                catálogo
              </Text>
            </Text>
          </View>
        ) : (
          <>
            <FlatList
              data={carrito}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Image
                    source={imagenesCafe[item.tipoCafe] ?? imagenesCafe.default}
                    style={styles.image}
                  />

                  <View style={styles.infoBox}>
                    <Text style={styles.text}>{item.nombre}</Text>
                    <Text style={styles.precio}>Gs. {item.precio}</Text>

                    {/* CONTROLES DE CANTIDAD */}
                    <View style={styles.cantidadRow}>
                      <Pressable
                        style={styles.qtyButton}
                        onPress={() => disminuirCantidad(item.id)}
                      >
                        <Text style={styles.qtyText}>−</Text>
                      </Pressable>

                      <Text style={styles.cantidad}>{item.cantidad}</Text>

                      <Pressable
                        style={styles.qtyButton}
                        onPress={() => aumentarCantidad(item.id)}
                      >
                        <Text style={styles.qtyText}>+</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              )}
            />
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total a pagar:</Text>
              <Text style={styles.totalAmount}>Gs. {total}</Text>
              <View style={[styles.botonOverlay, {}] } />
              <Pressable
                style={styles.button}
                onPress={() => {
                  if (carrito.length === 0) return;
                  if (!usuario) {
                    Alert.alert("Atención", "Debe iniciar sesión para realizar un pedido");
                    return;
                  }
                  router.push('/pago');
                }}
              >
                <Text style={[styles.text, { top: 2, color: "#FFFFFF" }]}>Realizar Pedido</Text>
              </Pressable>
            </View>
          </>
        )}
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
    color: "#FFFFFF",
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
    color: "#FFFFFF",
  },
  cantidad: {
    fontSize: 14,
    color: "#FFFFFF",
    top: 2,
    alignContent: "center",
  },
  button: {
    backgroundColor: "#9B7C66",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 15,
    alignSelf: "center",
  },
  botonOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(185, 168, 147, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalContainer: {
    marginTop: 20,
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#9B7C66',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  totalText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#43e25dff',
  },
  infoBox: {
  alignItems: 'center',
  backgroundColor: "#9B7C66",
  padding: 10,
  borderRadius: 8,
  width: 140,
},

cantidadRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 6,
},

qtyButton: {
  backgroundColor: '#EFE6DD',
  borderRadius: 6,
  paddingHorizontal: 10,
  paddingVertical: 2,
  marginHorizontal: 10,
},

qtyText: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#9B7C66',
},
emptyContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
emptyText: {
  fontSize: 18,
  color: '#9B7C66',
  textAlign: 'center',
},
link: {
  color: '#E9AE50',
  textDecorationLine: 'underline',
},
});