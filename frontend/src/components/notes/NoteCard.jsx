import { useState } from 'react';

const cardColors = [
  { bg: '#FFF3E0', border: '#FFB347' },
  { bg: '#F0FFF4', border: '#68D391' },
  { bg: '#F3F0FF', border: '#B794F4' },
  { bg: '#EBF8FF', border: '#63B3ED' },
  { bg: '#FFFFF0', border: '#F6E05E' },
  { bg: '#FFF5F5', border: '#FC8181' },
];

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const NoteCard = ({ note, index, onEdit, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const color = cardColors[index % cardColors.length];

  return (
    <div style={{ ...styles.card, backgroundColor: color.bg, borderTop: `3px solid ${color.border}` }}>
      <div style={styles.cardHeader}>
        <h3 style={styles.title}>{note.title}</h3>
        <div style={styles.menuWrapper}>
          <button
            style={styles.menuBtn}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ⋮
          </button>
          {menuOpen && (
            <div style={styles.dropdown}>
              <button
                style={styles.dropdownItem}
                onClick={() => { onEdit(note); setMenuOpen(false); }}
              >
                ✏️ Edit
              </button>
              <button
                style={{ ...styles.dropdownItem, color: '#E53E3E' }}
                onClick={() => { onDelete(note._id); setMenuOpen(false); }}
              >
                🗑️ Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <p style={styles.content}>
        {note.content.length > 100 ? `${note.content.substring(0, 100)}...` : note.content}
      </p>
      <p style={styles.date}>{formatDate(note.createdAt)}</p>
    </div>
  );
};

const styles = {
  card: {
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
    position: 'relative',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '10px',
  },
  title: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#171717',
    margin: 0,
    flex: 1,
  },
  menuWrapper: {
    position: 'relative',
  },
  menuBtn: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#666666',
    padding: '0 4px',
    lineHeight: 1,
  },
  dropdown: {
    position: 'absolute',
    right: 0,
    top: '24px',
    backgroundColor: '#FFFCF7',
    borderRadius: '10px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
    zIndex: 10,
    overflow: 'hidden',
    minWidth: '120px',
  },
  dropdownItem: {
    display: 'block',
    width: '100%',
    padding: '10px 16px',
    background: 'none',
    border: 'none',
    fontSize: '14px',
    cursor: 'pointer',
    textAlign: 'left',
    color: '#171717',
  },
  content: {
    fontSize: '14px',
    color: '#555555',
    lineHeight: '1.6',
    marginBottom: '12px',
  },
  date: {
    fontSize: '12px',
    color: '#8A8A8A',
    margin: 0,
  },
};

export default NoteCard;