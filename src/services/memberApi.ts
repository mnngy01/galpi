const BASE_URL = 'https://galpibe-production.up.railway.app';

export interface Member {
  id: string;
  name: string;
  loginId: string;
  birth: string;
  phone: string;
  createdAt: string;
}

// POST /members - 회원가입
export const signUp = async (data: {
  name: string;
  loginId: string;
  loginPw: string;
  birth: string;
  phone: string;
}): Promise<Member> => {
  const response = await fetch(`${BASE_URL}/members`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  if (!response.ok) throw new Error('회원가입 실패');
  return json.data;
};

// POST /members/{memberId}/interests - 관심사 등록
const MEMBER_ID = '6a2d98e816541c1c8f261974';

export const postInterests = async (interests: string[]): Promise<void> => {
  const response = await fetch(`${BASE_URL}/members/${MEMBER_ID}/interests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ interests }),
  });
  const json = await response.json();
  console.log('관심사 등록 응답:', JSON.stringify(json));
  if (!response.ok) throw new Error('관심사 등록 실패');
};
