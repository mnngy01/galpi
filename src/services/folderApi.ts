const BASE_URL = 'https://galpibe-production.up.railway.app';

export interface Folder {
  id: string;
  name: string;
  higherFolderId: string | null;
  createdAt: string;
}

// 폴더 목록 조회
export const getFolders = async (): Promise<Folder[]> => {
  const response = await fetch(`${BASE_URL}/folders?sortBy=latest`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('폴더 목록 조회 실패');
  const json = await response.json();
  return json.data ?? [];
};

// 폴더 등록
export const createFolder = async (name: string): Promise<Folder> => {
  const response = await fetch(`${BASE_URL}/folders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, higherFolderId: null }), // ← 추가
  });
  const json = await response.json();
  console.log('createFolder 응답:', JSON.stringify(json));
  if (!response.ok) throw new Error('폴더 등록 실패');
  return json.data;
};

// 폴더 수정
export const updateFolder = async (
  id: string,
  name: string,
): Promise<Folder> => {
  const response = await fetch(`${BASE_URL}/folders/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) throw new Error('폴더 수정 실패');
  const json = await response.json();
  return json.data;
};

// 폴더 삭제
export const deleteFolder = async (id: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/folders/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('폴더 삭제 실패');
};
