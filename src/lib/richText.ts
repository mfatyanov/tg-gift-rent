// Разбор мини-разметки из content.ts в токены (без v-html — текст всегда экранируется).

export type RichToken =
  | { type: 'text'; value: string }
  | { type: 'bold'; value: string }
  | { type: 'chip'; value: string; danger: boolean }
  | { type: 'code'; value: string }
  | { type: 'link'; value: string; href: string }

const PATTERN = /\*\*(.+?)\*\*|\[\[(!?)(.+?)\]\]|`([^`]+)`|\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g

export function parseRich(source: string): RichToken[] {
  const tokens: RichToken[] = []
  let last = 0

  for (const m of source.matchAll(PATTERN)) {
    const start = m.index
    if (start > last) tokens.push({ type: 'text', value: source.slice(last, start) })

    if (m[1] !== undefined) tokens.push({ type: 'bold', value: m[1] })
    else if (m[3] !== undefined) tokens.push({ type: 'chip', value: m[3], danger: m[2] === '!' })
    else if (m[4] !== undefined) tokens.push({ type: 'code', value: m[4] })
    else tokens.push({ type: 'link', value: m[5]!, href: m[6]! })

    last = start + m[0].length
  }

  if (last < source.length) tokens.push({ type: 'text', value: source.slice(last) })
  return tokens
}
