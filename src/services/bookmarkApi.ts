const BASE_URL = 'https://galpibe-production.up.railway.app';

export interface Bookmark {
  id: number;
  url: string;
  folderId: number | null;
  imageUrl: string | null;
  aiSummary: string | null;
  like: boolean;
  createdAt: string;
}

// GET /bookmarks - 북마크 목록 조회 (전체)
export const fetchBookmarks = async (): Promise<Bookmark[]> => {
  const response = await fetch(`${BASE_URL}/bookmarks`);
  const json = await response.json();
  return json.data;
};

// GET /folders/{folderId}/bookmarks - 북마크 목록 조회 (폴더별)
export const fetchBookmarksByFolder = async (folderId: string): Promise<Bookmark[]> => {
  const response = await fetch(`${BASE_URL}/folders/${folderId}/bookmarks`);
  const json = await response.json();
  return json.data ?? [];
};

// POST /bookmarks - 북마크 등록
export const addBookmark = async (url: string, folderId: number): Promise<Bookmark> => {
  const response = await fetch(`${BASE_URL}/bookmarks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, folderId }),
  });
  const json = await response.json();
  return json.data;
};

// GET /bookmarks/{bookmarkId} - 북마크 상세 조회
export const fetchBookmarkDetail = async (bookmarkId: number): Promise<Bookmark> => {
  const response = await fetch(`${BASE_URL}/bookmarks/${bookmarkId}`);
  const json = await response.json();
  return json.data;
};

// PUT /bookmarks/{bookmarkId} - 북마크 수정
export const updateBookmark = async (bookmarkId: number, data: Partial<Bookmark>): Promise<Bookmark> => {
  const response = await fetch(`${BASE_URL}/bookmarks/${bookmarkId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  return json.data;
};

// DELETE /bookmarks/{bookmarkId} - 북마크 삭제
export const deleteBookmark = async (bookmarkId: number): Promise<void> => {
  await fetch(`${BASE_URL}/bookmarks/${bookmarkId}`, {
    method: 'DELETE',
  });
};

// GET /bookmarks/search - 북마크 검색
export const searchBookmarks = async (query: string): Promise<Bookmark[]> => {
  const response = await fetch(`${BASE_URL}/bookmarks/search?q=${encodeURIComponent(query)}`);
  const json = await response.json();
  return json.data;
};

// GET /bookmarks/recommend - 북마크 추천 1
export const fetchRecommendedBookmarks = async (): Promise<Bookmark[]> => {
  const response = await fetch(`${BASE_URL}/bookmarks/recommend`);
  const json = await response.json();
  return json.data;
};

// GET /bookmarks/remind - 북마크 추천 2
export const fetchRemindBookmarks = async (): Promise<Bookmark[]> => {
  const response = await fetch(`${BASE_URL}/bookmarks/remind`);
  const json = await response.json();
  return json.data;
};