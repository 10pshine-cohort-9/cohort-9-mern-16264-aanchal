import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthHeader from '../../components/auth/AuthHeader';

describe('AuthHeader', () => {
  it('should render HaBitNote logo text', () => {
    render(<AuthHeader heading="Welcome back" subtitle="Sign in to continue" />);
    expect(screen.getByText('HaBit')).toBeInTheDocument();
    expect(screen.getByText('Note')).toBeInTheDocument();
  });

  it('should render the heading correctly', () => {
    render(<AuthHeader heading="Welcome back" subtitle="Sign in to continue" />);
    expect(screen.getByText('Welcome back')).toBeInTheDocument();
  });

  it('should render the subtitle correctly', () => {
    render(<AuthHeader heading="Welcome back" subtitle="Sign in to continue" />);
    expect(screen.getByText('Sign in to continue')).toBeInTheDocument();
  });

  it('should render tagline text', () => {
    render(<AuthHeader heading="Welcome back" subtitle="Sign in to continue" />);
    expect(screen.getByText(/Capture ideas/i)).toBeInTheDocument();
  });
});