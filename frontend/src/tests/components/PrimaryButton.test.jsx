import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PrimaryButton from '../../components/auth/PrimaryButton';

describe('PrimaryButton', () => {
  it('should render button with correct text', () => {
    render(<PrimaryButton text="Sign In" />);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<PrimaryButton text="Sign In" onClick={handleClick} />);
    fireEvent.click(screen.getByText('Sign In'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should show loading text when loading is true', () => {
    render(<PrimaryButton text="Sign In" loading={true} />);
    expect(screen.getByText('Please wait...')).toBeInTheDocument();
  });

  it('should be disabled when loading is true', () => {
    render(<PrimaryButton text="Sign In" loading={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should not be disabled when loading is false', () => {
    render(<PrimaryButton text="Sign In" loading={false} />);
    expect(screen.getByRole('button')).not.toBeDisabled();
  });
});