import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const topCards = [
  {
    id: '1',
    title: 'titletitiletitle',
    summary: '파리 주요 관광지를 3일 동안 효율적으로 여행하는 일정 소개',
    source: '네이버 블로그',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '2',
    title: 'titletitiletitle',
    summary: '오약요약요약요약아정도로기는 휠니님을거같은데세줄넘겠나요약...',
    source: 'tistory',
    image:
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '3',
    title: 'titletitiletitle',
    summary: '요즘 자주 보는 링크와 비슷한 추천 콘텐츠',
    source: '브런치',
    image:
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80',
  },
];

const placeholderCards = ['1', '2'];

const SmallCard = ({ item }: { item: (typeof topCards)[number] }) => (
  <ImageBackground
    source={{ uri: item.image }}
    style={styles.smallCard}
    imageStyle={styles.smallCardImage}
  >
    <View style={styles.cardDim}>
      <Text style={styles.cardTitle} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.cardSummary} numberOfLines={3}>
        {item.summary}
      </Text>
      <Text style={styles.cardSource}>{item.source}</Text>
    </View>
  </ImageBackground>
);

const EmptyCard = () => <View style={styles.emptyCard} />;

const RecommendScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.bookmark} />
          <Text style={styles.heroTitle}>
            00님, 요즘 이런 거 많이 보고 있네요
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            {topCards.map(item => (
              <SmallCard key={item.id} item={item} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.pinIcon}>⌖</Text>
          <Text style={styles.sectionTitle}>
            이번 주말 날씨 좋은데 여기 어때요?
          </Text>
          <View style={styles.cardRow}>
            {placeholderCards.map(id => (
              <EmptyCard key={id} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>잊고 있던 거 아니에요?</Text>
          <View style={styles.cardRow}>
            {placeholderCards.map(id => (
              <EmptyCard key={id} />
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
  hero: {
    paddingTop: 22,
    paddingBottom: 28,
    backgroundColor: '#FFE4DA',
  },
  bookmark: {
    width: 22,
    height: 38,
    marginLeft: 28,
    marginBottom: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F3D7CC',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
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
    paddingHorizontal: 32,
    gap: 24,
  },
  smallCard: {
    width: 180,
    height: 150,
    overflow: 'hidden',
    borderRadius: 18,
    backgroundColor: '#D9D9D9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.24,
    shadowRadius: 12,
    elevation: 8,
  },
  smallCardImage: {
    borderRadius: 18,
  },
  cardDim: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.38)',
  },
  cardTitle: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  cardSummary: {
    marginTop: 4,
    fontSize: 13,
    lineHeight: 18,
    color: '#FFFFFF',
  },
  cardSource: {
    marginTop: 'auto',
    fontSize: 12,
    color: '#FFFFFF',
  },
  section: {
    paddingTop: 42,
    paddingHorizontal: 24,
  },
  pinIcon: {
    marginBottom: 6,
    fontSize: 28,
    color: '#CFCFD6',
  },
  sectionTitle: {
    marginBottom: 20,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '800',
    color: '#000000',
  },
  cardRow: {
    flexDirection: 'row',
    gap: 22,
  },
  emptyCard: {
    width: 155,
    height: 190,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 18,
    elevation: 5,
  },
});

export default RecommendScreen;
