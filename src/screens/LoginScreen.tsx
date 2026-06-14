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
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BASE_URL = 'https://galpibe-production.up.railway.app';

const LoginScreen = ({ navigation }: any) => {
  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');

  const handleLogin = async () => {
    if (!loginId || !loginPw) {
      Alert.alert('입력 오류', 'ID와 PW를 입력해 주세요.');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loginId, loginPw }),
      });

      const json = await response.json();

      if (!response.ok) {
        Alert.alert('로그인 실패', 'ID 또는 PW를 확인해 주세요.');
        return;
      }

      if (response.ok) {
        navigation.replace('InterestSelect');
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
            <View style={styles.headerContainer}>
              <Image
                source={require('../assets/logo_pink_2.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

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
  logo: {
    width: 150,
    height: 60,
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
