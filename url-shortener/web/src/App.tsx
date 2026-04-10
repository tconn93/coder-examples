import { useState, useEffect, useCallback } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

interface UrlItem {
  shortCode: string
  originalUrl: string
  clicks: number
  createdAt: string
  shortUrl: string
}

function App() {
  const [urls, setUrls] = useState<UrlItem[]>([])
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchUrls = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('http://localhost:3001/api/urls')
      if (!res.ok) throw new Error('Failed')
      const data = await res.json()
      setUrls(data.sort((a: UrlItem, b: UrlItem) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
    } catch (e) {
      setError('Failed to load URLs. Is backend running on port 3001?')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUrls()
  }, [fetchUrls])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.startsWith('http')) {
      setError('Valid URL required (must start with http/https)')
      return
    }
    setError('')
    setLoading(true)
    try {
      const res = await fetch('http://localhost:3001/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl: inputValue }),
      })
      if (!res.ok) throw new Error('Failed')
      setInputValue('')
      fetchUrls()
    } catch (e) {
      setError('Failed to shorten URL')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (shortCode: string) => {
    try {
      await fetch(`http://localhost:3001/api/urls/${shortCode}`, { method: 'DELETE' })
      fetchUrls()
    } catch (e) {
      setError('Failed to delete')
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // Optional: show toast
      alert('Copied to clipboard!')
    } catch (e) {
      alert('Copy failed')
    }
  }

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Tiny URL Shortener</h1>
          <p>Shorten and manage your tiny links easily</p>
        </div>
        <form onSubmit={handleSubmit} className="w-full max-w-lg flex flex-col sm:flex-row gap-4">
          <input
            type="url"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            disabled={loading}
          />
          <button 
            type="submit" 
            disabled={loading}
            className="px-8 py-4 bg-accent text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 font-medium whitespace-nowrap"
          >
            {loading ? 'Shortening...' : 'Create Tiny URL'}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4 p-3 bg-red-50 rounded-lg">{error}</p>}
        <div className="w-full max-w-4xl mt-12">
          <h2 className="text-2xl mb-6">Your Short Links ({urls.length})</h2>
          {loading && urls.length === 0 && <p>Loading links...</p>}
          {urls.length === 0 && !loading ? (
            <p className="text-gray-500 italic">No links yet. Create your first tiny URL above!</p>
          ) : (
            <div className="grid gap-4">
              {urls.map((u) => (
                <div key={u.shortCode} className="flex flex-col md:flex-row gap-4 items-start md:items-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-all bg-white">
                  <a href={u.shortUrl} target="_blank" rel="noopener" className="font-mono text-xl font-bold text-accent hover:underline flex-1 min-w-0 truncate" title={u.shortUrl}>
                    localhost:3001/{u.shortCode}
                  </a>
                  <div className="truncate text-sm md:text-base flex-1 min-w-0" title={u.originalUrl}>
                    {u.originalUrl}
                  </div>
                  <div className="text-sm font-medium text-gray-700 min-w-[80px]">
                    {u.clicks} clicks
                  </div>
                  <div className="flex gap-2 ml-auto">
                    <button 
                      onClick={() => copyToClipboard(u.shortUrl)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm font-medium transition"
                    >
                      Copy
                    </button>
                    <button 
                      onClick={() => handleDelete(u.shortCode)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm font-medium transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="ticks"></div>
      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Backend API</h2>
          <p>Running on <code>localhost:3001</code></p>
          <ul>
            <li>
              <a href="http://localhost:3001/" target="_blank">
                API Root
              </a>
            </li>
            <li>
              <a href="http://localhost:3001/api/urls" target="_blank">
                List URLs
              </a>
            </li>
          </ul>
        </div>
      </section>
      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App