import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Member = {
  id: number;
  name: string;
  memberId: string;
  memberPw: string;
  birth: string;
  phone: number;
  aiRecommendAlert: boolean;
  aiSummary: boolean;
  aiSave: boolean;
  imageUrl: string;
  createdAt: string;
};
// 더미데이터
const initialMember: Member = {
  id: 123,
  name: 'username',
  memberId: 'sujeongi@sungsin.ac.kr',
  memberPw: 'password123!',
  birth: '2000-01-01',
  phone: 1012345678,
  aiRecommendAlert: true,
  aiSummary: true,
  aiSave: false,
  imageUrl: '',
  createdAt: '2024-02-22T07:47:49.803Z',
};

const SettingScreen = ({ navigation }: any) => {
  const [member] = useState<Member>(initialMember);

  const handleEditProfile = () => {
    console.log('회원정보 수정 이동:', member.id);
  };

  const handleAiSetting = () => {
    console.log('AI기능 설정 이동:', {
      aiRecommendAlert: member.aiRecommendAlert,
      aiSummary: member.aiSummary,
      aiSave: member.aiSave,
    });
  };

  const handleLogout = () => {
    Alert.alert('로그아웃', '정말 로그아웃 하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '확인',
        onPress: () =>
          navigation.reset({ index: 0, routes: [{ name: 'Onboarding' }] }),
      },
    ]);
  };

  const handleWithdraw = () => {
    Alert.alert('회원탈퇴', '정말 회원탈퇴 하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      { text: '확인', style: 'destructive' },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileSection}>
          {member.imageUrl ? (
            <Image
              source={{ uri: member.imageUrl }}
              style={styles.profileImage}
            />
          ) : (
            <View style={styles.profileImagePlaceholder} />
          )}

          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{member.name}</Text>
            <Text style={styles.memberId}>{member.memberId}</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEditProfile}
              activeOpacity={0.7}
            >
              <Text style={styles.editButtonText}>회원정보 수정 &gt;</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.settingSection}>
          <Text style={styles.sectionLabel}>설정</Text>
          <TouchableOpacity onPress={handleAiSetting} activeOpacity={0.7}>
            <Text style={styles.settingTitle}>AI기능 설정</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <View style={styles.accountSection}>
          <TouchableOpacity onPress={handleLogout} activeOpacity={0.7}>
            <Text style={styles.accountAction}>로그아웃</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleWithdraw} activeOpacity={0.7}>
            <Text style={styles.accountAction}>회원탈퇴</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 56,
  },
  profileSection: {
    minHeight: 160,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 12,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 60,
    backgroundColor: '#D9D9D9',
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 60,
    backgroundColor: '#D9D9D9',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 24,
  },
  userName: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
    color: '#000000',
  },
  memberId: {
    alignSelf: 'flex-start',
    marginTop: 2,
    fontSize: 14,
    lineHeight: 20,
    color: '#8A8A8A',
    //textDecorationLine: 'underline',
  },
  editButton: {
    alignSelf: 'flex-start',
    marginTop: 13,
  },
  editButtonText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#7D7D7D',
  },
  divider: {
    height: 12,
    backgroundColor: '#F1F1F1',
  },
  settingSection: {
    height: 145,
    paddingHorizontal: 38,
    paddingTop: 34,
  },
  sectionLabel: {
    fontSize: 18,
    lineHeight: 24,
    color: '#555555',
  },
  settingTitle: {
    marginTop: 24,
    fontSize: 20,
    lineHeight: 32,
    fontWeight: '600',
    color: '#000000',
  },
  accountSection: {
    paddingHorizontal: 38,
    paddingTop: 42,
    gap: 30,
  },
  accountAction: {
    fontSize: 20,
    lineHeight: 32,
    fontWeight: '600',
    color: '#000000',
  },
});

export default SettingScreen;
