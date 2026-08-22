import { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const borderColor = type === 'success' ? '#E87500' : '#E53E3E';

  return (
    <div style={styles.toast}>
      <div style={{ ...styles.leftBorder, backgroundColor: borderColor }} />
      <div style={styles.content}>
        <p style={styles.message}>{message}</p>
      </div>
      <button style={styles.closeBtn} onClick={onClose}>✕</button>
    </div>
  );
};

const styles = {
  toast: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    backgroundColor: '#FFFCF7',
    borderRadius: '12px',
    border: '1px solid #EADCC8',
    boxShadow: '0 4px 20px rgba(232, 117, 0, 0.12)',
    display: 'flex',
    alignItems: 'center',
    minWidth: '280px',
    maxWidth: '360px',
    zIndex: 1000,
    overflow: 'hidden',
  },
  leftBorder: {
    width: '4px',
    alignSelf: 'stretch',
    flexShrink: 0,
  },
  content: {
    flex: 1,
    padding: '14px 16px',
  },
  message: {
    fontSize: '14px',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '500',
    color: '#171717',
    margin: 0,
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: '#8A8A8A',
    cursor: 'pointer',
    fontSize: '13px',
    padding: '14px 16px',
    flexShrink: 0,
  },
};

export default Toast;