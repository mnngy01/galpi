const BASE_URL = 'https://galpibe-production.up.railway.app';

export interface Bookmark {
  id: string; // bookmarkId: number → id: string 으로 수정
  url: string;
  folderId: string | null;
  imageUrl: string | null;
  aiSummary: string | null;
  like: boolean;
  createdAt: string;
}

// GET /bookmarks
export const fetchBookmarks = async (): Promise<Bookmark[]> => {
  const response = await fetch(`${BASE_URL}/bookmarks`);
  const json = await response.json();
  return json.data;
};

// POST /folders/{folderId}/bookmarks
export const addBookmark = async (
  folderId: string,
  url: string,
): Promise<Bookmark> => {
  const response = await fetch(`${BASE_URL}/folders/${folderId}/bookmarks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });
  const json = await response.json();
  return json.data;
};
