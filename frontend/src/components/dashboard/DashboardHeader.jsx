import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardHeader = ({ totalNotes }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      navigate('/login', { replace: true });
    }
  };

  return (
    <div style={styles.header}>
      <div style={styles.userInfo}>
        <div style={styles.avatar}>
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <p style={styles.userName}>{user?.name}</p>
          <p style={styles.userEmail}>{user?.email}</p>
        </div>
      </div>
      <button
        style={styles.logoutBtn}
        onClick={handleLogout}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#FFF0D6'}
onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        → Logout
      </button>
    </div>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '16px',
    padding: '16px 32px',
    backgroundColor: '#FFFCF7',
    boxShadow: '0 2px 8px rgba(232, 117, 0, 0.08)',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#E87500',
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: '600',
  },
  userName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#171717',
    margin: 0,
  },
  userEmail: {
    fontSize: '12px',
    color: '#666666',
    margin: 0,
  },
  logoutBtn: {
    padding: '8px 20px',
    borderRadius: '8px',
    border: '2px solid #E87500',
    backgroundColor: 'transparent',
    color: '#E87500',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
};

export default DashboardHeader;