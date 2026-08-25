const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <div style={styles.wrapper}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8A8A8A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        style={styles.input}
      />
      {searchTerm && (
        <button style={styles.clearBtn} onClick={() => onSearch('')}>
          ✕
        </button>
      )}
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: '50px',
    padding: '10px 18px',
    gap: '10px',
    width: '260px',
    border: '1px solid #EADCC8',
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  },
  input: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '13px',
    fontFamily: 'Poppins, sans-serif',
    backgroundColor: 'transparent',
    color: '#171717',
  },
  clearBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '12px',
    color: '#8A8A8A',
    padding: '0',
  },
};

export default SearchBar;