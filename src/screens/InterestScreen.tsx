import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '../store/userStore';

const INTERESTS = [
  { id: 'architecture', icon: '🏛️', label: '건축' },
  { id: 'outdoor', icon: '⛺', label: '아웃도어' },
  { id: 'workspace', icon: '💼', label: '워크스페이스' },
  { id: 'drink', icon: '🍹', label: '술' },
  { id: 'pet', icon: '🐶', label: '반려' },
  { id: 'tea', icon: '🍵', label: '차' },
  { id: 'kids', icon: '🧒', label: '아이와 함께' },
  { id: 'travel', icon: '✈️', label: '해외 여행' },
] as const;

type InterestId = (typeof INTERESTS)[number]['id'];

const InterestScreen = ({ navigation }: any) => {
  const [selected, setSelected] = useState<Set<InterestId>>(new Set());
  const setSelectedFolders = useUserStore(state => state.setSelectedFolders);
  void setSelectedFolders;

  const toggle = (id: InterestId) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleSubmit = () => {
    navigation.replace('MainHome');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>
            갈피를 꽂을 카테고리를{'\n'}선택해 주세요
          </Text>
          <Text style={styles.description}>
            선택한 항목은 폴더로 생성될 예정이에요
          </Text>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.chipContainer}
          showsVerticalScrollIndicator={false}
        >
          {INTERESTS.map(item => {
            const isSelected = selected.has(item.id);

            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.chip, isSelected && styles.chipSelected]}
                onPress={() => toggle(item.id)}
                activeOpacity={0.75}
              >
                <Text style={styles.chipText}>
                  {item.icon} {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          선택 항목은 나중에 다시 수정할 수 있어요.
        </Text>
        <TouchableOpacity
          style={[
            styles.submitButton,
            selected.size === 0 && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={selected.size === 0}
          activeOpacity={0.85}
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
  content: {
    flex: 1,
    paddingHorizontal: 34,
  },
  header: {
    paddingTop: 58,
    marginBottom: 62,
  },
  title: {
    fontSize: 22,
    lineHeight: 31,
    fontWeight: '700',
    color: '#111111',
  },
  description: {
    marginTop: 14,
    fontSize: 14,
    lineHeight: 20,
    color: '#C5C5C5',
  },
  scroll: {
    flex: 1,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    gap: 12,
    paddingBottom: 24,
  },
  chip: {
    minHeight: 34,
    paddingHorizontal: 15,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#ECECEC',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    //shadowColor: '#000',
    //shadowOffset: { width: 0, height: 1 },
    //shadowOpacity: 0.08,
    //shadowRadius: 3,
    //elevation: 2,
  },
  chipSelected: {
    backgroundColor: '#FFC3AD',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#5F5F5F',
  },
  footer: {
    paddingHorizontal: 66,
    paddingBottom: 42,
    alignItems: 'center',
  },
  footerText: {
    marginBottom: 24,
    fontSize: 14,
    lineHeight: 20,
    color: '#C5C5C5',
    textAlign: 'center',
  },
  submitButton: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFC3AD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.45,
  },
  submitButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111111',
  },
});

export default InterestScreen;
