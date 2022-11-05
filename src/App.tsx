import { useState } from 'react'

function exec(value: string, from = 'gbk', to = 'utf8') {
  return window.iconv.decode(window.iconv.encode(value, from), to)
}

const codes = ['iso-8859-1', 'windows-1252', 'GBK', 'Big5', 'Shift_Jis', 'UTF-8']

const foo = '锘挎槬鐪犱笉瑙夋檽锛屽澶勯椈鍟奸笩'
export default function App() {
  const [texts, setTexts] = useState<Array<Array<String>>>([])
  const run = () => setTexts(codes.flatMap(from => codes.filter(to => to !== from).map(to => [from, to, exec(foo, from, to)])))
  return (
    <div>
      <button onClick={run}>转换</button>
      {texts.map(([from, to, text]) => (
        <div>
          {from} {to} {text}
        </div>
      ))}
    </div>
  )
}
