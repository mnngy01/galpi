// DB에서 가져온 링크에 아래 도메인이 포함되어 잇을 경우 해당 단어로 변환하기.
export const getSourceName = (url: string): string => {
  if (url.includes('youtu')) return 'YouTube';
  if (url.includes('insta')) return 'Instagram';
  if (url.includes('blog.naver')) return 'Naver Blog';
  if (url.includes('naver')) return 'Naver';
  if (url.includes('tiktok')) return 'TikTok';
  if (url.includes('twitter') || url.includes('x.com')) return 'X (Twitter)';
  if (url.includes('facebook')) return 'Facebook';
  if (url.includes('github')) return 'GitHub';
  if (url.includes('notion')) return 'Notion';
  if (url.includes('news')) return 'News';
  if (url.includes('shopping')) return 'Shopping';

  try {
    const domain = new URL(url).hostname.replace('www.', '');
    return domain;
  } catch {
    return url;
  }
};
