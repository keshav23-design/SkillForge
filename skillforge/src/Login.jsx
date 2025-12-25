import React, { useState } from 'react';
import './App.css';

export default function Login({ onBack, onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes('@') || password.length < 4) {
      return alert('Please enter a valid email and password (min 4 chars).');
    }
    if (isRegister && password !== confirmPassword) {
      return alert('Passwords do not match.');
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(isRegister ? 'Account created successfully!' : 'Logged in as ' + email);
      if (onLoginSuccess) onLoginSuccess();
    }, 800);
  };

  return (
    <div className="fade-in" style={{ maxWidth: 520, margin: '0 auto', width: '100%' }}>
      <div className="salary-card" style={{ padding: 28 }}>
        <h2 style={{ marginBottom: 6 }}>{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
        <p className="hero-sub" style={{ marginBottom: 18 }}>
          {isRegister ? 'Sign up to access your dashboard and verified skills.' : 'Sign in to access your dashboard and verified skills.'}
        </p>

        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: 8, color: 'var(--text-muted)' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            style={{ width: '100%', marginBottom: 12, padding: '10px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.04)', background: 'transparent', color: 'var(--text-main)' }}
          />

          <label style={{ display: 'block', marginBottom: 8, color: 'var(--text-muted)' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            style={{ width: '100%', marginBottom: 12, padding: '10px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.04)', background: 'transparent', color: 'var(--text-main)' }}
          />

          {isRegister && (
            <>
              <label style={{ display: 'block', marginBottom: 8, color: 'var(--text-muted)' }}>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                style={{ width: '100%', marginBottom: 12, padding: '10px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.04)', background: 'transparent', color: 'var(--text-main)' }}
              />
            </>
          )}

          <div style={{ display: 'flex', gap: 20, marginTop: 8 }}>
            <button className="btn-main" type="submit" disabled={loading}>
              {loading ? (isRegister ? 'Creating...' : 'Signing in...') : (isRegister ? 'Create Account' : 'Sign In')}
            </button>
            <button type="button" className="option-btn" onClick={onBack} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.06)', color: 'var(--text-muted)' }}>
              Back
            </button>
          </div>
        </form>

        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            style={{
              background: 'transparent',
              border: '1px solid var(--primary)',
              color: 'var(--primary)',
              padding: '14px 16px',
              marginTop: '20px',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontSize: '0.9rem'
            }}
            onMouseEnter={(e) => {e.target.style.background = 'var(--primary)'; e.target.style.color = 'var(--bg-main)'}}
            onMouseLeave={(e) => e.target.style.background = 'transparent'}
          >
            {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Create one"}
          </button>
        </div>
      </div>
    </div>
  );
}
