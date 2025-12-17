import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';


export default function IndexScreen() {
  return (
    <View style={styles.container}>
      <Image style={styles.header} source={require('@/assets/images/iconoAnteiku.png')} resizeMode="contain"/>
      <View style={styles.separator} lightColor="#75370A" darkColor="rgba(255,255,255,0.1)">
        <Text style={styles.title}>¡BIENVENIDO!</Text>
        
      </View>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/register')}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Pedi lo que más te gusta y retiralo de nuestro local central! <Ionicons name="heart" size={20} color="#75370A" /></Text>
      <Text style={[styles.text, { fontSize:12}]}>-no trabajamos con delivery :)-</Text>
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
    color: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#75370A',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  separator: {
    marginVertical: 30,
    height: 50,
    width: '80%',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#EFE6DD',
    height: '35%',
  },
  button: {
    width: '60%',
    height: 50,
    backgroundColor: '#A08879',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
