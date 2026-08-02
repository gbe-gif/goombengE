export function formatKST(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '-';
  
  // Create a formatter for Asia/Seoul
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  });
  
  // Get parts to construct YYYY.MM.DD HH:mm
  const parts = formatter.formatToParts(date);
  const getPart = (type: string) => parts.find(p => p.type === type)?.value;
  
  const year = getPart('year');
  const month = getPart('month');
  const day = getPart('day');
  const hour = getPart('hour');
  const minute = getPart('minute');
  
  return `${year}.${month}.${day} ${hour}:${minute}`;
}
