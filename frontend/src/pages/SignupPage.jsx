import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/auth/AuthLayout';
import AuthHeader from '../components/auth/AuthHeader';
import AuthFooter from '../components/auth/AuthFooter';
import InputField from '../components/auth/InputField';
import PrimaryButton from '../components/auth/PrimaryButton';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    try {
      setLoading(true);
      await signup(name, email, password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
  setError(err.message || 'Signup failed. Please try again.');
} finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthHeader
        heading="Create your account"
        subtitle="Start organizing your thoughts today"
      />
      {error && <p style={styles.error}>{error}</p>}
      <InputField
        label="Full Name"
        type="text"
        placeholder="Enter your full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        icon="👤"
      />
      <InputField
        label="Email Address"
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
      <InputField
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        icon="🔒"
      />
      <PrimaryButton
        text="Create Account"
        onClick={handleSignup}
        loading={loading}
      />
      <AuthFooter
        text="Already have an account?"
        linkText="Sign in"
        linkTo="/login"
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

export default SignupPage;