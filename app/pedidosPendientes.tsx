import { Image, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';

export default function PedidosPendientesScreen() {
  return (
    <View style={styles.container}>
      <View style={[styles.box, {bottom:350}]}>    
        <Text style={styles.text}>Pedido #001</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 30, backgroundColor: 'transparent', position: "absolute", top: 200 }}>
        <Image source={require('@/assets/images/cafe.png')} style={[styles.image, {marginRight: 80}]}/>
      <Text style={[styles.number, {marginTop:100, marginLeft:12}]}>1</Text>
        <View style={styles.miniBox}> 
          <Text style={[styles.text, {marginRight:100, color:"#B9713D"}]}>Pendiente</Text>
        </View>
        <View style={[styles.miniBox, {marginLeft: 50}]}> 
          <Text style={[styles.text, {marginRight:60, color:"#41C519"}]}>Listo</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: "#9B7C66",
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
