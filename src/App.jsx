import { useCallback, useEffect, useRef, useState } from 'react'
import {
  createContact,
  deleteContact,
  getContacts,
  updateContact,
} from './api/contacts.js'
import ConfirmDialog from './components/ConfirmDialog.jsx'
import ContactForm from './components/ContactForm.jsx'
import ContactList from './components/ContactList.jsx'
import SearchBar from './components/SearchBar.jsx'
import './App.css'

function App() {
  const [contacts, setContacts] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [waking, setWaking] = useState(false)
  const [pageError, setPageError] = useState('')
  const [form, setForm] = useState(null)
  const [formError, setFormError] = useState('')
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [contactToDelete, setContactToDelete] = useState(null)
  const [toast, setToast] = useState('')
  const [reload, setReload] = useState(0)
  const toastTimer = useRef(null)

  useEffect(() => {
    let active = true
    const timer = window.setTimeout(() => {
      if (active) setWaking(true)
    }, 5000)

    getContacts()
      .then((data) => {
        if (active) setContacts(data)
      })
      .catch((error) => {
        if (active) setPageError(error.message)
      })
      .finally(() => {
        window.clearTimeout(timer)
        if (active) {
          setLoading(false)
          setWaking(false)
        }
      })

    return () => {
      active = false
      window.clearTimeout(timer)
    }
  }, [reload])

  useEffect(
    () => () => {
      window.clearTimeout(toastTimer.current)
    },
    [],
  )

  const showToast = useCallback((message) => {
    window.clearTimeout(toastTimer.current)
    setToast(message)
    toastTimer.current = window.setTimeout(() => setToast(''), 3200)
  }, [])

  const visibleContacts = contacts.filter((contact) => {
    const query = search.trim().toLowerCase()
    return (
      contact.name.toLowerCase().includes(query) ||
      contact.mobile_number.toLowerCase().includes(query)
    )
  })

  async function saveContact(values) {
    setSaving(true)
    setFormError('')
    try {
      const contact = form
        ? await updateContact(form.id, values)
        : await createContact(values)
      setContacts((current) =>
        form
          ? current.map((item) => (item.id === contact.id ? contact : item))
          : [...current, contact],
      )
      setForm(null)
      showToast(form ? 'Contact updated.' : 'Contact added.')
    } catch (error) {
      setFormError(error.message)
    } finally {
      setSaving(false)
    }
  }

  async function removeContact() {
    if (!contactToDelete) return
    setDeleting(true)
    try {
      await deleteContact(contactToDelete.id)
      setContacts((current) =>
        current.filter((contact) => contact.id !== contactToDelete.id),
      )
      setContactToDelete(null)
      showToast('Contact deleted.')
    } catch (error) {
      setPageError(error.message)
      setContactToDelete(null)
    } finally {
      setDeleting(false)
    }
  }

  function openForm(contact = null) {
    setFormError('')
    setForm(contact || {})
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Contactly home">
          <span className="brand-mark" aria-hidden="true">C</span>
          <span>contactly</span>
        </a>
        <span className="topbar-note">Your people, all in one place</span>
      </header>

      <section className="contacts-page" aria-labelledby="page-title">
        <div className="page-heading">
          <div>
            <p className="eyebrow">YOUR ADDRESS BOOK</p>
            <h1 id="page-title">Contacts</h1>
            <p className="page-description">
              Keep the people who matter just a little closer.
            </p>
          </div>
          <button className="button button-primary add-button" onClick={() => openForm()}>
            <span aria-hidden="true">+</span> Add contact
          </button>
        </div>

        <section className="contacts-card" aria-label="Contact list">
          <div className="list-toolbar">
            <div>
              <h2>All contacts</h2>
              <p>
                {contacts.length} {contacts.length === 1 ? 'person' : 'people'}
              </p>
            </div>
            <SearchBar value={search} onChange={setSearch} />
          </div>

          {pageError && (
            <div className="error-banner" role="alert">
              <span>{pageError}</span>
              <button
                className="text-button"
                onClick={() => {
                  setLoading(true)
                  setPageError('')
                  setReload((value) => value + 1)
                }}
              >
                Try again
              </button>
            </div>
          )}

          <ContactList
            contacts={visibleContacts}
            loading={loading}
            waking={waking}
            hasSearch={Boolean(search.trim())}
            onEdit={openForm}
            onDelete={setContactToDelete}
          />
        </section>
        <footer className="page-footer">A little more connected, every day.</footer>
      </section>

      {form !== null && (
        <ContactForm
          key={form.id || 'new-contact'}
          contact={form.id ? form : null}
          error={formError}
          saving={saving}
          onCancel={() => setForm(null)}
          onSubmit={saveContact}
        />
      )}

      {contactToDelete && (
        <ConfirmDialog
          contact={contactToDelete}
          deleting={deleting}
          onCancel={() => setContactToDelete(null)}
          onConfirm={removeContact}
        />
      )}

      {toast && <div className="toast" role="status">{toast}</div>}
    </main>
  )
}

export default App
