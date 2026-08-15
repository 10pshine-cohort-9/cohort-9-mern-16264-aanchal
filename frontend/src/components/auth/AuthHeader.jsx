import logo from '../../assets/logo.png';

const AuthHeader = ({ heading, subtitle }) => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.logoContainer}>
        <img src={logo} alt="HaBitNote logo" style={styles.logoImage} />
        <div style={styles.logoText}>
          <span style={styles.logoBlack}>HaBit</span>
          <span style={styles.logoOrange}>Note</span>
        </div>
      </div>
      <p style={styles.tagline}>
        Capture ideas. Organize thoughts.
        <br />
        Stay productive.
      </p>
      <h2 style={styles.heading}>{heading}</h2>
      <p style={styles.subtitle}>{subtitle}</p>
    </div>
  );
};

const styles = {
  wrapper: {
    textAlign: 'center',
    marginBottom: '28px',
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '8px',
  },
  logoImage: {
    width: '60px',
    height: '60px',
    objectFit: 'contain',
    marginBottom: '6px',
  },
  logoText: {
    fontSize: '32px',
    fontWeight: '700',
  },
  logoBlack: {
    color: '#171717',
  },
  logoOrange: {
    color: '#E87500',
  },
  tagline: {
    fontSize: '13px',
    color: '#666666',
    marginBottom: '20px',
    lineHeight: '1.6',
  },
  heading: {
    fontSize: '26px',
    fontWeight: '600',
    color: '#171717',
    marginBottom: '6px',
  },
  subtitle: {
    fontSize: '15px',
    color: '#666666',
  },
};

export default AuthHeader;