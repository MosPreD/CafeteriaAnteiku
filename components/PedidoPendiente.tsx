import { StyleSheet, Text, View } from 'react-native';
import Pedido from './Pedido';

import { Producto } from "@/components/types";

interface Props {
  nroPedido: string;
  productos: Producto[];
}

export default function PedidoPendiente({nroPedido = "#000",  productos }: Props) {
    return (
        <View style={{padding: 10, marginTop:50, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={[styles.box,{bottom:40, textAlign:'center', color: "#FFFFFF",}]}>Pedido {nroPedido}</Text>
            
            {productos.map((p) => (
              <Pedido 
                key={p.id} 
                producto={p} />
                
            ))}
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
    image: {
    width: 75,
    height: 75,
    borderRadius: 50,
    bottom:30,
    right:50
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
});