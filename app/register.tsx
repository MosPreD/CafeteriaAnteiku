import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
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
import { API_URL } from './config/api';

const { width } = Dimensions.get('window');

// --- Componente principal de la pantalla de Registro ---
const AnteikuRegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleRegister = async () => {
        if (!name || !email || !password) {
            Alert.alert('Error', 'Por favor completa todos los campos');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: name,
                    email,
                    password,
                }),
            });

            if (response.ok) {
                Alert.alert('Éxito', 'Cuenta creada exitosamente', [
                    { text: 'OK', onPress: () => router.push('/login') }
                ]);
            } else {
                const errorData = await response.json();
                Alert.alert('Error', errorData.detail || 'Error al registrar');
            }
        } catch (error) {
            console.error('Error en registro:', error);
            Alert.alert('Error', 'Error de conexión');
        }
    };

    const Logo = () => (
          <Image
            source={require('../assets/images/iconoAnteiku.png')}
            style={styles.logo}
            resizeMode="contain"
          />
      );

    const handleLoginRedirect = () => {
        router.push('/login');
    };
    


    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />
            <ScrollView 
                        contentContainerStyle={styles.contentContainer} 
                        keyboardShouldPersistTaps="handled" 
                        showsVerticalScrollIndicator={false}> 

                {/* --- Logo --- */}
                <View style={styles.header}>
                  <Logo />
                </View>

                {/* --- Título y Subtítulo --- */}
                <Text style={styles.title}>Registro</Text>
                <Text style={styles.subtitle}>Crea tu cuenta en Anteiku</Text>

                {/* --- Campo Nombre --- */}
                <Text style={styles.label}>Nombre</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    placeholderTextColor="#A08879"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                    />

                </View>

                {/* --- Campo Email --- */}
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputContainer}> 
                    <TextInput
                        style={styles.input}
                        placeholder="hey@example.com"
                        placeholderTextColor="#A08879"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                {/* --- Campo Contraseña --- */}
                <Text style={styles.label}>Contraseña</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Introduce tu contraseña"
                      placeholderTextColor="#A08879"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                    />
                </View>

                {/* --- Botón Crear Cuenta --- */}
                <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                    <Text style={styles.registerButtonText}>Crear Cuenta</Text>
                </TouchableOpacity>

                {/* --- Enlace Iniciar Sesión --- */}
                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>¿Ya tienes cuenta? </Text>
                    <TouchableOpacity onPress={handleLoginRedirect}>
                        <Text style={styles.loginLink}>Inicia sesión aquí</Text>
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

    contentContainer: {
        flex: 1,
        paddingHorizontal: width * 0.01, 
        alignItems: 'center', 
        justifyContent: 'center',
        paddingBottom: 100,
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
    
    fixedHeader: {
        position: 'absolute',
        top: 0,
        width: '100%',
        paddingHorizontal: width * 0.08,
        height: 60,
        zIndex: 10,
        justifyContent: 'center',
    },
 
    backArrow: {
        fontSize: 28,
        color: '#5D4037', 
    },

    logo: {
    width: '50%', 
    height: '50%', 
    },
    
    // --- Tipografía y Títulos ---
    title: {
        width: '60%',
        fontSize: 28,
        fontWeight: 'bold',
        color: '#5D4037',
        marginBottom: 4,
        textAlign: 'left',
    },
    subtitle: {
        width: '60%',
        fontSize: 16,
        color: '#5D4037',
        marginBottom: 15, 
        textAlign: 'left',
    },
    
    // --- Campos de Formulario ---
    label: {
        width: '60%',
        fontSize: 16, 
        fontWeight: '600',
        color: '#5D4037',
        marginTop: 15, 
        marginBottom: 6,
        textAlign: 'left',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '60%',
        position: 'relative',
        marginBottom: 5,
    },
    input: {
        flex: 1, 
        height: 48,
        backgroundColor: '#EAE0D7', 
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#D4C4B8', 
        color: '#5D4037',
        // Sombreado
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 2,
    },
    checkIcon: {
        position: 'absolute',
        right: 15,
        fontSize: 18,
        color: '#A08879',
    },
    
    // --- Botón ---
    registerButton: {
        width: '60%',
        height: 50,
        backgroundColor: '#A08879', 
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30, 
        // Sombreado
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    registerButtonText: {
        color: '#FFFFFF', 
        fontSize: 18,
        fontWeight: 'bold',
    },
    
    // --- Enlace de Login ---
    loginContainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    loginText: {
        fontSize: 14,
        color: '#5D4037',
    },
    loginLink: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#A08879', 
    },
});

export default AnteikuRegisterScreen;