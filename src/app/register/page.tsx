"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setIsLoading(true);
    setError("");

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

      if (!response.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      // Registration successful
      router.push("/login");

    } catch (error) {
      console.error("Register error:", error);
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

          <div className="auth-logo-icon">
            🌶️
          </div>

          <h2>
            Organize your tasks, boost your productivity.
          </h2>

          <p>
            Create an account to get started with
            managing your tasks efficiently.
          </p>

          <div className="task-illustration">

            <div className="illustration-row">
              <span className="illustration-check">
                ✓
              </span>

              <span className="illustration-line"></span>
            </div>

            <div className="illustration-row">
              <span className="illustration-check">
                ✓
              </span>

              <span className="illustration-line"></span>
            </div>

            <div className="illustration-row">
              <span className="illustration-check">
                ✓
              </span>

              <span className="illustration-line"></span>
            </div>

          </div>

          <div className="auth-wave-circle2"></div>
          <div className="auth-wave-circle"></div>

        </div>

        {/* Right form panel */}
        <div className="auth-form-side">

          <h1>
            Create your account
          </h1>

          <p className="auth-sub">
            Already have an account?{" "}
            <Link href="/login">
              Sign in
            </Link>
          </p>

          <form
            onSubmit={handleRegister}
            className="auth-form"
          >

            {/* Name */}
            <div className="form-group">

              <label htmlFor="fullname">
                Full Name
              </label>

              <input
                type="text"
                id="fullname"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
                disabled={isLoading}
              />

            </div>

            {/* Email */}
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
                required
                disabled={isLoading}
              />

            </div>

            {/* Password */}
            <div className="form-group">

              <label htmlFor="password">
                Password
              </label>

              <div className="password-field">

                <input
                  type="password"
                  id="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                  disabled={isLoading}
                />

                <button
                  type="button"
                  className="eye-btn"
                  disabled={isLoading}
                >
                  👁️
                </button>

              </div>

            </div>

            {/* Error */}
            {error && (
              <p className="auth-error">
                {error}
              </p>
            )}

            {/* Register button */}
            <button
              type="submit"
              className="btn btn-primary auth-submit-btn"
              disabled={isLoading}
            >

              {isLoading ? (
                <>
                  <span className="login-spinner"></span>
                  Creating account...
                </>
              ) : (
                "Sign up"
              )}

            </button>

          </form>

          <div className="or-divider">
            or continue with
          </div>

          {/* Google */}
          <button
            type="button"
            className="btn-google"
            disabled={isLoading}
          >
            <span className="google-g">
              G
            </span>

            Sign up with Google
          </button>

          <p className="auth-terms">
            By signing up, you agree to our{" "}
            <Link href="#">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#">
              Privacy Policy
            </Link>
            .
          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;