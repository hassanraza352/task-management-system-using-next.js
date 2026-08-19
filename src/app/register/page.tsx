'use client'
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";




function Register() {
  const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const router = useRouter();

// const [loading, setLoading] = useState(false);
// const [message, setMessage] = useState("");
// const [error, setError] = useState("");



const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();

    console.log(data);
router.push("/login")

  } catch (error) {
    console.error("Register error:", error);
  }
};
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
      <p className="auth-sub">Already have an account? <Link   href="/login">Sign in</Link>  </p>

      <form onSubmit={handleRegister} method="POST">
        <div className="form-group">
          <label htmlFor="fullname">Full Name</label>
          <input type="text" id="fullname" placeholder="Enter your full name" value={name}
  onChange={(e) => setName(e.target.value)}
  required
/>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-field">
            <input type="password" id="password" placeholder="Create a password" value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
/>
            <button type="button" className="eye-btn">👁️</button>
          </div>
        </div>

        <button type="submit" className="btn btn-primary auth-submit-btn">Sign up</button>
      </form>

      <div className="or-divider">or continue with</div>

      <button type="button" className="btn-google">
        <span className="google-g">G</span> Sign up with Google
      </button>

      <p className="auth-terms">By signing up, you agree to our <Link   href="#">Terms of Service</Link>   and <Link   href="#">Privacy Policy</Link>  .</p>
    </div>

  </div>
</div>
  )
}

export default Register
