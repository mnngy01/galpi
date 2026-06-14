import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeModules, Alert } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { addBookmark } from './src/services/bookmarkApi';

const { ShareModule } = NativeModules;

const App = () => {
  useEffect(() => {
    const checkSharedUrl = async () => {
      try {
        if (!ShareModule || !ShareModule.getSharedUrl) {
          console.log('ShareModule 없음');
          return;
        }
        const url = await ShareModule.getSharedUrl();
        console.log('공유 URL:', url);
        if (url) {
          await addBookmark(url);
          Alert.alert('갈피 저장 완료', '북마크가 저장되었습니다.');
        }
      } catch (err) {
        console.error('공유 URL 처리 실패:', err);
      }
    };
    checkSharedUrl();
  }, []);
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;