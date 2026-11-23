const TILE_TRANSFORM = 'f_auto,q_auto,w_1200';
const LIGHTBOX_TRANSFORM = 'f_auto,q_auto,w_2000';
const HERO_TRANSFORM = 'f_auto,q_auto,w_700';

function insertTransform(url: string, transform: string): string {
  if (!url.includes('res.cloudinary.com/')) {
    return url;
  }
  const marker = '/upload/';
  const index = url.indexOf(marker);
  if (index === -1) {
    return url;
  }
  return (
    url.slice(0, index + marker.length) +
    transform +
    '/' +
    url.slice(index + marker.length)
  );
}

export function gridImageUrl(url: string): string {
  return insertTransform(url, TILE_TRANSFORM);
}

export function lightboxImageUrl(url: string): string {
  return insertTransform(url, LIGHTBOX_TRANSFORM);
}

export function heroImageUrl(url: string): string {
  return insertTransform(url, HERO_TRANSFORM);
}
