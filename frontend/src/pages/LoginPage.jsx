import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/auth/AuthLayout';
import AuthHeader from '../components/auth/AuthHeader';
import AuthFooter from '../components/auth/AuthFooter';
import InputField from '../components/auth/InputField';
import PrimaryButton from '../components/auth/PrimaryButton';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthHeader
        heading="Welcome back"
        subtitle="Sign in to continue to your account"
      />
      {error && <p style={styles.error}>{error}</p>}
      <InputField
        label="Email address"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon="✉️"
      />
      <InputField
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon="🔒"
      />
      <PrimaryButton
        text="Sign In"
        onClick={handleLogin}
        loading={loading}
      />
      <AuthFooter
        text="Don't have an account?"
        linkText="Sign up"
        linkTo="/signup"
      />
    </AuthLayout>
  );
};

const styles = {
  error: {
    color: '#C95F00',
    fontSize: '14px',
    marginBottom: '12px',
    textAlign: 'center',
    backgroundColor: '#FFE8CC',
    padding: '10px',
    borderRadius: '8px',
  },
};

export default LoginPage;