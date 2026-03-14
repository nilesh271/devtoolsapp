import { useState } from 'react'
import { Button, Textarea, Alert, IconButton } from '@material-tailwind/react'
import { VscCopy, VscCheck } from 'react-icons/vsc'

export default function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const formatJson = () => {
    setError('')
    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, 2)
      setOutput(formatted)
    } catch (err: any) {
      setError(err.message || 'Invalid JSON')
      setOutput('')
    }
  }

  const minifyJson = () => {
    setError('')
    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
    } catch (err: any) {
      setError(err.message || 'Invalid JSON')
      setOutput('')
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero section */}
      <section className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">JSON Formatter</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Format, validate, minify and beautify JSON with ease.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 gap-6">
          {/* Input section */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Input JSON
            </label>
            <Textarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value)
                setError('')
              }}
              placeholder='Paste your JSON here or type it...'
              className="flex-1 min-h-80 p-4 font-mono text-sm"
            />
            {error && (
              <Alert color="red" className="mt-2 text-red-700">
                <strong className="text-red-800">Error:</strong> <span className="text-red-600">{error}</span>
              </Alert>
            )}
          </div>

          {/* Output section */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Output JSON
              </label>
              <IconButton
                size="sm"
                variant="text"
                onClick={copyToClipboard}
                disabled={!output}
                aria-label="Copy output"
                title={copied ? 'Copied!' : 'Copy to clipboard'}
              >
                {copied ? <VscCheck className="text-green-500" /> : <VscCopy />}
              </IconButton>
            </div>
            <Textarea
              value={output}
              readOnly
              placeholder='Formatted JSON will appear here...'
              className="flex-1 min-h-80 p-4 font-mono text-sm"
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            onClick={formatJson}
            disabled={!input}
            className="bg-primary hover:bg-accent text-black shadow-md"
            size="sm"
            variant="filled"
            color="green"
          >
            Format JSON
          </Button>
          <Button
            onClick={minifyJson}
            disabled={!input}
            variant="outlined"
            color="indigo"
            size="lg"
            className="border-primary text-primary hover:bg-primary/10 dark:hover:bg-primary/20"
          >
            Minify
          </Button>
          <Button
            onClick={clearAll}
            variant="outlined"
            color="red"
            size="lg"
            className="border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            Clear All
          </Button>
        </div>
      </section>
    </div>
  )
}
