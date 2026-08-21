'use client'

import React from 'react'
import Link from "next/link";
import { useRouter } from 'next/navigation';
import {useState} from 'react'

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });


    const data = await response.json();

    console.log("data is hereeeeee",data);

    if (response.ok) {
      window.location.href = "/dashboard";
    }

  } catch (error) {
    console.error("Login error:", error);
  }
};


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
      <p className="auth-sub">New here? <Link   href="/register">Create an account</Link>  </p>

       <form onSubmit={handleLogin} method="POST" className="auth-form"> 
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" value={email}   onChange={(e) => setEmail(e.target.value)}/>
        </div>

        <div className="form-group">
          <div className="label-row">
            <label htmlFor="password">Password</label>
            <Link   href="#" className="forgot-link">Forgot password?</Link>  
          </div>
          <div className="password-field">
            <input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <button type="button" className="eye-btn">👁️</button>
          </div>
        </div>

        <button className="btn btn-primary auth-submit-btn">Sign in</button>
       </form> 

      <div className="or-divider">or continue with</div>

    <button
  type="button"
  className="btn-google"
  onClick={() => {
    window.location.href = "/api/auth/google";
  }}
>
  <span className="google-g">G</span> Sign in with Google
</button>
    </div>

  </div>
</div>
  )
}

export default Login
