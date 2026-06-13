import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getSourceName } from '../utils/getSourceName';
import { BOOKMARK_DATA } from '../data/dummyData';

// const BASE_URL = 'http://10.0.2.2:8000';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface Bookmark {
  bookmarkId: number;
  url: string;
  folderId: number;
  imageUrl: string | null;
  aiSummary: string | null;
  like: boolean;
  createdAt: string;
}

// ─── 추천 카드 ───
const RecommendCard = ({ item }: { item: Bookmark }) => (
  <ImageBackground
    source={item.imageUrl ? { uri: item.imageUrl } : undefined}
    style={styles.recommendCard}
    imageStyle={styles.recommendCardImage}
  >
    <View style={styles.recommendCardDim}>
      <Text style={styles.recommendCardUrl} numberOfLines={1}>
        {getSourceName(item.url)}
      </Text>
      {item.aiSummary && (
        <Text style={styles.recommendCardSummary} numberOfLines={4}>
          {item.aiSummary}
        </Text>
      )}
    </View>
  </ImageBackground>
);

const HeartOutlineImage = require('../assets/like0.png'); // 테두리 버전
const HeartFilledImage = require('../assets/like1.png'); // 채워진 버전

// ─── 최근 저장 카드 ───
const RecentCard = ({ item }: { item: Bookmark }) => {
  const [isLiked, setIsLiked] = useState(item.like === true);

  const toggleLike = () => {
    setIsLiked(!isLiked);
    console.log(
      `${item.bookmarkId}번 북마크 하트 클릭됨. 현재 상태: ${
        !isLiked ? '1 (Like)' : '0 (Unlike)'
      }`,
    );
  };

  return (
    <TouchableOpacity
      style={styles.recentCard}
      onPress={() => console.log(`${item.bookmarkId} 클릭됨`)}
      activeOpacity={0.9}
    >
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.recentThumbnail} />
      ) : (
        <View style={[styles.recentThumbnail, styles.emptyThumbnail]} />
      )}

      <View style={styles.recentOverlay}>
        <Text style={styles.recentCardTitle} numberOfLines={1}>
          {getSourceName(item.url)}
        </Text>
        <Text style={styles.recentCardSummary} numberOfLines={3}>
          {item.aiSummary}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.heartButton}
        onPress={toggleLike}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      >
        <Image
          source={isLiked ? HeartFilledImage : HeartOutlineImage}
          style={styles.heartImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

// ─── 메인 스크린 ───
const RecommendScreen = () => {
  // ── 더미 데이터: 추천 3개, 최근 저장 전체 ──
  const recommendList = BOOKMARK_DATA.slice(0, 3);
  const recentList = BOOKMARK_DATA;

  // ── API 연결 시 아래 주석 해제 ──
  // const [recommendList, setRecommendList] = useState<Bookmark[]>([]);
  // const [recentList, setRecentList] = useState<Bookmark[]>([]);
  // const [loading, setLoading] = useState(true);
  //
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const [recommendRes, recentRes] = await Promise.all([
  //         fetch(`${BASE_URL}/bookmarks/recommend`),
  //         fetch(`${BASE_URL}/bookmarks/remind`),
  //       ]);
  //       const recommendJson = await recommendRes.json();
  //       const recentJson = await recentRes.json();
  //       setRecommendList(recommendJson.data ?? []);
  //       setRecentList(recentJson.data ?? []);
  //     } catch (e) {
  //       console.error('API 요청 실패:', e);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const icon = require('../assets/icon_galpi.png');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ── 추천 섹션 ── */}
        <View style={styles.hero}>
          <Image
            source={icon}
            style={styles.bookmarkShape}
            resizeMode="contain"
          />
          <Text style={styles.heroTitle}>오늘의 갈피</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            contentContainerStyle={styles.horizontalList}
          >
            {recommendList.map(item => (
              <RecommendCard key={item.bookmarkId} item={item} />
            ))}
          </ScrollView>
        </View>

        {/* ── 최근 저장 섹션 ── */}
        <View style={styles.section}>
          <Text style={styles.pinIcon}>⌖</Text>
          <Text style={styles.sectionTitle}>최근에 저장했어요.</Text>
          <View style={styles.recentList}>
            {recentList.map(item => (
              <RecentCard key={item.bookmarkId} item={item} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // ── 추천 섹션 ──
  hero: {
    paddingTop: 22,
    paddingBottom: 28,
    backgroundColor: '#FFE4DA',
  },
  bookmarkShape: {
    width: 22,
    height: 38,
    marginLeft: 28,
    marginBottom: 22,
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 5,
    shadowRadius: 10,
    elevation: 10,
  },
  heroTitle: {
    marginHorizontal: 28,
    marginBottom: 20,
    fontSize: 22,
    lineHeight: 29,
    fontWeight: '800',
    color: '#000000',
  },
  horizontalList: {
    paddingHorizontal: 24,
    gap: 16,
  },
  recommendCard: {
    width: SCREEN_WIDTH - 48,
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#D9D9D9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  recommendCardImage: {
    borderRadius: 20,
  },
  recommendCardDim: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.38)',
    justifyContent: 'flex-end',
  },
  recommendCardUrl: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.65)',
    marginBottom: 6,
  },
  recommendCardSummary: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // ── 최근 저장 섹션 ──
  section: {
    paddingTop: 42,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  pinIcon: {
    marginBottom: 6,
    fontSize: 28,
    color: '#CFCFD6',
  },
  sectionTitle: {
    marginBottom: 15,
    fontSize: 18,
    lineHeight: 32,
    fontWeight: '800',
    color: '#2e2e2e',
  },
  recentList: {
    gap: 16,
  },
  // ── 최근 저장 카드 (기존 recentCardBody 제거, overlay/heartImage 추가) ──
  recentCard: {
    height: 160, // 원하는 높이로 조절
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#D1D1D6',
  },
  recentThumbnail: {
    width: '100%',
    height: '100%',
    position: 'absolute', // HomeScreen과 동일: 카드 전체를 채움
  },
  emptyThumbnail: {
    backgroundColor: '#D1D1D6',
  },
  recentOverlay: {
    flex: 1,
    backgroundColor: 'rgba(50, 65, 100, 0.45)', // HomeScreen과 동일한 오버레이 색
    padding: 14,
    justifyContent: 'flex-start',
  },
  recentCardTitle: {
    fontSize: 11,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  recentCardSummary: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 20,
  },
  heartButton: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    zIndex: 10,
    width: 20,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartImage: {
    width: '100%',
    height: '100%',
  },
});

export default RecommendScreen;
