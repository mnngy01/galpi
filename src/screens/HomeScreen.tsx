// src/screens/HomeScreen.tsx
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logoText}>MARKON</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.emptyText}>아직 아무것도 저장하지 않았어요</Text>
      </View>

      {/* 오른쪽 하단 + 버튼 */}
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate('AddUrl')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { height: 60, justifyContent: 'center', alignItems: 'center', marginTop: 20 },
  logoText: { fontSize: 24, fontWeight: '300', letterSpacing: 2, color: '#000' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, color: '#666' },
  
  // + 버튼 스타일 (Floating Action Button)
  fab: {
    position: 'absolute',
    right: 25,
    bottom: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFB899', // 하단바 활성화 색상과 통일
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // 안드로이드 그림자
    shadowColor: '#000', // iOS 그림자
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabText: {
    fontSize: 35,
    color: '#FFF',
    fontWeight: '300',
    marginTop: -4, // 시각적 중앙 맞춤
  },
});

export default HomeScreen;