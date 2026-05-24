import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';

type SignupFormData = {
  name: string;
  loginId: string;
  loginPw: string;
  pwConfirm: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  phone: string;
  privacyAgreed: boolean;
};

const SignupScreen = ({ navigation }: any) => {
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    loginId: '',
    loginPw: '',
    pwConfirm: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    phone: '',
    privacyAgreed: false,
  });
  const [isLoginIdChecked, setIsLoginIdChecked] = useState(false);
  const [isPasswordChecked, setIsPasswordChecked] = useState(false);

  const handleChange = (name: keyof SignupFormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'loginId') {
      setIsLoginIdChecked(false);
    }

    if (name === 'loginPw' || name === 'pwConfirm') {
      setIsPasswordChecked(false);
    }
  };

  const handleCheckLoginId = () => {
    const loginId = formData.loginId.trim();

    if (!loginId) {
      Alert.alert('아이디 확인', '아이디를 입력해 주세요.');
      return;
    }

    if (loginId.length < 4) {
      Alert.alert('아이디 확인', '아이디는 4자 이상 입력해 주세요.');
      return;
    }

    setIsLoginIdChecked(true);
    Alert.alert('아이디 확인', '사용 가능한 아이디입니다.');
  };

  const handleCheckPassword = () => {
    if (!formData.loginPw || !formData.pwConfirm) {
      Alert.alert('비밀번호 확인', '비밀번호와 확인 값을 모두 입력해 주세요.');
      return;
    }

    if (formData.loginPw.length < 8) {
      Alert.alert('비밀번호 확인', '비밀번호는 8자 이상 입력해 주세요.');
      return;
    }

    if (formData.loginPw !== formData.pwConfirm) {
      Alert.alert('비밀번호 확인', '비밀번호가 일치하지 않습니다.');
      return;
    }

    setIsPasswordChecked(true);
    Alert.alert('비밀번호 확인', '비밀번호가 일치합니다.');
  };

  const handleSignup = () => {
    const birthYear = formData.birthYear.trim();
    const birthMonth = formData.birthMonth.trim().padStart(2, '0');
    const birthDay = formData.birthDay.trim().padStart(2, '0');

    if (
      !formData.name.trim() ||
      !formData.loginId.trim() ||
      !formData.loginPw ||
      !birthYear ||
      !birthMonth ||
      !birthDay ||
      !formData.phone.trim()
    ) {
      Alert.alert('입력 확인', '모든 필수 정보를 입력해 주세요.');
      return;
    }

    if (!isLoginIdChecked) {
      Alert.alert('아이디 확인', '아이디 중복 확인을 진행해 주세요.');
      return;
    }

    if (!isPasswordChecked) {
      Alert.alert('비밀번호 확인', '비밀번호 확인을 진행해 주세요.');
      return;
    }

    if (!formData.privacyAgreed) {
      Alert.alert('약관 동의', '개인정보 수집 및 이용에 동의해 주세요.');
      return;
    }

    const signupData = {
      name: formData.name.trim(),
      loginId: formData.loginId.trim(),
      loginPw: formData.loginPw,
      birth: `${birthYear}-${birthMonth}-${birthDay}`,
      phone: formData.phone.trim(),
    };

    console.log('회원가입 요청 데이터:', signupData);
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logo_pink_2.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>이름</Text>
          <TextInput
            style={[styles.input, styles.shortInput]}
            value={formData.name}
            onChangeText={value => handleChange('name', value)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>아이디</Text>
          <View style={styles.row}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={formData.loginId}
              onChangeText={value => handleChange('loginId', value)}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={[
                styles.checkButton,
                isLoginIdChecked && styles.checkButtonConfirmed,
              ]}
              onPress={handleCheckLoginId}
            >
              <Text style={styles.checkButtonText}>{'중복 확인'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>비밀번호</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={formData.loginPw}
            onChangeText={value => handleChange('loginPw', value)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>비밀번호 확인</Text>
          <View style={styles.row}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              secureTextEntry
              value={formData.pwConfirm}
              onChangeText={value => handleChange('pwConfirm', value)}
            />
            <TouchableOpacity
              style={[
                styles.checkButton,
                isPasswordChecked && styles.checkButtonConfirmed,
              ]}
              onPress={handleCheckPassword}
            >
              <Text style={styles.checkButtonText}>
                {isPasswordChecked ? '확인 완료' : '확인'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>생년월일</Text>
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.birthInput]}
              placeholder="YYYY"
              keyboardType="number-pad"
              maxLength={4}
              value={formData.birthYear}
              onChangeText={value => handleChange('birthYear', value)}
            />
            <TextInput
              style={[styles.input, styles.birthInput]}
              placeholder="MM"
              keyboardType="number-pad"
              maxLength={2}
              value={formData.birthMonth}
              onChangeText={value => handleChange('birthMonth', value)}
            />
            <TextInput
              style={[styles.input, styles.birthInput]}
              placeholder="DD"
              keyboardType="number-pad"
              maxLength={2}
              value={formData.birthDay}
              onChangeText={value => handleChange('birthDay', value)}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>전화번호</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={formData.phone}
            onChangeText={value => handleChange('phone', value)}
          />
        </View>

        <View style={styles.agreementBox}>
          <View style={styles.rowBetween}>
            <Text style={styles.agreementTitle}>
              개인정보 수집 및 이용 동의 (필수)
            </Text>
            <TouchableOpacity
              style={[
                styles.checkbox,
                formData.privacyAgreed && styles.checkboxActive,
              ]}
              onPress={() =>
                setFormData(prev => ({
                  ...prev,
                  privacyAgreed: !prev.privacyAgreed,
                }))
              }
            />
          </View>
          <Text style={styles.agreementText}>
            회원가입을 위해 이름, 아이디, 비밀번호, 생년월일, 전화번호를
            수집합니다.
          </Text>
        </View>

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
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 100,
    height: 60,
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
    height: 38,
    borderRadius: 20,
    justifyContent: 'center',
  },
  checkButtonConfirmed: {
    backgroundColor: '#f0f0f0',
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
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    paddingRight: 12,
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
