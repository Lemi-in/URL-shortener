import { useState } from 'react';

const api = import.meta.env.VITE_API_BASE;

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(api, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ originalUrl }),
    });

    const data = await res.json();
    setShortUrl(data.shortUrl || '');
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'system-ui, sans-serif',
        backgroundColor: darkMode ? '#111827' : '#f0f4f8',
        color: darkMode ? '#f9fafb' : '#1f2937',
        padding: '2rem',
        transition: 'all 0.3s ease',
      }}
    >
      <button
        onClick={toggleDarkMode}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'none',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer',
          color: darkMode ? '#fbbf24' : '#111827',
        }}
        title="Toggle Dark Mode"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>

      <div
        style={{
          backgroundColor: darkMode ? '#1f2937' : '#fff',
          padding: '2rem',
          borderRadius: '1rem',
          boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '600px',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: darkMode ? '#f9fafb' : '#1f2937',
          }}
        >
          🔗 URL Shortener
        </h1>

        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <input
            type="url"
            required
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="Enter a long URL"
            style={{
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: `1px solid ${darkMode ? '#374151' : '#d1d5db'}`,
              fontSize: '1rem',
              backgroundColor: darkMode ? '#374151' : '#fff',
              color: darkMode ? '#f9fafb' : '#111827',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '0.75rem',
              backgroundColor: '#3b82f6',
              color: '#fff',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            Shorten URL
          </button>
        </form>

        {shortUrl && (
          <div
            style={{
              marginTop: '1.5rem',
              fontSize: '1rem',
              color: darkMode ? '#6ee7b7' : '#10b981',
            }}
          >
            <p>Short URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontWeight: 'bold', color: 'inherit' }}
            >
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
