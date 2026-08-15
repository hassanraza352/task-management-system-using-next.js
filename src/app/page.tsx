

export default function Home() {
  return (
     <div className="landing-wrapper">
  <div className="landing-bg-blob b1"></div>
  <div className="landing-bg-blob b2"></div>

  {/* <!-- Navbar --> */}
  <div className="landing-navbar">
    <div className="sidebar-logo" style={{ color: "var(--text-dark)" }}>
      <span className="logo-icon">🌶️</span>
      Chili Spice
    </div>
    <a href="login.html" className="landing-nav-link"><span>Already have an account?</span> Login</a>
  </div>

  {/* <!-- Hero --> */}
  <div className="landing-hero">

    <div className="landing-text">
      <span className="landing-eyebrow">✨ Simple. Fast. Organized.</span>
      <h1>Welcome to our <span>Task Management</span> System</h1>
      <p>Plan your day, track every task, and hit your deadlines without the chaos. Chili Spice keeps your work organized so you can focus on what actually matters.</p>

      <div className="hero-btn-group">
        <a href="register.html" className="btn-hero btn-hero-primary">🚀 Get Started — It&#39;s Free</a>
        <a href="login.html" className="btn-hero btn-hero-secondary">Login to your account</a>
      </div>

      <div className="landing-feature-strip">
        <div className="landing-feature-item"><span className="lf-icon">✅</span> Track Tasks</div>
        <div className="landing-feature-item"><span className="lf-icon">📅</span> Plan Ahead</div>
        <div className="landing-feature-item"><span className="lf-icon">📊</span> See Progress</div>
      </div>
    </div>

    {/* <!-- 3D animated visual --> */}
    <div className="landing-visual">
      <div className="hero-glow"></div>
      <div className="hero-ring"></div>

      <div className="hero-card-stack">
        <div className="hero-card card-1">
          <div className="hc-title">Today&#39;s Tasks</div>
          <div className="hc-row"><span className="hc-check c-red"></span><span className="hc-line"></span></div>
          <div className="hc-row"><span className="hc-check c-orange"></span><span className="hc-line"></span></div>
          <div className="hc-row"><span className="hc-check c-green"></span><span className="hc-line"></span></div>
        </div>

        <div className="hero-card card-2">
          <div className="hc-title">In Progress</div>
          <div className="hc-row"><span className="hc-check c-orange"></span><span className="hc-line"></span></div>
          <div className="hc-row"><span className="hc-check c-orange"></span><span className="hc-line"></span></div>
        </div>

        <div className="hero-card card-3">
          <div className="hc-title">Completed</div>
          <div className="hc-row"><span className="hc-check c-green"></span><span className="hc-line"></span></div>
          <div className="hc-row"><span className="hc-check c-green"></span><span className="hc-line"></span></div>
        </div>
      </div>

      <div className="floating-badge fb-1">🔔</div>
      <div className="floating-badge fb-2">📈</div>
      <div className="floating-badge fb-3">✅</div>
    </div>

  </div>
</div>

  );
}
