import { imagenesCafe } from "@/components/imagenesCafe";
import { Producto } from "@/components/types";
import { Image, StyleSheet, Text, View } from 'react-native';

interface Props {
  producto: Producto;
}

export default function Pedido({producto }: Props) {
  
  const { tipoCafe, cantidad, estado } = producto;
  const imagen = imagenesCafe[tipoCafe] || imagenesCafe['default'];

  const isPendiente = estado === "pendiente";

  const miniBoxStyle = {
    backgroundColor: isPendiente ? "#f1c18cff" : "#b7f596ff",
    width: 25,
    height: 25,
    borderRadius: 20,
    marginLeft:50,
    marginBottom:50,
  };

  const miniBoxTextStyle = {
    color: isPendiente ? "#B9713D" : "#41C519",
    fontWeight: "bold",
  };

    return (
        <View style={{ flexDirection: "row", padding:30, alignItems: "center" }}>
          <View style={{ alignItems: "center" }}>
            <Image source={imagenesCafe[producto.tipoCafe]} style={styles.image}/>
            <Text style={[styles.textCoffee, { bottom:30, right:50}]}>{tipoCafe}</Text>
          </View>
            <View style={[styles.number, {marginTop:70, marginLeft:-40}]}>{cantidad}</View>
            
            <View style={miniBoxStyle}>
                <Text style={[styles.text, 
                  { color: estado === "pendiente" ? "#B9713D" : "#41C519"}]}>
                    {estado === "pendiente" ? "Pendiente" : "Listo"}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  miniBox: {
    width: 25,
    height: 25,
    backgroundColor: '#E9AE50',
    borderRadius: 20,
    marginLeft:50,
    marginBottom:50,
  },
    text: {
    fontWeight: "bold",
    marginLeft:-80,
  },
  textCoffee: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
    image: {
    width: 75,
    height: 75,
    borderRadius: 50,
    bottom:30,
    right:50
  },
  number: {
    width: 50,
    height: 25,
    borderRadius: 50,
    color: "#FFFFFF",
    backgroundColor: '#a78770ff',
    textAlign: "center",
    position:"absolute"
  },
});