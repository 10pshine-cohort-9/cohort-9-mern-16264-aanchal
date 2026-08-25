import logo from '../../assets/logo.png';

const LeafIllustration = () => (
  <svg width="90" height="100" viewBox="0 0 90 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M45 95 C45 70, 45 45, 45 15" stroke="#E87500" strokeWidth="2" strokeLinecap="round"/>
    <path d="M45 75 C35 68, 20 65, 15 55 C25 52, 38 58, 45 75Z" fill="#FFB347" opacity="0.8"/>
    <path d="M45 55 C32 48, 18 42, 15 30 C28 28, 40 38, 45 55Z" fill="#E87500" opacity="0.7"/>
    <path d="M45 35 C35 28, 22 22, 20 12 C32 10, 42 22, 45 35Z" fill="#FFB347" opacity="0.6"/>
    <path d="M45 65 C55 58, 70 55, 75 45 C65 42, 52 48, 45 65Z" fill="#E87500" opacity="0.7"/>
    <path d="M45 45 C58 38, 72 32, 75 20 C62 18, 50 28, 45 45Z" fill="#FFB347" opacity="0.8"/>
    <path d="M45 25 C55 18, 68 12, 70 2 C58 0, 48 12, 45 25Z" fill="#E87500" opacity="0.6"/>
    <path d="M45 75 C35 68, 20 65, 15 55" stroke="#C95F00" strokeWidth="0.8" opacity="0.4"/>
    <path d="M45 55 C32 48, 18 42, 15 30" stroke="#C95F00" strokeWidth="0.8" opacity="0.4"/>
    <path d="M45 65 C55 58, 70 55, 75 45" stroke="#C95F00" strokeWidth="0.8" opacity="0.4"/>
    <path d="M45 45 C58 38, 72 32, 75 20" stroke="#C95F00" strokeWidth="0.8" opacity="0.4"/>
  </svg>
);

const Sidebar = ({ totalNotes }) => {
  return (
    <div style={styles.sidebar}>
      <div style={styles.logoContainer}>
        <img src={logo} alt="HaBitNote logo" style={styles.logoImage} />
        <div style={styles.logoText}>
          <span style={styles.logoBlack}>HaBit</span>
          <span style={styles.logoOrange}>Note</span>
        </div>
      </div>

      <div style={styles.navItem}>
        <span style={styles.navIcon}>📋</span>
        <span style={styles.navText}>All Notes</span>
      </div>

      <div style={styles.quoteCard}>
        <span style={styles.quoteMark}>"</span>
        <p style={styles.quoteText}>
          Small notes.<br /><br />
          Big progress.<br /><br />
          Build habits.<br /><br />
          Capture life.
        </p>
        <div style={styles.leafWrapper}>
          <LeafIllustration />
        </div>
      </div>

      <div style={styles.totalCard}>
        <div style={styles.totalLeft}>
          <div>
            <p style={styles.totalLabel}>Total Notes</p>
            <p style={styles.totalSubtext}>Keep writing, keep growing.</p>
          </div>
        </div>
        <span style={styles.totalCount}>{totalNotes}</span>
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '220px',
    minHeight: '100vh',
    backgroundColor: '#FFFCF7',
    padding: '24px 16px',
    boxShadow: '2px 0 8px rgba(232, 117, 0, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    flexShrink: 0,
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoImage: {
    width: '36px',
    height: '36px',
    objectFit: 'contain',
  },
  logoText: {
    fontSize: '22px',
    fontWeight: '700',
  },
  logoBlack: {
    color: '#171717',
  },
  logoOrange: {
    color: '#E87500',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 14px',
    borderRadius: '10px',
    backgroundColor: '#FFF0D6',
    border: '1px solid #FFB347',
    cursor: 'pointer',
  },
  navIcon: {
    fontSize: '16px',
  },
  navText: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#E87500',
  },
  quoteCard: {
    backgroundColor: '#FFF0D6',
    borderRadius: '16px',
    padding: '20px 16px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
  },
  quoteMark: {
    fontSize: '52px',
    fontFamily: 'Poppins, sans-serif',
    color: '#E87500',
    lineHeight: '1',
    fontWeight: '700',
    marginBottom: '8px',
  },
  quoteText: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '15px',
    fontWeight: '500',
    color: '#333333',
    lineHeight: '1.6',
    margin: 0,
    flex: 1,
    zIndex: 1,
  },
  leafWrapper: {
    position: 'absolute',
    bottom: '-10px',
    right: '-10px',
    opacity: 0.7,
  },
  totalCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 14px',
    backgroundColor: '#FFF0D6',
    borderRadius: '12px',
  },
  totalLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  totalLabel: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#171717',
    margin: 0,
  },
  totalSubtext: {
    fontSize: '11px',
    color: '#8A8A8A',
    margin: 0,
  },
  totalCount: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#E87500',
  },
};

export default Sidebar;