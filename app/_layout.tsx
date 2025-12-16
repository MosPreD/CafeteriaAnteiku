import { CarritoProvider } from "@/app/context/CarritoContext";
import { PedidosProvider } from "@/app/context/PedidosContext";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View } from 'react-native';
import 'react-native-reanimated';


const CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FAF7F3',
    card: '#fff5e8ff',
    text: '#75370A',
    border: '#E0D6C9',
  },
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
     <CarritoProvider>
      <PedidosProvider>
    <View style={{flex:1, backgroundColor: '#FAF7F3'}}>
    <ThemeProvider value={CustomTheme}>
      <Stack
      screenOptions={{
        
        headerTransparent: true, 
        headerTintColor: '#75370a',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="pedidosPendientes" />
      <Stack.Screen name="pago" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
    </ThemeProvider>
    </View>
    </PedidosProvider>
    </CarritoProvider>
  );
}
