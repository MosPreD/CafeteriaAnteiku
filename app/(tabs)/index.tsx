import { Image, StyleSheet, Text } from 'react-native';

import { View } from '@/components/Themed';

export default function IndexScreen() {
  return (
    <View style={styles.container}>
      <Image style={styles.header} source={require('@/assets/images/iconoAnteiku.png')} resizeMode="contain"/>
      <View style={styles.separator} lightColor="#75370A" darkColor="rgba(255,255,255,0.1)">
        <Text style={styles.title}>¡BIENVENIDO!</Text>
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
    color: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
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
});
