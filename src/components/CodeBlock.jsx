import { cn } from '@/lib/utils'

const KEYWORDS = new Set([
  'public', 'private', 'protected', 'class', 'interface', 'extends', 'implements', 'return', 'new', 'void',
  'static', 'final', 'throws', 'throw', 'if', 'else', 'import', 'package', 'this', 'record', 'var', 'true',
  'false', 'null', 'try', 'catch',
  'const', 'let', 'async', 'await', 'export', 'default', 'from', 'function',
  'FROM', 'WORKDIR', 'COPY', 'RUN', 'ENV', 'EXPOSE', 'CMD', 'AS',
])

// comment | string | annotation | number | identifier
const TOKEN = /(\/\/.*$|^#.*$)|("(?:[^"\\]|\\.)*")|(@\w+)|\b(\d+L?)\b|\b([A-Za-z_]\w*)\b/g

function tokenize(line, row) {
  const out = []
  let last = 0
  let n = 0
  for (const m of line.matchAll(TOKEN)) {
    if (m.index > last) out.push(line.slice(last, m.index))
    const [text, comment, str, ann, num, ident] = m
    const key = `${row}-${n++}`
    let cls = null
    if (comment) cls = 'text-muted-foreground italic'
    else if (str) cls = 'text-accent'
    else if (ann) cls = 'text-[#7c3aed]'
    else if (num) cls = 'text-ok'
    else if (ident) {
      if (KEYWORDS.has(ident)) cls = 'text-primary'
      else if (/^[A-Z]/.test(ident)) cls = 'text-[#0369a1]'
      else if (line[m.index + text.length] === '(') cls = 'text-foreground'
    }
    out.push(cls ? <span key={key} className={cls}>{text}</span> : text)
    last = m.index + text.length
  }
  if (last < line.length) out.push(line.slice(last))
  return out
}

/** Small, dependency-free syntax colouring (Java, JavaScript, Dockerfile) for the code tabs. */
export default function CodeBlock({ code, label, className }) {
  return (
    <pre
      tabIndex={0}
      aria-label={label}
      className={cn('overflow-x-auto bg-[#f5eedb]/70 p-5 font-mono text-[13px] leading-relaxed text-foreground/85 sm:text-sm', className)}
    >
      <code>
        {code.split('\n').map((line, i) => (
          <span key={i} className="block min-h-[1.4em] whitespace-pre">
            {tokenize(line, i)}
          </span>
        ))}
      </code>
    </pre>
  )
}
