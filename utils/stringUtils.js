// utils/stringUtils.js
export function includesIgnoreCase(text, query) {
  return text?.toLowerCase().includes(query?.toLowerCase());
}
