// src/screens/BookmarkListScreen.tsx
// 폴더 클릭하면 나오는 화면
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BOOKMARK_DATA } from '../data/dummyData';

// HomeScreen과 동일한 카드 너비 계산
const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 2;

interface BookmarkItem {
  bookmarkId: number;
  url: string;
  folderId: number;
  imageUrl: string;
  aiSummary: string;
  like: boolean;
  createdAt: Date;
}

const FolderListScreen = ({ route, navigation }: any) => {
  const { folderId, folderName } = route.params;

  // 해당 폴더에 속한 북마크들 필터링
  const folderBookmarks = BOOKMARK_DATA.filter(url => {
    if (folderName === '즐겨찾기') return url.like;
    return url.folderId === folderName;
  });

  const renderBookmarkItem = ({ item }: { item: BookmarkItem }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => console.log(`${item.url} 북마크 클릭`)}
      >
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.thumbnail} />
        ) : (
          <View style={[styles.thumbnail, styles.emptyThumbnail]} />
        )}

        <View style={styles.overlay}>
          <Text style={styles.cardTitle} numberOfLines={1}>
            {item.url}
          </Text>
          <Text style={styles.cardSummary} numberOfLines={3}>
            {item.aiSummary}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* 상단 헤더 영역 */}
      <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{folderName}</Text>
          <View style={styles.emptyView} />
        </View>
      </SafeAreaView>

      {/* 북마크 리스트 영역 */}
      <View style={styles.contentWrapper}>
        {folderBookmarks.length === 0 ? (
          <View style={styles.emptyContent}>
            <Text style={styles.emptyText}>아직 저장된 갈피가 없어요</Text>
          </View>
        ) : (
          <FlatList<BookmarkItem>
            data={folderBookmarks}
            renderItem={renderBookmarkItem}
            keyExtractor={item => item.bookmarkId.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerSafeArea: {
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 20,
  },
  backButton: {
    padding: 4,
    width: 40,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '300',
    letterSpacing: 2,
    color: '#000',
  },
  emptyView: {
    width: 40,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContainer: {
    paddingBottom: 100,
    paddingTop: 10,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_WIDTH - 20,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#E0E0E0',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  emptyThumbnail: {
    backgroundColor: '#D1D1D6',
  },
  // HomeScreen과 동일한 반투명 오버레이
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(50, 65, 100, 0.45)',
    padding: 14,
    justifyContent: 'flex-start',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  cardSummary: {
    fontSize: 12,
    color: '#FFFFFF',
    lineHeight: 16,
  },
  emptyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999999',
  },
});

export default FolderListScreen;
