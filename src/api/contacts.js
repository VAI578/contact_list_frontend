const API_URL = (
  import.meta.env.VITE_API_URL || 'https://contact-list-backend-456c.onrender.com'
).replace(/\/+$/, '')

async function request(path, options = {}) {
  let response

  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...options.headers,
      },
    })
  } catch {
    throw new Error('Could not connect to the server. Please try again.')
  }

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data.error || `Request failed (${response.status}).`)
  }
  return data
}

export const getContacts = () => request('/api/contacts')

export const getContact = (id) =>
  request(`/api/contacts/${encodeURIComponent(id)}`)

export const createContact = (contact) =>
  request('/api/contacts', {
    method: 'POST',
    body: JSON.stringify(contact),
  })

export const updateContact = (id, contact) =>
  request(`/api/contacts/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(contact),
  })

export const deleteContact = (id) =>
  request(`/api/contacts/${encodeURIComponent(id)}`, { method: 'DELETE' })
