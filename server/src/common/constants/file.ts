export const IMAGE_ALLOWED_MIME_TYPES = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
];

export const IMAGE_MAX_SIZE_IN_MB = 6;

export const THUMBNAIL_MAX_SIZE_IN_MB = 4;

export const MEDIA_ALLOWED_MIME_TYPES = [
  'video/mp4', // MPEG-4 Part 14, broad support across all platforms and devices.
  'video/x-matroska', // MKV, widely used for high-quality video and supports multiple tracks.
  'video/webm', // WebM, efficient and modern for web uploads.
  'video/quicktime', // QuickTime, used for high-quality uploads from Apple devices.
  'video/avi', // AVI, supports legacy videos with high compatibility.
  'video/x-ms-wmv', // WMV, a common choice for older Windows-based content.
  'video/mpeg', // MPEG, older but still used for certain professional media.
  'video/3gpp', // Mobile uploads, though less common for high-quality videos.
  'video/ogg', // OGG, open format used in some web environments.
];

export const MEDIA_MAX_SIZE_IN_MB = 3686.4; // ie 3.6GB
