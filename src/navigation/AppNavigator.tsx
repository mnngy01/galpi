import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// 1. 새로 만든 모든 화면 파일을 불러옵니다 (경로와 파일명 확인 필수!)
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import RecommendScreen from '../screens/RecommendScreen';
import SearchScreen from '../screens/SearchScreen';
import FolderScreen from '../screens/FolderScreen';
import SettingScreen from '../screens/SettingScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 하단 탭 바 세부 설정
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="홈"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFD3C0',
          height: 70,
          paddingBottom: 10,
        },
        tabBarActiveBackgroundColor: '#FFB899',
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#666',
      }}
    >
      {/* [중요] 각 탭마다 component가 다른 파일로 연결되어 있어야 합니다! */}
      <Tab.Screen name="북마크 추천" component={RecommendScreen} />
      <Tab.Screen name="검색" component={SearchScreen} />
      <Tab.Screen name="홈" component={HomeScreen} />
      <Tab.Screen name="폴더" component={FolderScreen} />
      <Tab.Screen name="설정" component={SettingScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="InterestSelect" component={InterestScreen} />
      <Stack.Screen name="MainHome" component={MainTabNavigator} />
      <Stack.Screen name="AddUrl" component={AddUrlScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
