import { useState } from 'react'
import { Button, Textarea, IconButton } from '@material-tailwind/react'
import { VscCopy, VscCheck } from 'react-icons/vsc'

export default function UuidGenerator() {
  const [uuid, setUuid] = useState('')
  const [copied, setCopied] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [format, setFormat] = useState<'lowercase' | 'uppercase' | 'no-hyphens'>('lowercase')

  const generateSingleUuid = (): string => {
    try {
      return crypto.randomUUID()
    } catch {
      // fallback to manual generation (simple v4)
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0
        const v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
    }
  }

  const applyFormat = (id: string): string => {
    if (format === 'uppercase') {
      return id.toUpperCase()
    } else if (format === 'no-hyphens') {
      return id.replace(/-/g, '')
    }
    return id.toLowerCase()
  }

  const generate = () => {
    const ids: string[] = []
    for (let i = 0; i < quantity; i++) {
      const rawId = generateSingleUuid()
      ids.push(applyFormat(rawId))
    }
    setUuid(ids.join('\n'))
  }

  const copy = () => {
    if (!uuid) return
    navigator.clipboard.writeText(uuid)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clear = () => {
    setUuid('')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <section className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">UUID Generator</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Generate unique UUIDs (version 4). Click the button to create a new identifier.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col space-y-6">
          {/* Options */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Quantity input */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Format dropdown */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Format
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as 'lowercase' | 'uppercase' | 'no-hyphens')}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="lowercase">Lowercase</option>
                <option value="uppercase">Uppercase</option>
                <option value="no-hyphens">No Hyphens</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              onClick={generate}
              className="bg-primary hover:bg-accent text-black shadow-md"
              size="sm"
              variant="filled"
              color="green"
            >
              Generate UUID
            </Button>
            <Button
              onClick={clear}
              variant="filled"
              color="red"
              size="sm"
              className="border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              Clear
            </Button>
          </div>

          {uuid && (
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                  Generated UUIDs
                </label>
                <IconButton
                  size="sm"
                  variant="text"
                  onClick={copy}
                  aria-label="Copy uuids"
                  title={copied ? 'Copied!' : 'Copy'}
                  className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                >
                  {copied ? <VscCheck className="text-green-500 w-5 h-5" /> : <VscCopy className="w-5 h-5" />}
                </IconButton>
              </div>
              <Textarea
                value={uuid}
                readOnly
                className="flex-1 min-h-40 p-4 font-mono text-sm"
              />
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
