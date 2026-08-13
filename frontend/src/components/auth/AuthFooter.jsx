import { Link } from 'react-router-dom';

const AuthFooter = ({ text, linkText, linkTo }) => {
  return (
    <p style={styles.wrapper}>
      {text}{' '}
      <Link to={linkTo} style={styles.link}>
        {linkText}
      </Link>
    </p>
  );
};

const styles = {
  wrapper: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '14px',
    color: '#666666',
  },
  link: {
    color: '#E87500',
    fontWeight: '500',
  },
};

export default AuthFooter;