import { useState } from 'react';

const PrimaryButton = ({ text, onClick, loading }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={loading}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...styles.button,
        backgroundColor: loading ? '#C95F00' : hovered ? '#C95F00' : '#E87500',
        transform: hovered && !loading ? 'translateY(-2px)' : 'translateY(0px)',
        boxShadow: hovered && !loading
          ? '0 8px 20px rgba(232, 117, 0, 0.4)'
          : '0 4px 12px rgba(232, 117, 0, 0.2)',
        opacity: loading ? 0.8 : 1,
      }}
    >
      {loading ? 'Please wait...' : text}
    </button>
  );
};

const styles = {
  button: {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    border: 'none',
    color: '#FFFFFF',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '8px',
    transition: 'all 0.2s ease',
  },
};

export default PrimaryButton;