import React, { useEffect, useState } from 'react'
import { getPosts, deletePost } from '../api/posts'
import PostItem from './PostItem'

export default function PostList({ refresh = 0 }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const data = await getPosts()
      // show newest first
      setPosts((data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // run on mount and whenever the `refresh` prop changes
  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh])

  async function handleDelete(id) {
    if (!confirm('Delete this post?')) return
    try {
      await deletePost(id)
      setPosts((p) => p.filter((x) => x.id !== id))
    } catch (err) {
      alert('Delete failed: ' + err.message)
    }
  }

  function handleSavedOrUpdated(post) {
    setPosts((prev) => {
      const exists = prev.find((p) => p.id === post.id)
      if (exists) {
        return prev.map((p) => (p.id === post.id ? post : p))
      } else {
        return [post, ...prev]
      }
    })
  }

  return (
    <div className="post-list">
      {loading && <div className="muted">Loading posts...</div>}
      {error && <div className="error">{error}</div>}
      {!loading && posts.length === 0 && <div className="muted">No posts yet</div>}
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          onDeleted={() => handleDelete(post.id)}
          onSaved={(saved) => handleSavedOrUpdated(saved)}
        />
      ))}
    </div>
  )
}