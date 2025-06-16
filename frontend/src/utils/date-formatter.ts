export function formatDate(dateString: string, format: string = 'dd/MM/yyyy'): string {
  const date = new Date(dateString);

  const map: Record<string, string> = {
    dd: String(date.getDate()).padStart(2, '0'),
    MM: String(date.getMonth() + 1).padStart(2, '0'),
    yyyy: String(date.getFullYear()),
    HH: String(date.getHours()).padStart(2, '0'),
    mm: String(date.getMinutes()).padStart(2, '0'),
    ss: String(date.getSeconds()).padStart(2, '0')
  };

  let formatted = format;
  for (const key in map) {
    formatted = formatted.replace(key, map[key]);
  }

  return formatted;
}
