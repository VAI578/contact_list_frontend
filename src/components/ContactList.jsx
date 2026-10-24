import ContactItem from './ContactItem.jsx'

function ContactList({ contacts, loading, waking, hasSearch, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="list-state" role="status">
        <span className="spinner" />
        <p>{waking ? 'Waking up server...' : 'Loading your contacts...'}</p>
        {waking && <span className="state-hint">This can take up to a minute on a free host.</span>}
      </div>
    )
  }

  if (!contacts.length) {
    return (
      <div className="list-state empty-state">
        <span className="empty-icon" aria-hidden="true">♡</span>
        <h3>{hasSearch ? 'No matches found' : 'Your list is looking a little empty'}</h3>
        <p>
          {hasSearch
            ? 'Try another name or mobile number.'
            : 'Add your first contact and keep them close.'}
        </p>
      </div>
    )
  }

  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">NAME</th>
            <th scope="col">MOBILE NUMBER</th>
            <th scope="col"><span className="visually-hidden">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              index={index}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ContactList
