import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
//import Ionicons from 'react-native-vector-icons/Ionicons';
const SearchScreen = () => {
  const [query, setQuery] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logoText}>GALPI</Text>
      </View>

      <View style={styles.searchContainer}>
        {/*<Ionicons name="search-outline" size={18} color="#888" */}
        <TextInput
          style={styles.searchInput}
          placeholder="북마크"
          placeholderTextColor="#999"
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.emptyText}>
          {query ? `"${query}" 검색 결과` : '검색 화면'}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },

  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  logoText: {
    fontSize: 24,
    fontWeight: '300',
    letterSpacing: 2,
    color: '#000',
  },

  // 검색바 스타일
  searchContainer: {
    marginHorizontal: 25,
    marginTop: 8,
  },

  searchInput: {
    height: 40,
    backgroundColor: '#EDEDED',
    borderRadius: 20,
    paddingHorizontal: 20,
    fontSize: 14,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 18,
    color: '#666',
  },
});

export default SearchScreen;
