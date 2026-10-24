function ConfirmDialog({ contact, deleting, onCancel, onConfirm }) {
  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onCancel()}>
      <section className="modal confirm-modal" role="alertdialog" aria-modal="true" aria-labelledby="delete-title">
        <span className="confirm-icon" aria-hidden="true">!</span>
        <h2 id="delete-title">Remove this contact?</h2>
        <p>
          <strong>{contact.name}</strong> will be removed from your contacts. This can’t be undone.
        </p>
        <div className="modal-actions">
          <button className="button button-secondary" onClick={onCancel} disabled={deleting}>
            Keep contact
          </button>
          <button className="button button-danger" onClick={onConfirm} disabled={deleting}>
            {deleting ? 'Removing…' : 'Remove contact'}
          </button>
        </div>
      </section>
    </div>
  )
}

export default ConfirmDialog
