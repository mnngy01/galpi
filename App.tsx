import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  DeviceEventEmitter,
} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { addBookmark } from './src/services/bookmarkApi';

const App = () => {
  const [sharedUrl, setSharedUrl] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener(
      'SharedUrl',
      (url: string) => {
        setSharedUrl(url);
        setModalVisible(true);
      },
    );
    return () => subscription.remove();
  }, []);

  const handleSave = async () => {
    if (!sharedUrl) return;
    setLoading(true);
    try {
      await addBookmark(sharedUrl);
      Alert.alert('저장 완료', '북마크가 저장되었습니다!');
      setModalVisible(false);
    } catch (e) {
      Alert.alert('오류', '저장에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <NavigationContainer>
      <AppNavigator />
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.title}>링크 저장</Text>
            <Text style={styles.url} numberOfLines={2}>
              {sharedUrl}
            </Text>
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={handleSave}
              disabled={loading}
            >
              <Text style={styles.saveBtnText}>
                {loading ? '저장 중...' : '저장하기'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    gap: 12,
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  url: { fontSize: 13, color: '#666' },
  saveBtn: {
    backgroundColor: '#4A90E2',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  cancelText: { textAlign: 'center', color: '#999', paddingVertical: 8 },
});

export default App;
