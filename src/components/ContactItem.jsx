const colors = ['lavender', 'peach', 'mint', 'blue', 'rose']

function ContactItem({ contact, index, onEdit, onDelete }) {
  const initial = contact.name.trim().charAt(0).toUpperCase() || '?'

  return (
    <tr>
      <td className="contact-id">#{contact.id}</td>
      <td>
        <div className="contact-name">
          <span className={`avatar avatar-${colors[index % colors.length]}`}>
            {initial}
          </span>
          <span>{contact.name}</span>
        </div>
      </td>
      <td className="contact-mobile">{contact.mobile_number}</td>
      <td className="contact-actions">
        <button className="icon-button" onClick={() => onEdit(contact)} aria-label={`Edit ${contact.name}`}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m14 5 5 5M4 20l4.2-.8L19 8.4a2.1 2.1 0 0 0-3-3L5.2 16.2 4 20Z" />
          </svg>
        </button>
        <button className="icon-button delete-button" onClick={() => onDelete(contact)} aria-label={`Delete ${contact.name}`}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 7h16M10 11v6m4-6v6M6 7l1 13h10l1-13M9 7V4h6v3" />
          </svg>
        </button>
      </td>
    </tr>
  )
}

export default ContactItem
