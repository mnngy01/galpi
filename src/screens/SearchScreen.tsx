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
  Linking, // 원문 이동을 위한 Linking 유지
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// 상단 외부 데이터 파일에서 DUMMY_URLS 명확히 import 완료
import { DUMMY_URLS } from '../data/dummyData';

// 북마크 아이템의 타입 인터페이스 정의
interface BookmarkItem {
  id: string;
  url: string;
  title: string;
  thumbnail: string | null;
  summary: string;
  category: string;
  isFavorite: boolean;
  createdAt: string;
}

const SearchScreen = () => {
  const [query, setQuery] = useState(''); // 입력창의 실시간 값
  const [searchQuery, setSearchQuery] = useState(''); // 엔터를 눌러 확정된 검색어
  const [filteredResults, setFilteredResults] = useState<BookmarkItem[]>([]);

  // 검색 실행 함수 (키보드 엔터를 칠 때만 작동)
  const handleSearch = () => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredResults([]);
      return;
    }

    // 제목(title) 또는 내용(summary)에 검색어가 포함되었는지 필터링
    const filtered = (DUMMY_URLS as BookmarkItem[]).filter(
      item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.summary.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredResults(filtered);
  };

  // 1열 전용 가로형 카드 렌더링 함수 (자네의 UI 디자인 가이드 완전 반영)
  const renderCardItem: ListRenderItem<BookmarkItem> = ({ item }) => {
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
        {item.thumbnail ? (
          <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
        ) : (
          <View style={[styles.thumbnail, styles.emptyThumbnail]} />
        )}

        {/* 30% 불투명도의 검은색 배경 오버레이 레이어 */}
        <View style={styles.overlay}>
          <Text style={styles.cardTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.cardSummary} numberOfLines={2}>
            {item.summary}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  // Hook 렌더 에러 방지를 위한 조건부 컴포넌트 헬퍼 함수
  const renderContent = () => {
    if (!searchQuery) {
      return <Text style={styles.emptyText}>검색 화면</Text>;
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
        keyExtractor={item => item.id}
        numColumns={1} // 👈 1열 구조로 명확히 고정!
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* 상단 노치 영역 마진 확보 */}
      <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
        <View style={styles.header}>
          <Text style={styles.logoText}>GALPI</Text>
        </View>
      </SafeAreaView>

      {/* 검색 바 */}
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

      {/* 결과 콘텐츠 출력 영역 */}
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
  logoText: {
    fontSize: 24,
    fontWeight: '300',
    letterSpacing: 2,
    color: '#000',
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

  // 1열 전용 배치 스타일 리스트
  listContainer: {
    paddingHorizontal: 25, // 검색창 패딩(marginHorizontal: 25)과 좌우 정렬을 완벽히 매칭
    paddingTop: 12,
    paddingBottom: 100, // 하단 탭바에 카드가 잘리는 현상 방지 여백
  },

  // 1열 전용 카드 디자인 (가로폭 100%)
  card: {
    width: '100%',
    height: 110, // 세로로 나열될 때 가장 황금 배율인 컴팩트한 높이 지정
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#E0E0E0',
    marginBottom: 14, // 카드와 카드 사이의 수직 간격 조절
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
    justifyContent: 'flex-end', // 텍스트들을 카드의 하단/좌측에 안정감 있게 정렬
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // 30% 불투명도의 검은색 배경 오버레이 무드 처리
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.2)', // 텍스트 가독성 확보용 그림자
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
