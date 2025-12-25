import React from 'react';
import './App.css';

export default function How() {
  return (
    <section className="how-section container">
      <div className="how-card">
        <h2>How SkillForge Works</h2>

        <p className="how-lead">SkillForge transforms your real-world code contributions into verifiable professional credentials.</p>

        <div className="how-content">
          <div>
            <h3>What we do</h3>
            <ul className="how-list">
              <li><strong>Deep Code Analysis:</strong> We analyze repository structure, dependency usage, design patterns and test coverage to produce an objective skill profile.</li>
              <li><strong>Active Defense Verification:</strong> To ensure the claimant is the real author, we prompt brief, context-aware technical checks during verification.</li>
              <li><strong>Immutable Badges:</strong> Verified results can be minted as blockchain-backed badges for easy sharing with employers.</li>
            </ul>
          </div>

          <div>
            <h3>How to use</h3>
            <ol className="how-steps">
              <li><strong>Paste&nbsp;your repository URL</strong> on the home page and click <em>Verify Skill</em>.</li>
              <li><strong>Wait for the analysis</strong> — we inspect architecture, code quality and complexity.</li>
              <li><strong>Respond to a short verification prompt</strong> (Active Defense) to confirm ownership.</li>
              <li><strong>Receive your badge</strong> and review the detailed report; optionally mint a blockchain-backed credential.</li>
            </ol>
          </div>
        </div>

        <h3>Privacy & Security</h3>
        <p>We only analyze the code you submit and never store private credentials. Blockchain minting is optional and uses a public policy you approve before issuance.</p>

        <h3>How we provide value</h3>
        <p>Employers receive a concise, evidence-backed summary of your coding ability that goes beyond CV claims — saving time and reducing hiring risk. Developers gain a portable credential tied to their actual contributions.</p>

        <div style={{ marginTop: 18 }}>
          <button className="btn-main" onClick={() => window.location.href = '/'}>Back to Home</button>
        </div>
      </div>
    </section>
  );
}
