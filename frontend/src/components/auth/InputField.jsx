import { useState } from 'react';

const InputField = ({ label, type = 'text', placeholder, value, onChange, icon, id }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputId = id || label.toLowerCase().replace(/\s/g, '-');

  return (
    <div style={styles.wrapper}>
      <label htmlFor={inputId} style={styles.label}>{label}</label>
      <div style={styles.inputContainer}>
        <span style={styles.icon}>{icon}</span>
        <input
          id={inputId}
          type={isPassword && showPassword ? 'text' : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={styles.input}
        />
        {isPassword && (
          <button
            type="button"
            style={styles.eyeButton}
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        )}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    marginBottom: '16px',
    width: '100%',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '6px',
    color: '#171717',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    border: '1.5px solid #E8D5B0',
    borderRadius: '12px',
    padding: '10px 14px',
    backgroundColor: '#FFFCF7',
    gap: '10px',
  },
  icon: {
    fontSize: '16px',
    color: '#8A8A8A',
  },
  input: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '15px',
    backgroundColor: 'transparent',
    color: '#171717',
  },
  eyeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '0',
  },
};

export default InputField;