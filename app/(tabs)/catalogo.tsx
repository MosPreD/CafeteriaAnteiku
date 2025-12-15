import { Text, View } from '@/components/Themed';
import { Catalogo } from "@/components/types";
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable } from 'react-native';

import { imagenesCafe } from "@/components/imagenesCafe";

import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

type CafeType = {
  id: string;
  tipoCafe: string;
  catalogo: Catalogo[];
};

type ItemCarrito = {
  id: string;
  nombre: string;
  tipoCafe: string;
};

/* ------------------ PANTALLA PRINCIPAL ------------------ */
export default function AnteikuCatalogScreen() {
  const [searchText, setSearchText] = useState('');
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false);
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [openPopupAgregar, setopenPopupAgregar] = useState(false);
  const [cafeSeleccionado, setCafeSeleccionado] = useState<ItemCarrito | null>(null);


  const agregarAlCarrito = (item: ItemCarrito) => {
    setCarrito(prev => [...prev, item]);
  };

  const toggleFavorito = (id: string) => {
    setFavoritos(prev =>
      prev.includes(id)
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  const [cafes, setCafes] = useState<CafeType[]>([
  {
    id: '1',
    tipoCafe: 'Cafe',
    catalogo: [
      { id: '1', nombre: 'Expreso', tipoCafe: 'expreso' },
      { id: '2', nombre: 'Doble',  tipoCafe: 'doble' },
      { id: '3', nombre: 'Americano',  tipoCafe: 'americano' },
    ],
  },
  {
    id: '2',
    tipoCafe: 'CafeConLeche',
    catalogo: [
      { id: '4', nombre: 'Cafe Con Leche',  tipoCafe: 'cafe_leche' },
      { id: '5', nombre: 'Cortado', tipoCafe: 'cortado' },
      { id: '6', nombre: 'Hawaiano', tipoCafe: 'hawaiano' },
    ],
  },
  {
    id: '3',
    tipoCafe: 'Espumoso',
    catalogo: [
      { id: '7', nombre: 'Macchiato', tipoCafe: 'macchiato' },
      { id: '8', nombre: 'Capuchino', tipoCafe: 'capuchino' },
      { id: '9', nombre: 'Latte', tipoCafe: 'latte' },
    ],
  },
]);

  const filteredData = cafes.map(section => {
  let catalogoFiltrado = section.catalogo.filter(item =>
    item.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  if (mostrarFavoritos) {
    catalogoFiltrado = catalogoFiltrado.filter(item =>
      favoritos.includes(item.id)
    );
  }

  return {
    ...section,
    catalogo: catalogoFiltrado,
    };
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>

        {/* Barra de búsqueda */}
        <View style={styles.searchBarContainer}>
          <FontAwesome name="search" size={20} color="#A08879" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar"
            placeholderTextColor="#A08879"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Favoritos */}
        <TouchableOpacity
          style={[
            styles.favoritesContainer,
            mostrarFavoritos && { backgroundColor: '#E9AE50' },
          ]}
          onPress={() => setMostrarFavoritos(prev => !prev)}
        >
          <FontAwesome
            name={mostrarFavoritos ? 'heart' : 'heart-o'}
            size={20}
            color="#5D4037"
            style={styles.heartIcon}
          />
          <Text style={styles.favoritesText}>Favoritos</Text>
        </TouchableOpacity>

        {/* Secciones */}
        {filteredData.map(section =>
          section.catalogo.length > 0 ? (
            <View key={section.id} style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{section.tipoCafe}</Text>
                <Text style={styles.arrow}>›</Text>
              </View>

              <View style={styles.itemsRow}>
                {section.catalogo.map(item => {
                  const esFavorito = favoritos.includes(item.id);

                  return (
                    <View key={item.id} style={styles.item}>
                      <TouchableOpacity
                        onPress={() => {
                          const cafe = {
                            id: item.id,
                            nombre: item.nombre,
                            tipoCafe: item.tipoCafe,
                          };

                          setCafeSeleccionado(cafe);
                          setopenPopupAgregar(true);
                        }}
                      >
                        <Image
                          source={imagenesCafe[item.tipoCafe] ?? imagenesCafe.default}
                          style={styles.image}
                        />
                        <Text style={styles.itemText}>{item.nombre}</Text>
                      </TouchableOpacity>

                      {/* FAVORITO */}
                      <TouchableOpacity
                        style={styles.favButton}
                        onPress={() => toggleFavorito(item.id)}
                      >
                        <FontAwesome
                          name={esFavorito ? 'heart' : 'heart-o'}
                          size={18}
                          color={esFavorito ? '#E53935' : '#A08879'}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            </View>
          ) : null
        )}

      <View style={{ height: 100, backgroundColor: 'transparent' }} />
        </ScrollView>
      {openPopupAgregar && cafeSeleccionado && (
        <View style={styles.popupOverlay}>
          <View style={[styles.popup, { width: 350, height: 400 }]}>

            <Pressable
              style={[styles.closeButton, { top: 5, left: 310 }]}
              onPress={() => setopenPopupAgregar(false)}
            >
              <Ionicons name="close-circle-outline" size={32} color="#fff" />
            </Pressable>

            <Image
              source={imagenesCafe[cafeSeleccionado.tipoCafe] ?? imagenesCafe.default}
              style={{ width: 120, height: 120, borderRadius: 60, marginBottom: 15 }}
            />

            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>
              {cafeSeleccionado.nombre}
            </Text>

            <Pressable
              style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}
              onPress={() => {
                setCarrito(prev => [...prev, cafeSeleccionado]);
                setopenPopupAgregar(false);
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff', marginRight: 8 }}>
                Agregar al carrito
              </Text>
              <Ionicons name="cart" size={28} color="#fff" />
            </Pressable>

          </View>
        </View>
      )}
    </SafeAreaView> 
  );
}

/* ------------------ ESTILOS ------------------ */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EFE6DD',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#EFE6DD',
    
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5EFEA',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#5D4037',
  },
  favoritesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  heartIcon: {
    marginRight: 8,
  },
  favoritesText: {
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#EFE6DD',
    
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  arrow: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  itemsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  item: {
    alignItems: 'center',
    width: '30%',
    backgroundColor: 'transparent',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 6,
  },
  itemText: {
    fontSize: 13,
    textAlign: 'center',
  },
  favButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    padding: 4,
  },
  popup: {
    position: 'absolute',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 400,
    backgroundColor:"#9B7C66", 
  },
  popupOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
    closeButton: {
    position: 'absolute',
    bottom: 360,
    left: 260,
    backgroundColor: '#9B7C66',
    fontSize: 30,
  },
});
