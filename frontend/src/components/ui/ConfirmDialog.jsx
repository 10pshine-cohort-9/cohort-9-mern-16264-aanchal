import { useEffect, useRef } from 'react';

const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
  const cancelBtnRef = useRef(null);

  useEffect(() => {
    cancelBtnRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onCancel();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  return (
    <div
      style={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-message"
    >
      <div style={styles.dialog}>
        <h3 id="dialog-title" style={styles.title}>Delete Note</h3>
        <p id="dialog-message" style={styles.message}>{message}</p>
        <div style={styles.actions}>
          <button
            ref={cancelBtnRef}
            style={styles.cancelBtn}
            onClick={onCancel}
          >
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