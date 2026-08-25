import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import notesApi from '../api/notesApi';
import Sidebar from '../components/dashboard/Sidebar';
import Toast from '../components/ui/Toast';

const NoteEditorPage = () => {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalNotes, setTotalNotes] = useState(0);

  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isEditing = id !== 'new';
  const [toast, setToast] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (quillRef.current) return;

    const quill = new Quill(editorRef.current, {
      theme: 'snow',
      placeholder: 'Start writing your note...',
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link'],
          ['clean'],
        ],
      },
    });
    quillRef.current = quill;

    const loadNote = async () => {
      if (!isEditing) return;
      try {
        let note = location.state?.note;
        if (!note) {
          note = await notesApi.getNoteById(token, id);
        }
        setTitle(note.title);
        quill.clipboard.dangerouslyPasteHTML(note.content ?? '');
      } catch (err) {
        setError('Failed to load note');
      }
    };

    loadNote();
  }, []);

  const handleSave = async () => {
    if (saved) return;
    const content = quillRef.current.root.innerHTML;

    if (!title.trim()) {
      setError('Please enter a title');
      return;
    }

    if (!content.trim() || content === '<p><br></p>') {
      setError('Please enter some content');
      return;
    }

    try {
      setLoading(true);
      setError('');

      if (isEditing) {
        await notesApi.updateNote(token, id, title, content);
      } else {
        await notesApi.createNote(token, title, content);
      }

      setSaved(true);
      setToast({ message: isEditing ? 'Note updated successfully!' : 'Note saved successfully!', type: 'success' });
      const timer = setTimeout(() => navigate('/dashboard'), 1500);
      return () => clearTimeout(timer);
    } catch (err) {
      setError(err.message || 'Failed to save note');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div style={styles.page}>
      <Sidebar totalNotes={totalNotes} />
      <div style={styles.main}>
        <div style={styles.editorContainer}>
          <input
            type="text"
            placeholder="Note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.titleInput}
          />
          <div ref={editorRef} style={styles.editor} />
          {error && <p style={styles.error}>{error}</p>}
          <div style={styles.actions}>
            <button
              style={styles.cancelBtn}
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </button>
            <button
              style={{
                ...styles.saveBtn,
                opacity: loading ? 0.8 : 1,
              }}
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? 'Saving...' : isEditing ? 'Update Note' : 'Save Note'}
            </button>
          </div>
        </div>
      </div>
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
    padding: '32px',
  },
  editorContainer: {
    backgroundColor: '#FFFCF7',
    borderRadius: '20px',
    padding: '28px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 4px 20px rgba(232, 117, 0, 0.08)',
  },
  titleInput: {
    width: '100%',
    fontSize: '26px',
    fontWeight: '700',
    fontFamily: 'Poppins, sans-serif',
    color: '#171717',
    border: 'none',
    backgroundColor: 'transparent',
    outline: 'none',
    marginBottom: '16px',
    padding: '0',
    borderBottom: '2px solid #E8D5B0',
    paddingBottom: '12px',
  },
  editor: {
    flex: 1,
    marginBottom: '16px',
  },
  error: {
    color: '#E53E3E',
    fontSize: '13px',
    margin: '8px 0',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '16px',
    paddingTop: '16px',
    borderTop: '1px solid #E8D5B0',
  },
  cancelBtn: {
    padding: '10px 24px',
    borderRadius: '10px',
    border: '2px solid #E87500',
    backgroundColor: 'transparent',
    color: '#E87500',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
  },
  saveBtn: {
    padding: '10px 24px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#E87500',
    color: '#FFFFFF',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
  },

  
};

export default NoteEditorPage;