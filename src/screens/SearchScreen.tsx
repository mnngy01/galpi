import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  ListRenderItem,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getSourceName } from '../utils/getSourceName';
import { searchBookmarks, Bookmark } from '../services/bookmarkApi';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState<Bookmark[]>([]);

  const handleSearch = async () => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredResults([]);
      return;
    }
    try {
      const results = await searchBookmarks(query);
      setFilteredResults(results ?? []);
    } catch (err) {
      console.error('검색 실패:', err);
      setFilteredResults([]);
    }
  };

  const renderCardItem: ListRenderItem<Bookmark> = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() => {
          if (item.url) {
            Linking.openURL(item.url).catch(err =>
              console.error('링크를 열 수 없습니다:', err),
            );
          }
        }}
      >
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.thumbnail} />
        ) : (
          <View style={[styles.thumbnail, styles.emptyThumbnail]} />
        )}

        <View style={styles.overlay}>
          <Text style={styles.cardTitle} numberOfLines={1}>
            {getSourceName(item.url)}
          </Text>
          <Text style={styles.cardSummary} numberOfLines={2}>
            {item.aiSummary ?? ''}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderContent = () => {
    if (!searchQuery) {
      return <Text style={styles.emptyText}> </Text>;
    }

    if (filteredResults.length === 0) {
      return (
        <Text style={styles.emptyText}>
          "{searchQuery}" 검색 결과가 없습니다.
        </Text>
      );
    }

    return (
      <FlatList
        data={filteredResults}
        renderItem={renderCardItem}
        keyExtractor={item => item.id.toString()}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
        <View style={styles.header}>
          <Image
            source={require('../assets/logo_pink_2.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </SafeAreaView>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="북마크 검색"
          placeholderTextColor="#999"
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />
      </View>

      <View style={styles.content}>{renderContent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  headerSafeArea: { backgroundColor: '#FFFFFF' },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
    logo: {
    width: 100,
    height: 40,
  },
  searchContainer: {
    marginHorizontal: 25,
    marginTop: 8,
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    backgroundColor: '#EDEDED',
    borderRadius: 20,
    paddingHorizontal: 20,
    fontSize: 14,
    color: '#000',
  },
  content: {
    flex: 1,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 40,
  },
  listContainer: {
    paddingHorizontal: 25,
    paddingTop: 12,
    paddingBottom: 100,
  },
  card: {
    width: '100%',
    height: 110,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#E0E0E0',
    marginBottom: 14,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  emptyThumbnail: {
    backgroundColor: '#D1D1D6',
  },
  overlay: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    marginBottom: 4,
  },
  cardSummary: {
    fontSize: 12,
    color: '#EFEFEF',
    lineHeight: 16,
  },
});

export default SearchScreen;