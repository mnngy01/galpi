import React from 'react';
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
import { DUMMY_URLS } from '../data/dummyData';

// 가로 화면 크기를 기준으로 카드 너비를 계산 (2열 배치를 위해)
const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 2; // (전체 너비 - 여백 합계) / 2

const HomeScreen = ({ navigation }: any) => {
  const renderBookmarkItem = ({ item }: { item: (typeof DUMMY_URLS)[0] }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => console.log(`${item.id} 클릭됨`)}
      >
        {item.thumbnail ? (
          // 썸네일 이미지가 존재할 때
          <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
        ) : (
          // 썸네일 이미지가 null일 때 회색 배경
          <View style={[styles.thumbnail, styles.emptyThumbnail]} />
        )}

        {/* 이미지 혹은 회색 배경 위에 얹어지는 반투명 필터 레이어 */}
        <View style={styles.overlay}>
          <Text style={styles.cardTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.cardSummary} numberOfLines={3}>
            {item.summary}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    // 💡 최상단을 SafeAreaView 대신 일반 View로 교체하여 화면 전체(맨 바닥까지)를 사용하네!
    <View style={styles.container}>
      {/* 💡 상단 로고 헤더 영역만 노치에 가려지지 않게 SafeAreaView로 감싸주었네. */}
      <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
        <View style={styles.header}>
          <Text style={styles.logoText}>GALPI</Text>
        </View>
      </SafeAreaView>

      {/* 최근 저장한 북마크 리스트 영역 */}
      <View style={styles.contentWrapper}>
        <Text style={styles.sectionTitle}>최근 저장한 북마크</Text>

        <FlatList
          data={DUMMY_URLS}
          renderItem={renderBookmarkItem}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>

      {/* 우측 하단 Floating Action Button (+) */}
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
  headerSafeArea: {
    backgroundColor: '#FFFFFF',
  },
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
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContainer: {
    paddingBottom: 100, // 하단 탭바와 + 버튼(FAB) 높이를 고려해 아래쪽에 충분한 공백을 줌
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
    marginTop: 10,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  card: {
    width: CARD_WIDTH,
    height: CARD_WIDTH - 20,
    borderRadius: 20, //라운딩
    overflow: 'hidden', // 라운딩 영역 바깥으로 컨텐츠가 깨져 나가는 것 방지
    backgroundColor: '#E0E0E0',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  emptyThumbnail: {
    backgroundColor: '#D1D1D6', // 썸네일 null일 때 깔리는 기본 회색톤
  },

  // 회색빛 네이비 반투명 오버레이 스타일
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(50, 65, 100, 0.45)', // 사진 특유의 반투명 무드 처리
    padding: 14,
    justifyContent: 'flex-start',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF', // 흰색 텍스트
    marginBottom: 4,
  },
  cardSummary: {
    fontSize: 12,
    color: '#FFFFFF', // 흰색 텍스트
    lineHeight: 16,
  },

  // + 버튼 스타일
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
  fabText: {
    fontSize: 35,
    color: '#FFF',
    fontWeight: '300',
    marginTop: -4,
  },
});

export default HomeScreen;
