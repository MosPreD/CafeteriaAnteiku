import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';

export default function CatalogoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catalogo</Text>
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
});