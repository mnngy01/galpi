// src/screens/AddUrlScreen.tsx
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddUrlScreen = ({ navigation }: any) => {
  const [url, setUrl] = useState('');

  const handleSave = () => {
    console.log('저장된 URL:', url);
    // 여기에 나중에 데이터 저장 로직을 넣을 예정입니다.
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>닫기</Text>
        </TouchableOpacity>
        <Text style={styles.title}>URL 추가</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveButton}>저장</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>웹사이트 주소 (URL)</Text>
        <TextInput
          style={styles.input}
          placeholder="https://example.com"
          value={url}
          onChangeText={setUrl}
          autoFocus
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  backButton: { color: '#666', fontSize: 16 },
  saveButton: { color: '#FFB899', fontSize: 16, fontWeight: 'bold' },
  inputContainer: { padding: 20 },
  label: { fontSize: 14, color: '#666', marginBottom: 10 },
  input: {
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#FFB899',
    fontSize: 16,
  },
});

export default AddUrlScreen;