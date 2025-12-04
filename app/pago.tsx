import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, TextInput } from 'react-native';

export default function PagoScreen() {
  return (
    <View style={styles.container}>
      <Text style={[styles.title,{ position: 'absolute', top: 15}]}>Metodo de pago</Text>

      <Pressable style={[styles.box, {bottom: 200}]} onPress={() => alert("Click!")}>
        <Ionicons name="card-outline" size={48} color="#e9ad55ff"></Ionicons>
        <Text style={styles.text}>Seleccionar{'\n'}metodo de pago</Text>
      </Pressable>

    <View style={{backgroundColor: '#EFE6DD',justifyContent: 'center', alignItems: 'center', bottom:100, borderRadius: 10, }}>
      <Ionicons name="book-outline" size={38} color="#e9ad55ff" style={{top:30, right:90}}></Ionicons>
      <Text style={styles.text}>Datos de facturacion</Text>
      <Text style={[styles.text, {left:0, marginTop:5}]}>C.I o RUC</Text>
      <TextInput style={[styles.text, styles.inputBox]} placeholder="CI / RUC"/>
      <Text style={[styles.text, {left:0, marginTop:5, }]}>Direccion Fiscal</Text>
      <TextInput style={[styles.text, styles.inputBox]} placeholder="Direccion Fiscal"/>
    </View>

      <Pressable style={[styles.button, {flexDirection: "row", top:100}]} onPress={() => alert("Click!")}>
        <Text style={[styles.text, {top:2, color:"#FFFFFF"}]}>Pagar</Text>
        <Ionicons name="bag-check-outline" size={24} color="#e9ad55ff" style={{left:10, bottom:3,}}></Ionicons>
      </Pressable>
      <Text style={[styles.text, {left:0, top:5, fontSize:18}]}>Total a pagar: XXXXXXX</Text>
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
  }
});
