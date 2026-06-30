import React, { useState } from 'react';

interface RegisterPageProps {
  onRegister: (email: string) => void;
  onNavigateToLogin: () => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({
  onRegister,
  onNavigateToLogin,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!agreeToTerms) {
      setError('Please accept the terms to continue.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      localStorage.setItem('job_tracker_profile', JSON.stringify({
        name: name.trim(),
        email: email.trim(),
      }));
      setIsLoading(false);
      onRegister(email.trim());
    }, 600);
  };

  return (
    <div className="login-wrapper">
      <div className="card login-card register-card">
        <div className="login-header">
          <div className="login-logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 20a6 6 0 0 0-12 0M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm6-1v6m3-3h-6" />
            </svg>
          </div>
          <h1 className="login-title">Create Account</h1>
          <p className="login-subtitle">
            Start tracking applications<br />with a fresh workspace
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <div className="form-alert">{error}</div>}

          <div className="form-group">
            <label className="form-label" htmlFor="register-name">Full Name</label>
            <div className="input-with-icon-wrapper">
              <span className="input-icon-left">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7Z" />
                </svg>
              </span>
              <input
                id="register-name"
                type="text"
                className="form-control input-with-icon-left"
                placeholder="Your name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="register-email">Email</label>
            <div className="input-with-icon-wrapper">
              <span className="input-icon-left">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z" />
                </svg>
              </span>
              <input
                id="register-email"
                type="email"
                className="form-control input-with-icon-left"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="register-password">Password</label>
            <div className="input-with-icon-wrapper">
              <span className="input-icon-left">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2Zm10-10V7a4 4 0 0 0-8 0v4h8Z" />
                </svg>
              </span>
              <input
                id="register-password"
                type="password"
                className="form-control input-with-icon-left"
                placeholder="******"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="confirm-password">Confirm Password</label>
            <div className="input-with-icon-wrapper">
              <span className="input-icon-left">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4m5 2a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />
                </svg>
              </span>
              <input
                id="confirm-password"
                type="password"
                className="form-control input-with-icon-left"
                placeholder="******"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </div>
          </div>

          <label className="remember-me-label register-terms">
            <input
              type="checkbox"
              checked={agreeToTerms}
              onChange={(event) => setAgreeToTerms(event.target.checked)}
            />
            <span>I agree to create a local tracker account</span>
          </label>

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="login-footer">
          Already have an account?{' '}
          <button type="button" className="link-button" onClick={onNavigateToLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
