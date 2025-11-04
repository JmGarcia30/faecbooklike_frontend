import React, { useState } from 'react'
import PostForm from './PostForm'

function formatDate(s) {
  if (!s) return ''
  const d = new Date(s)
  return d.toLocaleString()
}

export default function PostItem({ post, onDeleted, onSaved }) {
  const [editing, setEditing] = useState(false)

  function handleEditSaved(saved) {
    setEditing(false)
    onSaved && onSaved(saved)
  }

  return (
    <article className="post-card">
      {!editing ? (
        <>
          <div className="post-header">
            <div className="author">{post.author}</div>
            <div className="timestamp">{formatDate(post.createdAt)}</div>
          </div>

          <div className="post-body">
            <p>{post.content}</p>
            {post.imageUrl && (
              // eslint-disable-next-line jsx-a11y/img-redundant-alt
              <img src={post.imageUrl} alt="post image" className="post-image" />
            )}
          </div>

          <div className="post-meta">
            <small>Last modified: {formatDate(post.modifiedAt)}</small>
          </div>

          <div className="post-actions">
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={() => onDeleted && onDeleted()} className="danger">
              Delete
            </button>
          </div>
        </>
      ) : (
        <PostForm
          initial={{
            id: post.id,
            author: post.author,
            content: post.content,
            imageUrl: post.imageUrl
          }}
          onSaved={handleEditSaved}
          onCancel={() => setEditing(false)}
        />
      )}
    </article>
  )
}