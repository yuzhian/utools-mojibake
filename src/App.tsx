import { useState } from 'react'
import { Button, TextField, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import * as conversion from './conversion'

export default function App() {
  const [text, setText] = useState('')
  const [results, setResults] = useState<Array<Array<String>>>([])

  window.utools?.onPluginEnter(({ payload, type }) => {
    if (type !== 'over') return
    setText(payload)
    setResults(conversion.batch(payload, conversion.CODES))
  })

  return (
    <Stack spacing={2}>
      <TextField label='乱码文本' multiline rows={4} fullWidth variant='standard' value={text} onChange={event => setText(event.target.value)} />
      <Button variant='contained' fullWidth onClick={() => setResults(conversion.batch(text, conversion.CODES))}>
        转换
      </Button>

      <TableContainer component={Paper} style={{ height: 'calc(100vh - 186px)' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>原编码</TableCell>
              <TableCell>现编码</TableCell>
              <TableCell>恢复结果</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map(([from, to, result], index) => (
              <TableRow key={index}>
                <TableCell>{from}</TableCell>
                <TableCell>{to}</TableCell>
                <TableCell>{result}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  )
}
