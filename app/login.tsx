import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

// --- Componente principal de la pantalla de Login ---
const AnteikuLoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    console.log('Iniciar sesión con:', email, password);
  };

  const handleRegister = () => {
    router.push('/register');
  };

  const handleGoHome = () => {
      console.log('Volviendo a la pantalla de Inicio...');
      router.replace('/'); 
  };

  const Logo = () => (
      <Image
        source={require('../assets/images/iconoAnteiku.png')}
        style={styles.logo}
        resizeMode="contain"
      />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView 
            contentContainerStyle={styles.container} 
            keyboardShouldPersistTaps="handled" 
            showsVerticalScrollIndicator={false}> 

          {/* --- Logo --- */}
          <View style={styles.header}>
            <Logo />
          </View>

          {/* --- Título y Subtítulo --- */}
          <Text style={styles.title}>Iniciar Sesión</Text>
          <Text style={styles.subtitle}>Inicia sesión con tu cuenta de Anteiku</Text>

          {/* --- Campo Email --- */}
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="hey@example.com"
            placeholderTextColor="#A08879"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* --- Campo Contraseña --- */}
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Introduce tu contraseña"
            placeholderTextColor="#A08879"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {/* --- Botón Iniciar Sesión --- */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Iniciar sesión</Text>
          </TouchableOpacity>

          {/* --- Enlace Registrarse --- */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>¿No tienes cuenta? </Text>
            <TouchableOpacity onPress={handleRegister}>
              <Text style={styles.registerLink}>Regístrate aquí</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
    </SafeAreaView>
  );
};

// --- Estilos ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F3EF', 
  },

  container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingBottom: 100, 
    minHeight: '100%',
    paddingTop: 30,
  },
  header: {
    width: '100%',
    height: 300,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },

  backArrow: {
    fontSize: 28,
    color: '#5D4037', 
  },
  logo: {
    width: '50%', 
    height: '50%', 
  },
  title: {
    width: '60%',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5D4037',
    marginBottom: 8,
    textAlign: 'left',
  },
  subtitle: {
    width: '60%',
    fontSize: 16,
    color: '#5D4037',
    marginBottom: 10,
    textAlign: 'left',
  },
  label: {
    width: '60%',
    fontSize: 18,
    fontWeight: '600',
    color: '#5D4037',
    marginTop: 20,
    marginBottom: 8,
    textAlign: 'left',
  },
  input: {
    width: '60%',
    height: 48,
    backgroundColor: '#EAE0D7', 
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#D4C4B8', 
    color: '#5D4037',
    // Estilo para simular el sombreado de la imagen
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  loginButton: {
    width: '60%',
    height: 50,
    backgroundColor: '#A08879', 
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  loginButtonText: {
    color: '#FFFFFF', // Texto blanco
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  registerText: {
    fontSize: 14,
    color: '#5D4037',
  },
  registerLink: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#A08879', 
    textDecorationLine: 'underline',
  },
});

export default AnteikuLoginScreen;