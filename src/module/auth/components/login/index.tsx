import React from 'react';
import { useNavigate } from 'react-router-dom';

import './index.scss';

type FormType = 'signIn' | 'signUp';
type AccountType = 'user' | 'selling' | 'affiliate';

const Login = () => {
  const navigate = useNavigate();
  const [formType, setFormType] = React.useState<FormType>('signIn');
  const [accountType, setAccountType] = React.useState<AccountType>('user');
  const [error, setError] = React.useState<string | null>(null);

  // Form state
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    username: '',
    confirmPassword: '',
    verificationCode: '123456', // Default for demo
    termsAccepted: false
  });

  // Add/remove body class
  React.useEffect(() => {
    document.body.classList.add('signin-signup');
    return () => document.body.classList.remove('signin-signup');
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formType === 'signUp') {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (!formData.termsAccepted) {
        setError('You must accept the Terms & Conditions');
        return;
      }
      alert(`Sign Up Successful!\nAccount Type: ${accountType}`);
    } else {
      alert(`Signed in with Email: ${formData.email}`);
    }
  };

  const handleGoogleAuth = () => {
    alert(`${formType === 'signIn' ? 'Sign in' : 'Sign up'} with Google clicked!`);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <button className="close-btn" onClick={() => navigate('/')}>&times;</button>

        <div className="auth-image">
          <h2>Welcome Back!</h2>
          <p>Join over 700+ categories</p>
          <p>Quality work done faster</p>
          <p>Access talent across the globe</p>
        </div>

        <div className="auth-form-container">
          <h2>{formType === 'signIn' ? 'Sign In' : 'Sign Up'}</h2>

          <div className="auth-toggle">
            <button
              onClick={() => setFormType('signIn')}
              className={formType === 'signIn' ? 'active' : ''}
            >
              Sign In
            </button>
            <button
              onClick={() => setFormType('signUp')}
              className={formType === 'signUp' ? 'active' : ''}
            >
              Sign Up
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            {formType === 'signIn' ? (
              <>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Email"
                />
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="Password"
                />
              </>
            ) : (
              <>
                <input
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  placeholder="Username"
                />
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Email"
                />
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="Password"
                />
                <input
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  placeholder="Re-enter Password"
                />

                <p className="label-text">Account Type:</p>
                <div className="radio-button-container">
                  {(['user', 'selling', 'affiliate'] as AccountType[]).map(type => (
                    <label key={type}>
                      <input
                        type="radio"
                        name="accountType"
                        checked={accountType === type}
                        onChange={() => setAccountType(type)}
                      />
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </label>
                  ))}
                </div>

                <label className="terms-label">
                  <input
                    name="termsAccepted"
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={handleInputChange}
                    required
                  />
                  I accept the <a href="#">Terms & Conditions</a>
                </label>

                <input
                  name="verificationCode"
                  type="text"
                  value={formData.verificationCode}
                  onChange={handleInputChange}
                  required
                  placeholder="Verification Code"
                />
              </>
            )}

            <button type="submit" className="submit-btn">
              {formType === 'signIn' ? 'Sign In' : 'Sign Up'}
            </button>
            <button
              type="button"
              onClick={handleGoogleAuth}
              className="google-btn"
            >
              {formType === 'signIn' ? 'Sign in' : 'Sign up'} with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
