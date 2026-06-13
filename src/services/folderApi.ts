const BASE_URL = 'https://galpibe-production.up.railway.app';

export interface Folder {
  folderId: number;
  name: string;
  higherFolderId: number | null;
  createdAt: string;
}

// 폴더 목록 조회
export const getFolders = async (): Promise<Folder[]> => {
  const response = await fetch(`${BASE_URL}/folders?sortBy=latest`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('폴더 목록 조회 실패');
  return response.json();
};

// 폴더 등록
export const createFolder = async (name: string): Promise<Folder> => {
  const response = await fetch(`${BASE_URL}/folders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) throw new Error('폴더 등록 실패');
  return response.json();
};

// 폴더 수정
export const updateFolder = async (folderId: number, name: string): Promise<Folder> => {
  const response = await fetch(`${BASE_URL}/folders/${folderId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) throw new Error('폴더 수정 실패');
  return response.json();
};

// 폴더 삭제
export const deleteFolder = async (folderId: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/folders/${folderId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('폴더 삭제 실패');
};