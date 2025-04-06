import { useState } from 'react';

const api = import.meta.env.VITE_API_BASE;


function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

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

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'system-ui, sans-serif',
      backgroundColor: '#f0f4f8',
      padding: '2rem'
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '1rem',
        boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '600px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
          🔗 URL Shortener
        </h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="url"
            required
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="Enter a long URL"
            style={{
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid #d1d5db',
              fontSize: '1rem',
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
              cursor: 'pointer'
            }}
          >
            Shorten URL
          </button>
        </form>

        {shortUrl && (
          <div style={{ marginTop: '1.5rem', fontSize: '1rem', color: '#10b981' }}>
            <p>Short URL:</p>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold' }}>
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
