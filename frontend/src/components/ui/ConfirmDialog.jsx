const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        <h3 style={styles.title}>Delete Note</h3>
        <p style={styles.message}>{message}</p>
        <div style={styles.actions}>
          <button style={styles.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
          <button style={styles.confirmBtn} onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  dialog: {
    backgroundColor: '#FFFCF7',
    borderRadius: '16px',
    padding: '28px',
    width: '360px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
  },
  title: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#171717',
    marginBottom: '12px',
    fontFamily: 'Poppins, sans-serif',
  },
  message: {
    fontSize: '14px',
    color: '#666666',
    marginBottom: '24px',
    fontFamily: 'Poppins, sans-serif',
    lineHeight: '1.6',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
  },
  cancelBtn: {
    padding: '10px 20px',
    borderRadius: '8px',
    border: '2px solid #E8D5B0',
    backgroundColor: 'transparent',
    color: '#666666',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
  },
  confirmBtn: {
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#E53E3E',
    color: '#FFFFFF',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
  },
};

export default ConfirmDialog;