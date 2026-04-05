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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = ({ navigation }: any) => {
  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');

  const handleLogin = () => {
    console.log('로그인 시도:', { loginId, loginPw });
    console.log('로그인 성공!');
  navigation.replace('MainHome'); // 뒤로가기 방지를 위해 replace 사용
    // TODO: 서버 연동 및 로그인 로직
    // 성공 시 홈 화면으로 이동 예시:
    // navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 키보드가 올라올 때 화면을 가리지 않도록 설정 */}
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

            {/* 로그인 버튼 영역 */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>로그인</Text>
              </TouchableOpacity>
            </View>

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  inner: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: 'center', // 세로 중앙 정렬
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
    width: 150, // 이미지처럼 적당한 너비의 타원형
    height: 55,
    borderRadius: 27.5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2, // 안드로이드 그림자
    shadowColor: '#000', // iOS 그림자
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