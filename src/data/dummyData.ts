// src/data/dummyData.ts

export const DUMMY_MEMBER = {
  memberId: 'M001',
  name: '성신이',
  loginId: 'sujeongi@sungsin.ac.kr',
  loginPw: 'password123!',
  birth: '2000-01-01',
  phone: '01012345678',
  aiRecommendAlert: false,
  aiSummary: true,
  aiSave: false,
  imageUrl: 'https://via.placeholder.com/150',
  createdAt: '2026-03-20 14:00:00',
};

export const DUMMY_CATEGORIES = [
  {
    id: 0,
    name: '즐겨찾기',
    higherFolderId: null,
    createdAt: '2026-03-20T14:00:00.000Z',
  },
  {
    id: 1,
    name: '여행',
    higherFolderId: null,
    createdAt: '2026-05-10T14:32:00.000Z',
  },
  {
    id: 2,
    name: '맛집',
    higherFolderId: null,
    createdAt: '2026-05-10T15:10:00.000Z',
  },
  {
    id: 3,
    name: '학업',
    higherFolderId: null,
    createdAt: '2026-05-11T09:00:00.000Z',
  },
  {
    id: 4,
    name: '경제',
    higherFolderId: null,
    createdAt: '2026-05-12T10:22:00.000Z',
  },
  {
    id: 5,
    name: '요리',
    higherFolderId: null,
    createdAt: '2026-05-13T11:15:00.000Z',
  },
  {
    id: 6,
    name: '쇼핑',
    higherFolderId: null,
    createdAt: '2026-05-14T18:45:00.000Z',
  },
  {
    id: 7,
    name: '개발',
    higherFolderId: null,
    createdAt: '2026-05-15T13:12:00.000Z',
  },
  {
    id: 8,
    name: '운동',
    higherFolderId: null,
    createdAt: '2026-05-16T07:30:00.000Z',
  },
];

export const DUMMY_URLS = [
  {
    id: 'U1',
    url: 'https://www.youtube.com/watch?v=travel123',
    title: '유럽 여행 브이로그 🇫🇷 파리 3일 코스',
    thumbnail:
      'data:image/jpeg;base64,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',
    summary: '파리 주요 관광지를 3일 동안 효율적으로 여행하는 일정 소개',
    category: '여행',
    isFavorite: true,
    createdAt: '2026-05-10T14:32:00',
  },
  {
    id: 'U2',
    url: 'https://www.instagram.com/p/food456',
    title: '서울 핫플 브런치 카페 추천',
    thumbnail:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTExMjdfMjIw%2FMDAxNzY0MjEzMTIwMDEy.zvKmF-EbENV_iCIcU3XTrpcnJCci4kMUqcmZPC37oI0g.45NK03E3GnE_M4awQR3jyOZzvm_nys-TOlXvh9Ni9iQg.PNG%2F%25C1%25A6%25B8%25F1%25C0%25BB%25A3%25AD%25C0%25D4%25B7%25C2%25C7%25D8%25C1%25D6%25BC%25BC%25BF%25E4%25A3%25DF%25A3%25AD001%25A3%25A822%25A3%25A9.png&type=a340',
    summary: '서울에서 인기 있는 브런치 카페와 메뉴 소개',
    category: '맛집',
    isFavorite: false,
    createdAt: '2026-05-10T15:10:00',
  },
  {
    id: 'U3',
    url: 'https://blog.naver.com/study789',
    title: '컴퓨터공학 공부법 정리',
    thumbnail:
      'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fs3.orbi.kr%2Fdata%2Ffile%2Funited%2F1bc2c4aa4fb044c1ed5b24f1fa5933e3.png&type=a340',
    summary: '효율적인 전공 공부 방법과 추천 자료 정리',
    category: '학업',
    isFavorite: false,
    createdAt: '2026-05-09T20:21:00',
  },
  {
    id: 'U4',
    url: 'https://news.example.com/economy123',
    title: '2026년 경제 전망 분석',
    thumbnail:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAyMDhfMTAy%2FMDAxNzcwNDk0MTI5ODk4.4h36bL9G4ezv28BqRO93vRl-itO3pHzXmC4ugKMPg90g.nWpMy5A0S42NlnHWVT9iAJw9IDipQfbhFlJmgrK22ukg.PNG%2F%25C6%25C4%25B6%25FB_%25B0%25CB%25C1%25A4_%25BD%25C9%25C7%25C3%25C7%25D1_%25B8%25B6%25C4%25C9%25C6%25C3_%25C6%25AE%25B7%25BB%25B5%25E5_%25C4%25AB%25B5%25E5%25B4%25BA%25BD%25BA_%252840%2529.png&type=a340',
    summary: '글로벌 경제 흐름과 투자 방향에 대한 전문가 분석',
    category: '경제',
    isFavorite: true,
    createdAt: '2026-05-08T09:45:00',
  },
  {
    id: 'U5',
    url: 'https://www.youtube.com/watch?v=recipe321',
    title: '자취생을 위한 간단 요리 5가지',
    thumbnail: 'https://img.youtube.com/vi/recipe321/0.jpg',
    summary: '간단한 재료로 빠르게 만들 수 있는 요리 레시피 소개',
    category: '요리',
    isFavorite: false,
    createdAt: '2026-05-07T18:12:00',
  },
  {
    id: 'U6',
    url: 'https://shopping.example.com/item999',
    title: '가성비 노트북 추천 TOP5',
    thumbnail: 'https://via.placeholder.com/150',
    summary: '대학생을 위한 가격 대비 성능 좋은 노트북 추천',
    category: '쇼핑',
    isFavorite: true,
    createdAt: '2026-05-06T13:55:00',
  },
  {
    id: 'U7',
    url: 'https://medium.com/dev-story',
    title: 'React Native로 앱 만들기 입문',
    thumbnail:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA3MjhfMjUw%2FMDAxNzUzNjY3MzcwMDg4.1N_7r5_26uzLAhRkkAIlTGcBYqYbeUghv0lBBweA0jsg.YdvSZ-LoZOXwVHVU0rBTC2aH4rmjcUSwBA0IELLqfeEg.PNG%2FGemini_Generated_Image_afwu5jafwu5jafwu.png&type=l340_165',
    summary: '초보자를 위한 React Native 개발 환경 설정과 기본 개념 설명',
    category: '개발',
    isFavorite: false,
    createdAt: '2026-05-05T11:30:00',
  },
  {
    id: 'U8',
    url: 'https://www.youtube.com/watch?v=fitness777',
    title: '홈트레이닝 루틴 20분',
    thumbnail:
      'https://i.ytimg.com/vi/iyW4f5pONq0/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AH-CYAC0AWKAgwIABABGEYgSyhlMA8=&rs=AOn4CLC6YdLCCIU3NC8PQGQ1VmzyTT-xAA',
    summary: '집에서 쉽게 따라 할 수 있는 전신 운동 루틴',
    category: '운동',
    isFavorite: false,
    createdAt: '2026-05-04T07:20:00',
  },
  {
    id: 'U9',
    url: 'https://travelblog.com/japan-trip',
    title: '도쿄 여행 완벽 가이드',
    thumbnail:
      'https://i.ytimg.com/vi/sJgNGkfYsH0/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDpYGRptmQiGGHAMrXpxb2-Z18iGw',
    summary: '도쿄 여행 시 꼭 가봐야 할 명소와 꿀팁 정리',
    category: '여행',
    isFavorite: true,
    createdAt: '2026-05-03T22:10:00',
  },
];
