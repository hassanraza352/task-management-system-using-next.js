"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Login() {
const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    setError("");

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


      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Login successful
      router.push("/dashboard")
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        {/* Left visual panel */}
        <div className="auth-visual">
          <div className="auth-logo-icon">🌶️</div>

          <h2>Welcome back!</h2>

          <p>
            Sign in to continue managing your tasks.
          </p>

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

        {/* Right form panel */}
        <div className="auth-form-side">

          <h1>Sign in to your account</h1>

          <p className="auth-sub">
            New here?{" "}
            <Link href="/register">
              Create an account
            </Link>
          </p>

          <form
            onSubmit={handleLogin}
            className="auth-form"
          >

            <div className="form-group">
              <label htmlFor="email">
                Email
              </label>

              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                disabled={isLoading}
              />
            </div>

            <div className="form-group">

              <div className="label-row">

                <label htmlFor="password">
                  Password
                </label>

                <Link
                  href="#"
                  className="forgot-link"
                >
                  Forgot password?
                </Link>

              </div>

              <div className="password-field">

                <input
                 type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  disabled={isLoading}
                />

                <button
                  type="button"
                  className="eye-btn"
                  disabled={isLoading}
               onClick={() => setShowPassword(!showPassword)}
                >
                  👁️
                </button>

              </div>
            </div>

            {/* Error message */}
            {error && (
              <p className="auth-error">
                {error}
              </p>
            )}

            {/* Login button */}
            <button
              type="submit"
              className="btn btn-primary auth-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="login-spinner"></span>
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>

          </form>

          <div className="or-divider">
            or continue with
          </div>

         <button
  type="button"
  className="btn-google"
  disabled={isLoading}
  onClick={() => {
    window.location.href = "/api/auth/google";
  }}
>
  <span className="google-g">G</span>
  Sign in with Google
</button>

        </div>

      </div>
    </div>
  );
}

export default Login;
