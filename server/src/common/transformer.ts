export function transformerStringArrayOrObject({ value }) {
  if (Array.isArray(value) || typeof value === 'object') return value;
  if (typeof value === 'string' && value.trim() !== '')
    return JSON.parse(value);
  return value;
}
