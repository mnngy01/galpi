import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// 1. 화면 파일 불러오기
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import RecommendScreen from '../screens/RecommendScreen';
import SearchScreen from '../screens/SearchScreen';
import FolderScreen from '../screens/FolderScreen';
import FolderListScreen from '../screens/FolderListScreen';
import SettingScreen from '../screens/SettingScreen';
import InterestScreen from '../screens/InterestScreen';
import AddUrlScreen from '../screens/AddUrlScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 하단 탭 바 세부 설정
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="홈"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgb(255, 249, 249)',
          height: 70,
          paddingBottom: 10,
        },
        tabBarActiveBackgroundColor: '#rgba(255, 211, 192, 0.41)',
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#666',

        // 💡 단일 이미지만 불러오도록 간소화된 tabBarIcon
        tabBarIcon: () => {
          let iconSource;

          // 실제 가지고 계신 에셋 폴더의 파일명으로 수정해 주세요!
          switch (route.name) {
            case '북마크 추천':
              iconSource = require('../assets/icon_recommend.png');
              break;
            case '검색':
              iconSource = require('../assets/icon_search.png');
              break;
            case '홈':
              iconSource = require('../assets/icon_home.png');
              break;
            case '폴더':
              iconSource = require('../assets/icon_folder.png');
              break;
            case '설정':
              iconSource = require('../assets/icon_setting.png');
              break;
            default:
              iconSource = require('../assets/icon_recommend.png');
          }

          return (
            <Image
              source={iconSource}
              style={{
                width: 24, // 필요에 따라 크기 조절
                height: 24,
                resizeMode: 'contain',
              }}
            />
          );
        },
      })}
    >
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
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Folder" component={FolderScreen} />
      <Stack.Screen name="BookmarkList" component={FolderListScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
