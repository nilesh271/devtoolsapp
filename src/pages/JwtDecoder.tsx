import { useState } from 'react'
import { Button, Textarea, Alert, IconButton } from '@material-tailwind/react'
import { VscCopy, VscCheck } from 'react-icons/vsc'

function decodeBase64Url(str: string) {
  try {
    // replace url-safe chars
    const normalized = str.replace(/-/g, '+').replace(/_/g, '/')
    // add padding if needed
    const pad = normalized.length % 4
    const padded = normalized + (pad ? '='.repeat(4 - pad) : '')
    const decoded = atob(padded)
    // decode utf-8
    return decodeURIComponent(
      Array.prototype.map
        .call(decoded, (c: string) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join(''),
    )
  } catch {
    return null
  }
}

export default function JwtDecoder() {
  const [token, setToken] = useState('')
  const [header, setHeader] = useState('')
  const [payload, setPayload] = useState('')
  const [signature, setSignature] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState<{header: boolean; payload: boolean}>({ header: false, payload: false })

  const decode = () => {
    setError('')
    const parts = token.split('.')
    if (parts.length < 2) {
      setError('Token must have at least header and payload separated by dots')
      return
    }
    const h = decodeBase64Url(parts[0])
    const p = decodeBase64Url(parts[1])
    if (!h || !p) {
      setError('Unable to decode header or payload (invalid base64)')
      return
    }
    try {
      setHeader(JSON.stringify(JSON.parse(h), null, 2))
    } catch {
      setHeader(h)
    }
    try {
      setPayload(JSON.stringify(JSON.parse(p), null, 2))
    } catch {
      setPayload(p)
    }
    setSignature(parts[2] || '')
  }

  const copy = (which: 'header' | 'payload') => {
    const text = which === 'header' ? header : payload
    navigator.clipboard.writeText(text)
    setCopied((prev) => ({ ...prev, [which]: true }))
    setTimeout(() => setCopied((prev) => ({ ...prev, [which]: false })), 2000)
  }

  const clearAll = () => {
    setToken('')
    setHeader('')
    setPayload('')
    setSignature('')
    setError('')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <section className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">JWT Decoder</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Paste a JWT and inspect the header, payload, and signature.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col">
            <label className="block text-sm font-medium font-semibold text-gray-900 dark:text-white mb-2">
              JWT Token
            </label>
            <Textarea
              value={token}
              onChange={(e) => {
                setToken(e.target.value)
                setError('')
              }}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              className="flex-1 min-h-20 p-4 font-mono text-sm"
            />
          </div>

          {error && (
            <Alert color="red" className="mt-2 text-red-700">
              <strong className="text-red-800">Error:</strong> <span className="text-red-600">{error}</span>
            </Alert>
          )}

          <div className="mt-4 flex flex-wrap gap-3">
            <Button
              onClick={decode}
              disabled={!token}
              className="button-green hover:bg-accent text-black font-semibold shadow-md"
              size="sm"
              color='green'
              variant="filled"
            >
              Decode JWT
            </Button>
            <Button
              onClick={clearAll}
              variant="filled"
              color="red"
              size="sm"
              className="border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              Clear
            </Button>
          </div>

          {header && (
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium font-semibold text-gray-900 dark:text-white">
                  Header
                </label>
                <IconButton
                  size="sm"
                  variant="text"
                  onClick={() => copy('header')}
                  aria-label="Copy header"
                  title={copied.header ? 'Copied!' : 'Copy'}
                >
                  {copied.header ? <VscCheck className="text-green-500" /> : <VscCopy />}
                </IconButton>
              </div>
              <Textarea
                value={header}
                readOnly
                className="flex-1 min-h-40 p-4 font-mono text-sm"
              />
            </div>
          )}

          {payload && (
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium font-semibold text-gray-900 dark:text-white">
                  Payload
                </label>
                <IconButton
                  size="sm"
                  variant="text"
                  onClick={() => copy('payload')}
                  aria-label="Copy payload"
                  title={copied.payload ? 'Copied!' : 'Copy'}
                >
                  {copied.payload ? <VscCheck className="text-green-500" /> : <VscCopy />}
                </IconButton>
              </div>
              <Textarea
                value={payload}
                readOnly
                className="flex-1 min-h-40 p-4 font-mono text-sm"
              />
            </div>
          )}

          {signature && (
            <div className="flex flex-col">
              <label className="block text-sm font-medium font-semibold text-gray-900 dark:text-white mb-2">
                Signature
              </label>
              <Textarea
                value={signature}
                readOnly
                className="flex-1 min-h-20 p-4 font-mono text-sm"
              />
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
