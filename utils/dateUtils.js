// /utils/dateUtils.js

export function formatDate(date, locale = "sv-SE") {
  return date ? new Date(date).toLocaleDateString(locale) : "Välj datum";
}

export function formatDateTime(date, locale = "sv-SE") {
  if (!date) return "Välj datum";
  return new Date(date).toLocaleString(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export function isToday(date) {
  if (!date) return false;
  const input = new Date(date);
  const today = new Date();
  return (
    input.getFullYear() === today.getFullYear() &&
    input.getMonth() === today.getMonth() &&
    input.getDate() === today.getDate()
  );
}
