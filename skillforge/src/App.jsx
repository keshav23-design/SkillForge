import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './Login';
import How from './How';

// --- SUB-COMPONENTS ---

const Navbar = ({ onLogin }) => (
  <header className="header">
    <div className="container nav-container">
      <div className="logo">SkillForge.io</div>
      <nav className="nav-links">
        <button className="nav-link-like" onClick={() => window.location.href = '/how'}>How it works</button>
        <button className="nav-link-like" onClick={() => window.location.href = '/employers'}>For Employers</button>
        <button className="btn-nav" onClick={onLogin}>Login</button>
      </nav>
    </div>
  </header>
);

const InputForm = ({ onVerify }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = () => {
    if (url.length < 5) return alert("Please enter a valid URL");
    onVerify(url);
  };

  return (
    <div className="fade-in">
      <div className="input-group">
        <span className="input-icon">🔗</span>
        <input 
          type="text" 
          placeholder="Paste GitHub Repo URL (e.g. github.com/user/project)" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className="btn-main" onClick={handleSubmit}>Verify Skill</button>
      </div>
      <p className="subtext">Supported: GitHub, GitLab, BitBucket, Hosted Web URLs.</p>
    </div>
  );
};

const AnalysisStatus = ({ progress }) => {
  return (
    <div className="status-container fade-in">
      <div className={`step ${progress >= 1 ? 'active completed' : ''}`}>
        <div className="step-icon">1</div> Fetching Repository Architecture... {progress >= 1 && '✅'}
      </div>
      <div className={`step ${progress >= 2 ? 'active completed' : ''}`}>
        <div className="step-icon">2</div> Analyzing Syntax & Design Patterns... {progress >= 2 && '✅'}
      </div>
      <div className={`step ${progress >= 3 ? 'active completed' : ''}`}>
        <div className="step-icon">3</div> Calculating Complexity Score... {progress >= 3 && '✅'}
      </div>
      
      <div className="loader">
        <div className="loader-bar" style={{ width: `${(progress / 3) * 100}%` }}></div>
      </div>
    </div>
  );
};

const ActiveDefenseModal = ({ onPass, onFail }) => (
  <div className="defense-modal fade-in">
    <div className="defense-card">
      <h3>⚠️ Active Defense Protocol</h3>
      <p className="defense-desc">
        To prevent credential forgery, answer this question about the <b>ReactJS</b> code detected in your repo.
      </p>
      <p className="question">"Which hook handles side effects in a functional component?"</p>
      
      <div className="defense-options">
        <button className="option-btn" onClick={onFail}>useState</button>
        <button className="option-btn" onClick={onPass}>useEffect</button>
        <button className="option-btn" onClick={onFail}>useContext</button>
        <button className="option-btn" onClick={onFail}>useReducer</button>
      </div>
    </div>
  </div>
);

const Certificate = ({ onReset }) => (
  <div className="certificate-view fade-in">
    <div className="badge-container">⚛️</div>
    <h2>ReactJS Architect: Level 4</h2>
    <p className="verified-text">Verified Owner: <b>Guest User</b></p>
    
    <div className="stats-grid">
      <div className="stat-box">
        <small>Code Quality</small>
        <div className="stat-value success">A+ (98%)</div>
      </div>
      <div className="stat-box">
        <small>Project Scale</small>
        <div className="stat-value primary">Production Ready</div>
      </div>
    </div>

    <div className="hash-display">
      HASH: 0x7f...3a29 (Verified on Polygon)
    </div>
    <br />
    <button className="btn-main" onClick={onReset}>Verify Another Project</button>
  </div>
);

// --- MAIN APP COMPONENT ---

function App() {
  const [view, setView] = useState('input'); // input, analyzing, defense, certificate
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const startVerification = () => {
    setView('analyzing');
    
    // Simulate AI Analysis Steps
    setTimeout(() => setAnalysisProgress(1), 1000);
    setTimeout(() => setAnalysisProgress(2), 2500);
    setTimeout(() => {
      setAnalysisProgress(3);
      // Trigger Unique Feature after analysis
      setTimeout(() => setView('defense'), 1500); 
    }, 4000);
  };

  

  const handleDefensePass = () => {
    setView('certificate');
  };

  const handleDefenseFail = () => {
    alert("Verification Failed: Incorrect Answer.");
    window.location.reload();
  };

  // Sync view with URL path (simple client-side routing)
  useEffect(() => {
    const applyPath = () => {
      const path = window.location.pathname;
      if (path === '/login') setView('login');
      else if (path === '/how') setView('how');
      else setView((v) => (v === 'analyzing' || v === 'defense' || v === 'certificate') ? v : 'input');
    };
    window.addEventListener('popstate', applyPath);
    applyPath();
    return () => window.removeEventListener('popstate', applyPath);
  }, []);

  // navigate helpers that update history
  const navigateTo = (path) => {
    if (window.location.pathname !== path) window.history.pushState({}, '', path);
    if (path === '/login') setView('login');
    else setView('input');
  };

  const handleLoginSuccess = () => {
    navigateTo('/');
  };

  const goToLogin = () => navigateTo('/login');

  return (
    <div className="App">
      <Navbar onLogin={goToLogin} onNavigate={navigateTo} />
      
      {view === 'login' ? (
        <section className="hero container">
          <Login onBack={() => navigateTo('/')} onLoginSuccess={handleLoginSuccess} />
        </section>
      ) : view === 'how' ? (
        <How />
      ) : (
        <section className="hero container">
        <h1>Turn Your Git Commits<br />Into Verified Credentials.</h1>
        <p className="hero-sub">
          Don't have a degree? No problem. Our AI audits your code, verifies your skills via Active Defense, and mints a blockchain-backed badge.
        </p>

        <div className="app-interface">
          {view === 'input' && <InputForm onVerify={startVerification} />}
          {view === 'analyzing' && <AnalysisStatus progress={analysisProgress} />}
          {view === 'defense' && <ActiveDefenseModal onPass={handleDefensePass} onFail={handleDefenseFail} />}
          {view === 'certificate' && <Certificate onReset={() => window.location.reload()} />}
        </div>
        </section>
      )}

      <section className="container features-section">
        <div className="grid-2">
          <div>
            <h3>Why Employers Trust Us</h3>
            <ul className="feature-list">
              <li>✅ <b>Deep Code Analysis:</b> We check for clean architecture, not just syntax.</li>
              <li>✅ <b>Active Defense:</b> The only platform that quizzes the user to prevent code theft.</li>
              <li>✅ <b>Immutable Ledger:</b> Every badge is minted on the blockchain.</li>
            </ul>
          </div>
          <div className="salary-card">
            <h4>Skill-to-Salary Calculator</h4>
            <div className="salary-row">
              <span>ReactJS (Verified)</span>
              <span className="text-success">$95,000/yr</span>
            </div>
            <div className="salary-row">
              <span>Full Stack (Projected)</span>
              <span className="text-primary">$120,000/yr</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;