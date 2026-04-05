import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';

const SignupScreen = ({ navigation }: any) => {
  // 데이터 구조에 맞춘 상태 관리
  const [formData, setFormData] = useState({
    name: '',
    loginId: '',
    loginPw: '',
    pwConfirm: '', // 비밀번호 확인용 (DB 저장X)
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    phone: '',
    aiSave: false, // 개인정보동의 체크박스 대용
  });

  // 입력값 변경 함수
  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = () => {
    // 실제 저장 시 데이터 가공 예시
    const signupData = {
      name: formData.name,
      loginId: formData.loginId,
      loginPw: formData.loginPw,
      birth: `${formData.birthYear}-${formData.birthMonth}-${formData.birthDay}`, // date 타입으로 변환 필요
      phone: parseInt(formData.phone), // int 타입
      aiSave: formData.aiSave,
      aiRecommendAlert: true, // 기본값 설정 예시
      aiSummary: true,
      imageUrl: '', // 프로필 이미지 초기값
      createdAt: new Date().toISOString(), // datetime
    };

    console.log('회원가입 데이터:', signupData);
    // TODO: 서버 통신 로직 추가
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerTitle}>GALPI</Text>

        {/* 이름 */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>이름</Text>
          <TextInput
            style={[styles.input, styles.shortInput]}
            value={formData.name}
            onChangeText={(value) => handleChange('name', value)}
          />
        </View>

        {/* 아이디 */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>아이디</Text>
          <View style={styles.row}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={formData.loginId}
              onChangeText={(value) => handleChange('loginId', value)}
            />
            <TouchableOpacity style={styles.checkButton}>
              <Text style={styles.checkButtonText}>중복확인</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 비밀번호 */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>비밀번호</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={formData.loginPw}
            onChangeText={(value) => handleChange('loginPw', value)}
          />
        </View>

        {/* 비밀번호 확인 */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>비밀번호 확인</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={formData.pwConfirm}
            onChangeText={(value) => handleChange('pwConfirm', value)}
          />
        </View>

        {/* 생년월일 */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>생년월일</Text>
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.birthInput]}
              placeholder="YYYY"
              keyboardType="number-pad"
              onChangeText={(value) => handleChange('birthYear', value)}
            />
            <TextInput
              style={[styles.input, styles.birthInput]}
              placeholder="MM"
              keyboardType="number-pad"
              onChangeText={(value) => handleChange('birthMonth', value)}
            />
            <TextInput
              style={[styles.input, styles.birthInput]}
              placeholder="DD"
              keyboardType="number-pad"
              onChangeText={(value) => handleChange('birthDay', value)}
            />
          </View>
        </View>

        {/* 전화번호 */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>전화번호</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={formData.phone}
            onChangeText={(value) => handleChange('phone', value)}
          />
        </View>

        {/* 개인정보동의 */}
        <View style={styles.agreementBox}>
          <View style={styles.rowBetween}>
            <Text style={styles.agreementTitle}>개인정보동의 (필수)</Text>
            <TouchableOpacity 
              style={[styles.checkbox, formData.aiSave && styles.checkboxActive]}
              onPress={() => setFormData({ ...formData, aiSave: !formData.aiSave })}
            />
          </View>
          <Text style={styles.agreementText}>
            블라블라블라안녕하세요저희는오또잉입니다
          </Text>
        </View>

        {/* 가입하기 버튼 */}
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>가입하기</Text>
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
  scrollContainer: {
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '300',
    textAlign: 'center',
    marginBottom: 40,
    letterSpacing: 2,
    color: '#000',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#FFD3C0',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 14,
  },
  shortInput: {
    width: '45%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkButton: {
    backgroundColor: '#FFD3C0',
    paddingHorizontal: 15,
    height: 45,
    borderRadius: 20,
    justifyContent: 'center',
  },
  checkButtonText: {
    fontSize: 12,
    color: '#333',
  },
  birthInput: {
    flex: 1,
    textAlign: 'center',
  },
  agreementBox: {
    borderWidth: 1,
    borderColor: '#FFD3C0',
    borderRadius: 15,
    padding: 15,
    marginTop: 20,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  agreementTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFD3C0',
  },
  checkboxActive: {
    backgroundColor: '#FFD3C0',
  },
  agreementText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  signupButton: {
    backgroundColor: '#FFD3C0',
    height: 55,
    borderRadius: 27.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  signupButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});

export default SignupScreen;