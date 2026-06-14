import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Alert, Linking } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { addBookmark } from './src/services/bookmarkApi';

const App = () => {
  useEffect(() => {
    const extractUrl = (deepLink: string): string | null => {
      try {
        const urlObj = new URL(deepLink);
        const encodedUrl = urlObj.searchParams.get('url');
        return encodedUrl ? decodeURIComponent(encodedUrl) : null;
      } catch {
        return null;
      }
    };

    const handleUrl = async (url: string | null) => {
      if (!url) return;

      const sharedUrl = extractUrl(url);
      if (!sharedUrl) return;

      try {
        await addBookmark(sharedUrl);
        Alert.alert('저장 완료', '북마크가 저장되었습니다!');
      } catch (e) {
        Alert.alert('오류', '저장에 실패했습니다.');
      }
    };

    Linking.getInitialURL().then(url => {
      setTimeout(() => handleUrl(url), 300);
    });

    const sub = Linking.addEventListener('url', ({ url }) => handleUrl(url));

    return () => sub.remove();
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
