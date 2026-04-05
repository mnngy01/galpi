// src/data/dummyData.ts

export const DUMMY_MEMBER = {
  memberId: "M001",
  name: "성신이",
  loginId: "sujeongi@sungsin.ac.kr",
  loginPw: "password123!",
  birth: "2000-01-01",
  phone: "01012345678",
  aiRecommendAlert: false,
  aiSummary: true,
  aiSave: false,
  imageUrl: "https://via.placeholder.com/150", // 임시 이미지 주소
  createdAt: "2026-03-20 14:00:00",
};

export const DUMMY_URLS = [
  {
    urlId: "URL_001",
    title: "성신여자대학교 홈페이지",
    link: "https://www.sungsin.ac.kr",
    folderName: "학교",
    isAiSaved: false,
    createdAt: "2026-04-01 10:30:00",
  },
  {
    urlId: "URL_002",
    title: "React Native 공식 문서",
    link: "https://reactnative.dev",
    folderName: "개발공부",
    isAiSaved: true,
    createdAt: "2026-04-05 15:45:00",
  }
];