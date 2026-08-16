import NoteCard from './NoteCard';

const NotesList = ({ notes, onEdit, onDelete }) => {
  if (notes.length === 0) {
    return (
      <div style={styles.emptyState}>
        <p style={styles.emptyIcon}>📝</p>
        <h3 style={styles.emptyTitle}>No notes yet</h3>
        <p style={styles.emptyText}>Click "Create Note" to add your first note!</p>
      </div>
    );
  }

  return (
    <div style={styles.grid}>
      {notes.map((note, index) => (
        <NoteCard
          key={note._id}
          note={note}
          index={index}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
  },
  emptyIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  emptyTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#171717',
    marginBottom: '8px',
  },
  emptyText: {
    fontSize: '14px',
    color: '#666666',
  },
};

export default NotesList;