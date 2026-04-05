import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';

import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 하단 탭 바 컴포넌트
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFD3C0', // 이미지의 연한 주황색 배경
          height: 70,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#666',
      }}
    >
      <Tab.Screen name="북마크 추천" component={HomeScreen} />
      <Tab.Screen name="검색" component={HomeScreen} />
      <Tab.Screen 
        name="홈" 
        component={HomeScreen} 
        options={{
          tabBarStyle: { backgroundColor: '#FFB899', height: 70, paddingBottom: 10 } // 홈 탭만 더 진한 색일 경우
        }}
      />
      <Tab.Screen name="폴더" component={HomeScreen} />
      <Tab.Screen name="설정" component={HomeScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      {/* 로그인 성공 시 이동할 메인 탭 화면 */}
      <Stack.Screen name="MainHome" component={MainTabNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;