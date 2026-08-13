const DotGrid = () => {
  const dots = [];
  for (let i = 0; i < 25; i++) {
    dots.push(
      <div key={i} style={styles.dot} />
    );
  }
  return <div style={styles.dotGrid}>{dots}</div>;
};

const AuthLayout = ({ children }) => {
  return (
    <div style={styles.page}>
      <div style={styles.decorTopRight} />
      <div style={styles.decorBottomLeft} />
      <DotGrid />
      <div style={styles.card}>
        {children}
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#FFF0D6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
  },
  decorTopRight: {
    position: 'absolute',
    top: '-60px',
    right: '-60px',
    width: '220px',
    height: '220px',
    borderRadius: '50%',
    backgroundColor: '#FFB347',
    opacity: 0.3,
  },
  decorBottomLeft: {
    position: 'absolute',
    bottom: '-80px',
    left: '-80px',
    width: '280px',
    height: '280px',
    borderRadius: '50%',
    backgroundColor: '#FFA726',
    opacity: 0.2,
  },
  dotGrid: {
    position: 'absolute',
    top: '40px',
    left: '40px',
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '8px',
    opacity: 0.3,
  },
  dot: {
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    backgroundColor: '#E87500',
  },
  card: {
    backgroundColor: '#FFFCF7',
    borderRadius: '24px',
    padding: '40px 36px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 12px 48px rgba(232, 117, 0, 0.18), 0 4px 16px rgba(0, 0, 0, 0.08)',
    position: 'relative',
    zIndex: 1,
  },
};

export default AuthLayout;