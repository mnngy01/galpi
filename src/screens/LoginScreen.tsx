// screens/LoginScreen.tsx
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = ({ navigation }: any) => {
  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');

  const handleLogin = async () => {
    if (!loginId || !loginPw) {
      Alert.alert('입력 오류', 'ID와 PW를 입력해 주세요.');
      return;
    }

    try {
      console.log('로그인 시도:', { loginId, loginPw });

      // TODO: 실제 파이썬 백엔드 API로 교체
      // const response = await fetch('http://your-api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ id: loginId, password: loginPw }),
      // });
      // const result = await response.json();

      const result = await fakeLogin(loginId, loginPw); // 임시

      if (result.isFirstLogin) {
        navigation.replace('InterestSelect'); // 첫 로그인 → 관심사 선택
      } else {
        navigation.replace('MainHome'); // 기존 유저 → 메인
      }
    } catch (err) {
      Alert.alert('로그인 실패', 'ID 또는 PW를 확인해 주세요.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            {/* 상단 타이틀 */}
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>GALPI</Text>
            </View>

            {/* 입력 영역 */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="ID"
                placeholderTextColor="#A0A0A0"
                value={loginId}
                onChangeText={setLoginId}
                autoCapitalize="none"
              />
              <TextInput
                style={[styles.input, { marginTop: 20 }]}
                placeholder="PW"
                placeholderTextColor="#A0A0A0"
                secureTextEntry
                value={loginPw}
                onChangeText={setLoginPw}
              />
            </View>

            {/* 로그인 버튼 */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
              >
                <Text style={styles.loginButtonText}>로그인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// 임시 로그인 함수 — 파이썬 백엔드 연동 전까지 사용
// isFirstLogin: true  → 관심사 선택 화면으로
// isFirstLogin: false → MainHome으로
async function fakeLogin(id: string, pw: string) {
  await new Promise<void>(res => setTimeout(() => res(), 300));
  return { isFirstLogin: true, userId: 'user-123' };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  inner: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '300',
    letterSpacing: 2,
    color: '#000',
  },
  inputContainer: {
    marginBottom: 100,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#FFD3C0',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#FFD3C0',
    width: 150,
    height: 55,
    borderRadius: 27.5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
});

export default LoginScreen;
