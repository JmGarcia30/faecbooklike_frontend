import React, { useState } from 'react'
import { createPost, updatePost } from '../api/posts'

export default function PostForm({ initial = null, onSaved = null, onCancel = null }) {
  const [author, setAuthor] = useState(initial?.author || '')
  const [content, setContent] = useState(initial?.content || '')
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const isEdit = !!initial?.id

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const payload = { author, content, imageUrl }
    try {
      const saved = isEdit ? await updatePost(initial.id, payload) : await createPost(payload)
      setAuthor('')
      setContent('')
      setImageUrl('')
      onSaved && onSaved(saved)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <input
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <input
        placeholder="Image URL (optional)"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <div className="form-actions">
        <button type="submit" disabled={loading}>
          {isEdit ? 'Save' : 'Post'}
        </button>
        {isEdit && (
          <button
            type="button"
            className="btn-link"
            onClick={() => onCancel && onCancel()}>
            Cancel
          </button>
        )}
      </div>
      {error && <div className="error">{error}</div>}
    </form>
  )
}