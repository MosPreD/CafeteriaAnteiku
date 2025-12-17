import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
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
import userService from './services/UserService';

import { useAuth } from "@/app/context/AuthContext";


const { width } = Dimensions.get('window');

const AnteikuLoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const { login } = useAuth();
  const router = useRouter();

  useEffect(() => {
  setIsInitializing(false);
}, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa email y contraseña');
      return;
    }

    setLoading(true);
    
    try {
      console.log('Intentando login con:', email);
      
      const usuario = await userService.login(email, password);

if (usuario) {
  await login(usuario); // 🔥 AVISA AL AUTHCONTEXT

  Alert.alert(
    '¡Bienvenido!',
    `Hola ${usuario.nombre}, has iniciado sesión exitosamente`,
    [
      {
        text: 'OK',
        onPress: () => {
          router.replace('/(tabs)/catalogo'); 
        }
      }
    ]
  );

  setEmail('');
  setPassword('');
}

 else {
        Alert.alert('Error', 'Email o contraseña incorrectos');
      }
    } catch (error: any) {
      console.error('Error en login:', error);
      Alert.alert('Error', error.message || 'Ocurrió un error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };
  if (isInitializing) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#A08879" />
        <Text style={styles.loadingText}>Inicializando...</Text>
      </View>
    </SafeAreaView>
  );
}

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
        showsVerticalScrollIndicator={false}
      > 
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
          editable={!loading}
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
          editable={!loading}
        />

        {/* --- Botón Iniciar Sesión --- */}
        <TouchableOpacity 
          style={[styles.loginButton, loading && styles.loginButtonDisabled]} 
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.loginButtonText}>Iniciar sesión</Text>
          )}
        </TouchableOpacity>

        {/* --- Enlace Registrarse --- */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>¿No tienes cuenta? </Text>
          <TouchableOpacity onPress={handleRegister} disabled={loading}>
            <Text style={styles.registerLink}>Regístrate aquí</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

// --- Estilos (con algunas adiciones) ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F3EF', 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F3EF',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#5D4037',
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
  loginButtonDisabled: {
    backgroundColor: '#C5B5A9',
    opacity: 0.7,
  },
  loginButtonText: {
    color: '#FFFFFF',
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
  infoBox: {
    width: '80%',
    backgroundColor: '#EAE0D7',
    borderRadius: 10,
    padding: 15,
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#D4C4B8',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5D4037',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#5D4037',
    marginBottom: 5,
    lineHeight: 20,
  },
});

export default AnteikuLoginScreen;