import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import notesApi from '../api/notesApi';
import Sidebar from '../components/dashboard/Sidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import NotesList from '../components/notes/NotesList';
import SearchBar from '../components/dashboard/SearchBar';
import Toast from '../components/ui/Toast';
import ConfirmDialog from '../components/ui/ConfirmDialog';

const DashboardPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const data = await notesApi.getNotes(token);
      setNotes(data);
    } catch (err) {
      setError('Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (note) => {
    navigate(`/editor/${note._id}`, { state: { note } });
  };

  const handleDeleteClick = (id) => {
    setConfirmDialog({
      message: 'Are you sure you want to delete this note? This action cannot be undone.',
      noteId: id,
    });
  };

  const handleDeleteConfirm = async () => {
    try {
      await notesApi.deleteNote(token, confirmDialog.noteId);
      setNotes(notes.filter((note) => note._id !== confirmDialog.noteId));
      setConfirmDialog(null);
      setToast({ message: 'Note deleted successfully', type: 'success' });
    } catch (err) {
      setConfirmDialog(null);
      setToast({ message: 'Failed to delete note', type: 'error' });
    }
  };

  const handleCreateNote = () => {
    navigate('/editor/new');
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <Sidebar totalNotes={notes.length} />
      <div style={styles.main}>
        <DashboardHeader />
        <div style={styles.content}>
          <div style={styles.contentHeader}>
            <div>
              <h1 style={styles.heading}>All Notes</h1>
              <p style={styles.subheading}>
                {searchTerm
                  ? `${filteredNotes.length} results for "${searchTerm}"`
                  : `${notes.length} notes`}
              </p>
            </div>
            <div style={styles.headerRight}>
              <SearchBar
                searchTerm={searchTerm}
                onSearch={setSearchTerm}
              />
              <button
                style={styles.createBtn}
                onClick={handleCreateNote}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#C95F00'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#E87500'}
              >
                + Create Note
              </button>
            </div>
          </div>
          {error && <p style={styles.error}>{error}</p>}
          {loading ? (
            <p style={styles.loading}>Loading notes...</p>
          ) : (
            <NotesList
  notes={filteredNotes}
  onEdit={handleEdit}
  onDelete={handleDeleteClick}
  searchTerm={searchTerm}
/>
          )}
        </div>
      </div>

      {confirmDialog && (
        <ConfirmDialog
          message={confirmDialog.message}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setConfirmDialog(null)}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

const styles = {
  page: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#FFF0D6',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    padding: '32px',
    flex: 1,
  },
  contentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '28px',
  },
  heading: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#171717',
    margin: 0,
  },
  subheading: {
    fontSize: '14px',
    color: '#666666',
    margin: '4px 0 0 0',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  createBtn: {
    padding: '12px 24px',
    backgroundColor: '#E87500',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    fontFamily: 'Poppins, sans-serif',
  },
  error: {
    color: '#E53E3E',
    fontSize: '14px',
    marginBottom: '16px',
  },
  loading: {
    fontSize: '16px',
    color: '#666666',
    textAlign: 'center',
    padding: '40px',
  },
};

export default DashboardPage;