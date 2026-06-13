import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getSourceName } from '../utils/getSourceName';
import { fetchBookmarks, Bookmark } from '../services/galpiApi';

//import { BOOKMARK_DATA } from '../data/dummyData';

// [수정된 부분 1] 하트 이미지 임포트 (경로는 사용자님의 설명에 따름)
const HeartOutlineImage = require('../assets/like0.png'); // 테두리 버전
const HeartFilledImage = require('../assets/like1.png'); // 채워진 버전

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 2;

// [기존 코드 유지] 개별 카드의 상태를 관리하기 위한 컴포넌트
const BookmarkCard = ({ item }: { item: Bookmark }) => {
  // 데이터의 like 속성에 따라 초기 상태 설정
  const [isLiked, setIsLiked] = useState(item.like === true);

  const toggleLike = () => {
    setIsLiked(!isLiked);
    // TODO: 여기에 서버나 로컬 DB의 like 상태를 0 또는 1로 업데이트하는 로직을 추가하세요.
    console.log(
      `${item.id}번 북마크 하트 클릭됨. 현재 상태: ${
        !isLiked ? '1 (Like)' : '0 (Unlike)'
      }`,
    );
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => console.log(`${item.id} 클릭됨`)}
      activeOpacity={0.9} // 터치 시 너무 투명해지는 것 방지
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
        <Text style={styles.cardSummary} numberOfLines={3}>
          {item.aiSummary}
        </Text>
      </View>

      {/* [수정된 부분 2] 우측 하단 하트 이미지 버튼 */}
      <TouchableOpacity
        style={styles.heartButton}
        onPress={toggleLike}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }} // 터치 영역 확보
      >
        {/* [수정된 부분 3] <Text> 대신 <Image> 사용 */}
        <Image
          source={isLiked ? HeartFilledImage : HeartOutlineImage}
          style={styles.heartImage}
          resizeMode="contain" // 이미지 비율 유지
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

// [기존 HomeScreen 코드 유지]
const HomeScreen = ({ navigation }: any) => {
  // 연동
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    fetchBookmarks()
      .then(data => setBookmarks(data))
      .catch(err => console.error('북마크 불러오기 실패:', err));
  }, []);

  const renderBookmarkItem = ({ item }: { item: Bookmark }) => {
    return <BookmarkCard item={item} />;
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
        <View style={styles.header}>
          <Text style={styles.logoText}>GALPI</Text>
        </View>
      </SafeAreaView>

      <View style={styles.contentWrapper}>
        <Text style={styles.sectionTitle}>최근 저장한 북마크</Text>

        <FlatList
          data={bookmarks}
          renderItem={renderBookmarkItem}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddUrl')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
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
    marginTop: 20,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '300',
    letterSpacing: 2,
    color: '#000',
  },
  contentWrapper: { flex: 1, paddingHorizontal: 20 },
  listContainer: { paddingBottom: 100 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
    marginTop: 10,
  },
  row: { justifyContent: 'space-between', marginBottom: 15 },
  card: {
    width: CARD_WIDTH,
    height: CARD_WIDTH - 20,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#E0E0E0',
  },
  thumbnail: { width: '100%', height: '100%', position: 'absolute' },
  emptyThumbnail: { backgroundColor: '#D1D1D6' },
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
  cardSummary: { fontSize: 12, color: '#FFFFFF', lineHeight: 16 },

  // ---하트 버튼 및 이미지 스타일 ---
  heartButton: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    zIndex: 10,
    width: 20, // 이미지 버튼 전체 크기
    height: 22, // 이미지 버튼 전체 크기
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartImage: {
    width: '100%', // 버튼 안에 가득 차게
    height: '100%', // 버튼 안에 가득 차게
  },

  fab: {
    position: 'absolute',
    right: 25,
    bottom: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFB899',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabText: { fontSize: 35, color: '#FFF', fontWeight: '300', marginTop: -4 },
});

export default HomeScreen;
