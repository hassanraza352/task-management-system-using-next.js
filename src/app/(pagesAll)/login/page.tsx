import React from 'react'

function Login() {
  return (
   <div className="auth-wrapper">
  <div className="auth-card">

    {/* <!-- Left visual panel --> */}
    <div className="auth-visual">
      <div className="auth-logo-icon">🌶️</div>
      <h2>Welcome back!</h2>
      <p>Sign in to continue managing your tasks.</p>

      <div className="task-illustration">
        <div className="illustration-row">
          <span className="illustration-check">✓</span>
          <span className="illustration-line"></span>
        </div>
        <div className="illustration-row">
          <span className="illustration-check">✓</span>
          <span className="illustration-line"></span>
        </div>
        <div className="illustration-row">
          <span className="illustration-check">✓</span>
          <span className="illustration-line"></span>
        </div>
        <div className="illustration-badge">✓</div>
      </div>

      <div className="auth-wave-circle2"></div>
      <div className="auth-wave-circle"></div>
    </div>

    {/* <!-- Right form panel --> */}
    <div className="auth-form-side">
      <h1>Sign in to your account</h1>
      <p className="auth-sub">New here? <a href="register.html">Create an account</a></p>

      <form>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email"/>
        </div>

        <div className="form-group">
          <div className="label-row">
            <label htmlFor="password">Password</label>
            <a href="#" className="forgot-link">Forgot password?</a>
          </div>
          <div className="password-field">
            <input type="password" id="password" placeholder="Enter your password"/>
            <button type="button" className="eye-btn">👁️</button>
          </div>
        </div>

        <button type="submit" className="btn btn-primary auth-submit-btn">Sign in</button>
      </form>

      <div className="or-divider">or continue with</div>

      <button type="button" className="btn-google">
        <span className="google-g">G</span> Sign in with Google
      </button>
    </div>

  </div>
</div>
  )
}

export default Login
