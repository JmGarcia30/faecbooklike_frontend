const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001/api/posts'

async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`${res.status} ${res.statusText}: ${text}`)
  }
  return res.status === 204 ? null : res.json()
}

export async function getPosts() {
  const res = await fetch(BASE)
  return handleResponse(res)
}

export async function getPost(id) {
  const res = await fetch(`${BASE}/${id}`)
  return handleResponse(res)
}

export async function createPost(payload) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  return handleResponse(res)
}

export async function updatePost(id, payload) {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  return handleResponse(res)
}

export async function deletePost(id) {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' })
  return handleResponse(res)
}