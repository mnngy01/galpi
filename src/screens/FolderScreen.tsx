// src/screens/FolderScreen.tsx
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  ListRenderItem,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DUMMY_CATEGORIES, DUMMY_URLS } from '../data/dummyData';

// HomeScreen 디자인 피드와 2열 그리드 균형을 완벽히 맞추기 위한 너비 계산
const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // (전체 가로폭 - 양옆 및 중앙 여백) / 2

// API 스펙 규칙에 맞춘 카테고리 아이템 인터페이스 정의
interface CategoryItem {
  id: number;
  name: string;
  higherFolderId: number | null;
  createdAt: string;
}

const FolderScreen = ({ navigation }: any) => {
  // FlatList 전용 렌더링 함수 격리 선언 (TypeScript 오버로드 원천 차단)
  const renderFolderItem: ListRenderItem<CategoryItem> = ({ item }) => {
    // 1. 해당 카테고리 이름과 일치하는 북마크 링크들 필터링
    const categoryUrls = DUMMY_URLS.filter(url => {
      if (item.name === '즐겨찾기') return url.isFavorite;
      return url.category === item.name;
    });

    // 2. 가장 최근에 저장된 링크 딱 '하나'의 객체에서 썸네일 경로 확보
    const latestBookmark = categoryUrls[categoryUrls.length - 1];
    const latestThumbnail = latestBookmark?.thumbnail;

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('BookmarkList', {
            folderId: item.id,
            folderName: item.name,
          })
        }
      >
        {latestThumbnail ? (
          // 가장 최근 저장된 링크의 썸네일 이미지가 존재할 때
          <Image source={{ uri: latestThumbnail }} style={styles.thumbnail} />
        ) : (
          // 카테고리에 글이 없거나 이미지 링크가 null일 때 깔리는 기본 회색 무지 배경
          <View style={[styles.thumbnail, styles.emptyThumbnail]} />
        )}

        {/* 버레이 레이어 */}
        <View style={styles.overlay}>
          <Text style={styles.cardTitle} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.cardCount}>{categoryUrls.length}개의 갈피</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* 상단 노치 영역만 안전 마진을 주어 하단 주황색 탭바 밑이 들뜨는 현상 방지 */}
      <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
        <View style={styles.header}>
          <Text style={styles.logoText}>GALPI</Text>
        </View>
      </SafeAreaView>

      {/* API 명세 기반의 DUMMY_CATEGORIES를 그대로 화면에 뿌려주는 영역 */}
      <FlatList
        data={DUMMY_CATEGORIES}
        renderItem={renderFolderItem}
        keyExtractor={item => item.id.toString()} // 숫자형 ID를 문자열 키로 안전하게 변환
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 24,
    fontWeight: '300',
    letterSpacing: 2,
    color: '#000',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 100, // 하단 탭바 레이어에 가려져서 리스트가 안 잘리도록 패딩
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: CARD_WIDTH - 2,
    height: CARD_WIDTH - 2, // HomeScreen 디자인 그리드와 완벽 매칭 비율
    borderRadius: 18,
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
  overlay: {
    flex: 1,
    padding: 14,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // 30% 불투명도의 검은색 배경
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.2)', // 밝은 썸네일 위에서도 제목이 선명하게 보이도록 그림자 처리
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  cardCount: {
    fontSize: 12,
    color: '#EFEFEF',
    fontWeight: '500',
  },
});

export default FolderScreen;
