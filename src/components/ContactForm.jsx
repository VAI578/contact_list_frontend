import { useState } from 'react'

function ContactForm({ contact, error, saving, onCancel, onSubmit }) {
  const [name, setName] = useState(contact?.name || '')
  const [mobileNumber, setMobileNumber] = useState(contact?.mobile_number || '')
  const [validationError, setValidationError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const mobile = mobileNumber.trim()

    if (!name.trim()) {
      setValidationError('Please enter a name.')
      return
    }
    if (mobile.length < 10 || mobile.length > 15 || !/^\+?\d+$/.test(mobile)) {
      setValidationError('Enter 10–15 characters using digits and an optional +.')
      return
    }

    setValidationError('')
    onSubmit({ name: name.trim(), mobile_number: mobile })
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onCancel()}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="contact-form-title">
        <div className="modal-heading">
          <div>
            <p className="eyebrow">{contact ? 'UPDATE YOUR ADDRESS BOOK' : 'GROW YOUR ADDRESS BOOK'}</p>
            <h2 id="contact-form-title">{contact ? 'Edit contact' : 'Add a contact'}</h2>
          </div>
          <button className="modal-close" type="button" onClick={onCancel} aria-label="Close dialog">×</button>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              autoFocus
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Rahul Sharma"
              maxLength={100}
            />
          </label>
          <label>
            Mobile number
            <input
              autoComplete="tel"
              inputMode="tel"
              value={mobileNumber}
              onChange={(event) => setMobileNumber(event.target.value)}
              placeholder="e.g. +91 9876543210"
              maxLength={15}
            />
            <span className="field-hint">10–15 characters, digits and an optional + only.</span>
          </label>
          {(validationError || error) && (
            <p className="form-error" role="alert">{validationError || error}</p>
          )}
          <div className="modal-actions">
            <button className="button button-secondary" type="button" onClick={onCancel}>
              Cancel
            </button>
            <button className="button button-primary" type="submit" disabled={saving}>
              {saving ? 'Saving…' : contact ? 'Save changes' : 'Add contact'}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default ContactForm
