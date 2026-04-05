import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Switch,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// 1. 더미 데이터 불러오기
import { DUMMY_MEMBER } from '../data/dummyData';

const SettingScreen = ({ navigation }: any) => {
  // 2. 더미 데이터를 초기 상태값으로 설정
  const [member, setMember] = useState(DUMMY_MEMBER);

  // 개별 필드 스위치 토글 함수
  const toggleSwitch = (field: 'aiRecommendAlert' | 'aiSummary' | 'aiSave') => {
    setMember((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
    console.log(`${field} 상태 변경:`, !member[field]);
  };

  // 로그아웃 처리
  const handleLogout = () => {
    Alert.alert("로그아웃", "정말 로그아웃 하시겠습니까?", [
      { text: "취소", style: "cancel" },
      { 
        text: "확인", 
        onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Onboarding' }] }) 
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* 상단 프로필 영역 */}
        <View style={styles.profileSection}>
          {/* 프로필 이미지 (imageUrl 활용 가능) */}
          <View style={styles.profileImagePlaceholder} />
          
          <View style={styles.profileTextContainer}>
            <View style={styles.usernameRow}>
              {/* member.name 활용 */}
              <Text style={styles.usernameText}>{member.name}</Text>
              <TouchableOpacity onPress={() => console.log('프로필 수정 페이지로 이동')}>
                <Text style={styles.editProfileLink}>프로필 수정 &gt;</Text>
              </TouchableOpacity>
            </View>
            {/* member.loginId 활용 */}
            <Text style={styles.emailText}>{member.loginId}</Text>
          </View>
        </View>

        {/* 메뉴 리스트 */}
        <View style={styles.menuList}>
          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => console.log('회원정보 수정 이동')}
          >
            <Text style={styles.menuItemText}>회원정보수정</Text>
          </TouchableOpacity>

          {/* AI 설정 섹션 - 스위치들 */}
          <View style={styles.switchGroup}>
            {/* AI 추천알림 (aiRecommendAlert) */}
            <View style={styles.switchItem}>
              <Text style={styles.switchLabel}>AI추천알림</Text>
              <Switch
                value={member.aiRecommendAlert}
                onValueChange={() => toggleSwitch('aiRecommendAlert')}
                trackColor={{ false: "#D1D1D1", true: "#FFB899" }}
                thumbColor="#FFFFFF"
              />
            </View>

            {/* AI 요약 (aiSummary) */}
            <View style={styles.switchItem}>
              <Text style={styles.switchLabel}>AI요약</Text>
              <Switch
                value={member.aiSummary}
                onValueChange={() => toggleSwitch('aiSummary')}
                trackColor={{ false: "#D1D1D1", true: "#FFB899" }}
                thumbColor="#FFFFFF"
              />
            </View>

            {/* AI 자동저장 (aiSave) */}
            <View style={styles.switchItem}>
              <Text style={styles.switchLabel}>AI자동저장</Text>
              <Switch
                value={member.aiSave}
                onValueChange={() => toggleSwitch('aiSave')}
                trackColor={{ false: "#D1D1D1", true: "#FFB899" }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>

        {/* 로그아웃 버튼 */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>로그아웃</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
  // 프로필 스타일
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 60,
  },
  profileImagePlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#E0E0E0',
    marginRight: 25,
  },
  profileTextContainer: {
    flex: 1,
  },
  usernameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  usernameText: {
    fontSize: 26,
    fontWeight: '500',
    color: '#000',
  },
  editProfileLink: {
    fontSize: 14,
    color: '#BDBDBD',
  },
  emailText: {
    fontSize: 14,
    color: '#BDBDBD',
  },
  // 메뉴 리스트 스타일
  menuList: {
    gap: 45,
  },
  menuItem: {
    paddingVertical: 5,
  },
  menuItemText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
  },
  // 스위치 그룹 스타일
  switchGroup: {
    gap: 35,
  },
  switchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
  },
  // 로그아웃 버튼 스타일
  logoutButton: {
    marginTop: 120,
    alignSelf: 'center',
  },
  logoutButtonText: {
    fontSize: 18,
    color: '#9E9E9E',
    fontWeight: '400',
  },
});

export default SettingScreen;