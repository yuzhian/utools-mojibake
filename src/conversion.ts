const iconv = window.iconv

export const CODES = ['GBK', 'UTF-8', 'iso-8859-1', 'windows-1252', 'Big5', 'Shift_Jis']

export function exec(text: string, from: string, to: string): string {
  return iconv.decode(iconv.encode(text, from), to)
}

export function batch(text: string, codes: Array<string>): Array<Array<string>> {
  if (!text) return []
  return codes.flatMap(from => codes.filter(to => to !== from).map(to => [from, to, exec(text, from, to)]))
}
