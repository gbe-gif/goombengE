// Remove only a single outer code fence; preserve all prompt syntax inside it.
export function getOocCopyText(source: string): string {
  const lines = source.split(/\r?\n/);
  let first = 0;
  while (first < lines.length && !lines[first].trim()) first++;
  const opening = lines[first]?.match(/^ {0,3}(`{3,}|~{3,})(.*)$/);
  if (!opening || (opening[1][0] === '`' && opening[2].includes('`'))) return source;
  const closing = new RegExp(`^ {0,3}${opening[1][0]}{${opening[1].length},}[ \\t]*$`);
  const last = lines.findIndex((line, index) => index > first && closing.test(line));
  if (last < 0 || lines.slice(last + 1).some(line => line.trim())) return source;
  return lines.slice(first + 1, last).join(source.includes('\r\n') ? '\r\n' : '\n');
}
