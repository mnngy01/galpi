// screens/InterestSelect.tsx
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const INTERESTS = [
  { id: 'frontend', icon: '💻', label: '프론트엔드', folder: 'frontend' },
  { id: 'backend', icon: '⚙️', label: '백엔드', folder: 'backend' },
  { id: 'mobile', icon: '📱', label: '모바일 앱', folder: 'mobile' },
  { id: 'ai', icon: '🤖', label: 'AI / ML', folder: 'ai-ml' },
  { id: 'database', icon: '🗄️', label: '데이터베이스', folder: 'database' },
  { id: 'devops', icon: '☁️', label: '클라우드 / DevOps', folder: 'devops' },
  { id: 'design', icon: '🎨', label: 'UI / UX 디자인', folder: 'design' },
  { id: 'security', icon: '🔒', label: '보안', folder: 'security' },
  { id: 'data', icon: '📊', label: '데이터 분석', folder: 'data-analysis' },
  { id: 'game', icon: '🎮', label: '게임 개발', folder: 'game-dev' },
  { id: 'blockchain', icon: '🔗', label: '블록체인', folder: 'blockchain' },
  { id: 'docs', icon: '📝', label: '기술 문서', folder: 'docs' },
] as const;

type InterestId = (typeof INTERESTS)[number]['id'];

const InterestSelectScreen = ({ navigation }: any) => {
  const [selected, setSelected] = useState<Set<InterestId>>(new Set());

  const toggle = (id: InterestId) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleSubmit = async () => {
    const chosenFolders = INTERESTS.filter(item => selected.has(item.id)).map(
      item => item.folder,
    );

    try {
      // TODO: 파이썬 백엔드 연동 시 교체
      // await fetch('http://your-api/users/interests', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ folders: chosenFolders }),
      // });
      console.log('생성할 폴더:', chosenFolders);
      navigation.replace('MainHome');
    } catch (err) {
      Alert.alert('오류', '저장에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>GALPI</Text>
        <Text style={styles.headerSubtitle}>관심 분야를 선택해 주세요</Text>
        <Text style={styles.headerDesc}>
          선택한 항목으로 폴더가 자동 생성됩니다
        </Text>
      </View>

      {/* 관심사 그리드 */}
      <ScrollView contentContainerStyle={styles.grid}>
        {INTERESTS.map(item => {
          const isSelected = selected.has(item.id);
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.chip, isSelected && styles.chipSelected]}
              onPress={() => toggle(item.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.chipIcon}>{item.icon}</Text>
              <Text
                style={[
                  styles.chipLabel,
                  isSelected && styles.chipLabelSelected,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* 하단 버튼 */}
      <View style={styles.footer}>
        <Text style={styles.count}>
          {selected.size > 0
            ? `${selected.size}개 선택됨`
            : '최소 1개 이상 선택해 주세요'}
        </Text>
        <TouchableOpacity
          style={[
            styles.submitButton,
            selected.size === 0 && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={selected.size === 0}
        >
          <Text style={styles.submitButtonText}>시작하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // 헤더
  headerContainer: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 24,
    paddingHorizontal: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '300',
    letterSpacing: 2,
    color: '#000',
    marginBottom: 16,
  },
  headerSubtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginBottom: 6,
  },
  headerDesc: {
    fontSize: 13,
    color: '#A0A0A0',
  },

  // 그리드
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 10,
    justifyContent: 'center',
  },
  chip: {
    width: '30%',
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: '#FFD3C0',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
  },
  chipSelected: {
    backgroundColor: '#FFD3C0',
    borderColor: '#FFD3C0',
  },
  chipIcon: {
    fontSize: 24,
  },
  chipLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
    textAlign: 'center',
  },
  chipLabelSelected: {
    color: '#333',
    fontWeight: '600',
  },

  // 하단
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 40,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  count: {
    fontSize: 13,
    color: '#A0A0A0',
  },
  submitButton: {
    backgroundColor: '#FFD3C0',
    width: 150,
    height: 55,
    borderRadius: 27.5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  submitButtonDisabled: {
    opacity: 0.4,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
});

export default InterestSelectScreen;
