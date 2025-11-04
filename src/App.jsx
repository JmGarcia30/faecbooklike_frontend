import React, { useState } from 'react'
import PostList from './components/PostList'
import PostForm from './components/PostForm'

export default function App() {
  // small "refresh" key we bump when posts change
  const [refreshKey, setRefreshKey] = useState(0)

  // passed to PostForm — called when a post is created/updated
  function handleSaved() {
    setRefreshKey((k) => k + 1)
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Mini Feed</h1>
        <p className="sub">A simple Facebook-like UI connected to the Spring Boot API</p>
      </header>

      <main className="container">
        {/* Composer goes on top (full width) */}
        <section className="composer">
          <h2>Create post</h2>
          <PostForm onSaved={handleSaved} />
        </section>

        {/* Feed below the composer (full width) */}
        <section className="feed">
          <h2>Feed</h2>
          <PostList refresh={refreshKey} />
        </section>
      </main>

      <footer className="footer">Built with Vite + React</footer>
    </div>
  )
}