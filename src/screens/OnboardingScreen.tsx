import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';

const OnboardingScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* 중앙 로고 영역 */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>GALPI</Text>
      </View>

      {/* 하단 버튼 영역 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.mainButton, { backgroundColor: '#FFD3C0' }]} 
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.mainButton, { backgroundColor: '#FFD3C0' }]} 
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.buttonText}>회원가입</Text>
        </TouchableOpacity>

        {/* 소셜 로그인 영역 */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialCircle}>
            <Text style={styles.socialText}>카카오</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialCircle}>
            <Text style={styles.socialText}>구글</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialCircle}>
            <Text style={styles.socialText}>애플</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  logoText: {
    fontSize: 48,
    fontWeight: '300',
    color: '#000',
    letterSpacing: 2,
  },
  buttonContainer: {
    paddingHorizontal: 40,
    paddingBottom: 60,
    alignItems: 'center',
  },
  mainButton: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  socialContainer: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 20,
  },
  socialCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialText: {
    fontSize: 10,
    color: '#333',
  },
});

export default OnboardingScreen;