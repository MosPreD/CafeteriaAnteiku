import { MetodoPago, Pago, ServicioPago } from '@/components/tiposPagos';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Stack } from 'expo-router';

import { useAuth } from "@/app/context/AuthContext";
import { useCarrito } from "@/app/context/CarritoContext";
import { usePedidos } from "@/app/context/PedidosContext";


export default function PagoScreen() {
  const [openPopup, setOpenPopup] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [openPopupTipoPago, setOpenPopupTipoPago] = useState(false);
  const [openPopupPagar, setOpenPopupPagar] = useState(false);
  const [openPopupFinalizar, setOpenPopupFinalizar] = useState(false);
  const [metodoSeleccionado, setMetodoSeleccionado] = useState<MetodoPago | null>(null);
  const [ciRuc, setCiRuc] = useState('');
  const [direccionFiscal, setDireccionFiscal] = useState('');
  const [error, setError] = useState('');
  const [openPopupError, setOpenPopupError] = useState(false);
  const { carrito, limpiarCarrito } = useCarrito();
  const { crearPedido  } = usePedidos();
const { usuario } = useAuth();
  const pagar = async () => {
  const servicio = new ServicioPago();

  const pago: Pago = {
    id: Date.now().toString(),
    metodo: metodoSeleccionado!,
    cantidad: 1500,
    fecha: new Date(),
    status: 'pendiente',
  };

  const ok = await servicio.procesarPago(pago);

  setMensaje(
    pago.status === 'completado'
      ? '✅ Pago aprobado'
      : '❌ Pago rechazado'
  );

  return ok;
};
  
  const METODOS_PAGO = [
    { key: MetodoPago.TARJETA, label: 'Tarjeta', icon: 'card-outline' },
    { key: MetodoPago.EFECTIVO, label: 'Efectivo', icon: 'cash-outline' },
    { key: MetodoPago.PAYPAL, label: 'PayPal', icon: 'logo-paypal' },
    { key: MetodoPago.TRANSFERENCIA, label: 'Transferencia', icon: 'swap-horizontal-outline' },
  ];

  const handlePagar = () => {
    if (!ciRuc.trim() || !direccionFiscal.trim()) {
      setError('Debe completar CI/RUC y Dirección Fiscal');
      setOpenPopupError(true);
      return;
    }

    if (!metodoSeleccionado) {
      setError('Debe seleccionar un método de pago');
      setOpenPopupError(true);
      return;
    }

    setError('');
    setOpenPopupPagar(true);
  };

const finalizarPago = async () => {
  if (carrito.length === 0) return;
  try {
    const promises = carrito.map(item => 
      crearPedido(item.tipoCafe, item.cantidad)
    );
    
    await Promise.all(promises);
    limpiarCarrito();
    setOpenPopupFinalizar(false);
    
    router.push('/pedidosPendientes');
    
  } catch (err: any) {
    console.error('Error al crear pedidos:', err);
    setError(err.message || "Error al procesar el pedido");
    setOpenPopupError(true);
  } 
};



  return (
    <View style={[{paddingTop:50, flex:1, backgroundColor: '#EFE6DD'}]}>
     <>
  <Stack.Screen options={{ title: 'Pago' }} />
  
    <View style={styles.container}>
      <Text style={[styles.title,{ position: 'absolute', top: 50}]}>Metodo de pago</Text>

      <Pressable style={[styles.box, { bottom: 120, backgroundColor:"#b3a8a1ff" }]} onPress={() => setOpenPopupTipoPago(true)}>
        <Ionicons name="card-outline" size={48} color="#6e5353ff" />
        <Text style={styles.text}>
          {metodoSeleccionado
            ? `Método: \n${metodoSeleccionado}`
            : 'Seleccionar\nmétodo de pago'}
        </Text>
      </Pressable>


    <View style={{backgroundColor: '#EFE6DD',justifyContent: 'center', alignItems: 'center', bottom:100, borderRadius: 10, }}>
      <Ionicons name="book-outline" size={38} color="#afa391ff" style={{top:30, right:90}}></Ionicons>
      <Text style={styles.text}>Datos de facturacion</Text>
      <Text style={[styles.text, {left:0, marginTop:5}]}>C.I o RUC</Text>
      <TextInput style={[styles.text, styles.inputBox]} placeholder="CI / RUC" value={ciRuc} onChangeText={setCiRuc}/>
      <Text style={[styles.text, {left:0, marginTop:5, }]}>Direccion Fiscal</Text>
      <TextInput style={[styles.text, styles.inputBox]} placeholder="Direccion Fiscal" value={direccionFiscal} onChangeText={setDireccionFiscal}/>
    
    
    </View>

      <Pressable style={[styles.button, { flexDirection: "row", top: 100 }]} onPress={handlePagar}>
        <Text style={[styles.text, { top: 2, color: "#FFFFFF" }]}>Pagar</Text>
        <Ionicons name="bag-check-outline" size={24} color="#afa391ff" style={{ left: 10, bottom: 3 }}/>
      </Pressable>
    
    {openPopupTipoPago && (
      <View style={styles.popupOverlay}>
        <View style={styles.popup}>
          
          <Pressable
            style={styles.closeButton}
            onPress={() => setOpenPopupTipoPago(false)}
          >
            <Ionicons name="close-circle-outline" size={32} color="#fff" />
          </Pressable>

          <Text style={styles.popupTitle}>Seleccionar método de pago</Text>

          {METODOS_PAGO.map((item) => (
            <Pressable
              key={item.key}
              style={[
                styles.metodoItem,
                metodoSeleccionado === item.key && styles.metodoSeleccionado,
              ]}
              onPress={() => {
                setMetodoSeleccionado(item.key);
                setOpenPopupTipoPago(false);
              }}
            >
              <Ionicons name={item.icon as any} size={28} color="#3d311eff" />
              <Text style={styles.metodoText}>{item.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    )}
    {openPopupPagar && (
      <View style={styles.popupOverlay}>
        <View style={styles.popup}>

          <Pressable style={styles.closeButton} onPress={() => setOpenPopupPagar(false)}>
            <Ionicons name="close-circle-outline" size={32} color="#fff" />
          </Pressable>
          <Text style={styles.metodoText}>Método de pago seleccionado:</Text>
          {(() => {
        const metodo = METODOS_PAGO.find(
          (item) => item.key === metodoSeleccionado
        );

        if (!metodo) {
          return (
            <Text style={[styles.metodoText, { marginTop: 8 }]}>
              No seleccionado
            </Text>
          );
        }

        return (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 , backgroundColor:"#ffffff00"}}>
            <Ionicons
              name={metodo.icon as any}
              size={28}
              color="#7c6c54ff"
              style={{ marginRight: 8 }}
            />
            <Text style={[styles.metodoText, { fontWeight: 'bold' }]}>
              {metodo.label}
            </Text>
          </View>
        );
      })()}
            <Pressable style={[styles.button, { flexDirection: "row", top: 80, backgroundColor:"#ffffff1a" }]} onPress={async () => {
              const ok = await pagar();
              setOpenPopupPagar(false);
              if (ok) {
                setOpenPopupFinalizar(true);
              } else {
                setError('Pago rechazado');
                setOpenPopupError(true);
              }}}>
          <Text style={[styles.text, {top:2, color:"#FFFFFF"}]}>Proceder</Text>
          <Ionicons name="checkmark-circle-outline" size={24} color="#7c6c54ff" style={{left:10, bottom:0,}}></Ionicons>
        </Pressable>
        </View>
      </View>
    )}
    {openPopupFinalizar && (
       <View style={styles.popupOverlay}>
        <View style={[styles.popup, {width: 350, height: 150}]}>
          <Pressable
        style={[styles.closeButton, { bottom: 110, left: 310 }]}
        onPress={finalizarPago}
      >
        <Ionicons name="close-circle-outline" size={32} color="#fff" />
      </Pressable>

          <Text style={styles.metodoText}>Pago realizado con exito</Text>
          
        </View>
       </View>
    )
  }
  {openPopupError && (
       <View style={styles.popupOverlay}>
        <View style={[styles.popup, {width: 350, height: 150}]}>
          <Pressable style={[styles.closeButton, {bottom:110, left:310}]} onPress={() => {setOpenPopupError(false);}}>
            <Ionicons name="close-circle-outline" size={32} color="#ddc9c9ff" />
          </Pressable>
          <Text style={styles.metodoText}>{error}</Text>
        </View>
       </View>
    )
  }
    </View>
    </>
    </View>
  );
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFE6DD',
    paddingTop: 50 
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    bottom:100,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#9B7C66",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 15,
    alignSelf: "center",
  },
  text: {
    fontSize: 16,
    marginStart: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  box: {
    width: 200,
    height: 100,
    backgroundColor: '#ccc',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  inputBox: {
    backgroundColor:"#C4C4C4", 
    borderColor:"#75370A", 
    borderWidth: 2, 
    borderRadius: 8, 
    width:300, 
    height:40
  },
  popup: {
    position: 'absolute',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 400,
    backgroundColor:"#a79a91ff", 
  },
  closeButton: {
    position: 'absolute',
    bottom: 360,
    left: 260,
    fontSize: 30,
  },
  popupOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#ffffffff',
  },
  metodoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#EFE6DD',
    marginBottom: 10,
  },
  metodoSeleccionado: {
    backgroundColor: '#E9AE50',
  },
  metodoText: {
    marginLeft: 12,
    fontWeight: 'bold',
  },
});