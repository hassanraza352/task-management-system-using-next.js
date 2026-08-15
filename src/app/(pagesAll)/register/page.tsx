import React from 'react'

function Register() {
  return (
   <div className="auth-wrapper">
  <div className="auth-card">
{/* 
    <!-- Left visual panel --> */}
    <div className="auth-visual">
      <div className="auth-logo-icon">🌶️</div>
      <h2>Organize your tasks, boost your productivity.</h2>
      <p>Create an account to get started with managing your tasks efficiently.</p>

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
      </div>

      <div className="auth-wave-circle2"></div>
      <div className="auth-wave-circle"></div>
    </div>

    {/* <!-- Right form panel --> */}
    <div className="auth-form-side">
      <h1>Create your account</h1>
      <p className="auth-sub">Already have an account? <a href="login.html">Sign in</a></p>

      <form>
        <div className="form-group">
          <label htmlFor="fullname">Full Name</label>
          <input type="text" id="fullname" placeholder="Enter your full name"/>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email"/>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-field">
            <input type="password" id="password" placeholder="Create a password"/>
            <button type="button" className="eye-btn">👁️</button>
          </div>
        </div>

        <button type="submit" className="btn btn-primary auth-submit-btn">Sign up</button>
      </form>

      <div className="or-divider">or continue with</div>

      <button type="button" className="btn-google">
        <span className="google-g">G</span> Sign up with Google
      </button>

      <p className="auth-terms">By signing up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</p>
    </div>

  </div>
</div>
  )
}

export default Register
