import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Link, Tabs } from 'expo-router';
import React from 'react';
import { Pressable, View } from 'react-native';

import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarLabelPosition: 'below-icon',
        tabBarActiveTintColor: '#b35512ff',
        tabBarInactiveTintColor: '#705040ff',
        tabBarStyle: {  height: 110 }, // aumentar altura si hace falta
        tabBarLabelStyle: {
          fontSize: 16,    // tamaño de letra
          marginTop: 10,
        },
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
        <Tabs.Screen
        name="carrito"
        options={{
          title: 'Carrito',
          tabBarIcon: ({ color, size }) => <Ionicons name="cart" color="#75370A" size={28} style={{marginBottom : -28}} />,
          headerRight: () => (
          <View style={{ flexDirection: 'row', gap: 15, marginRight: 15}}>
            <Link href="/pedidosPendientes" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="play-forward-circle-outline"
                    size={24}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
            <Link href="/pago" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="cash"
                    size={24}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          </View>
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color="#75370A" size={28} style={{marginBottom : -28}} />,
          headerRight: () => (
          <View style={{ flexDirection: 'row', gap: 15, marginRight: 15}}>
            <Link href="/login" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="person"
                    size={24}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>

            <Link href="/register" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={24}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          </View>
          ),
        }}
      />
      <Tabs.Screen
        name="catalogo"
        options={{
          title: 'Catalogo',
          tabBarIcon: ({ color, size }) => <Ionicons name="cafe" color="#75370A" size={28} style={{marginBottom : -28}} />,
          headerRight: () => (
          <View style={{ flexDirection: 'row', gap: 15, marginRight: 15}}>

            <Link href="/pedido" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="flame"
                    size={24}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          </View>
          ),
        }}
      />
    </Tabs>
  );
}
