import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // 1. 이거 가져오기
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    // 2. 반드시 NavigationContainer로 AppNavigator를 감싸야 합니다!
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
