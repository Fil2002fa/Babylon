"use client";

import React from "react";
import { useState } from "react";
import { useAuth } from "@/src/auth";
import { updateProfile } from "firebase/auth";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const { signIn, signUp, user } = useAuth();
  const [error, setError] = useState(null);

  const handleSwitch = () => {
    setIsSignUp((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password ) {
      setError("Please fill in all required fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    setError(null);

    try {
      if (isSignUp) {
        const newUser = await signUp(email, password);
        await updateProfile(newUser, { displayName: name });
      } else {
        await signIn(email, password);
      }
      
    } catch (err) {
      setError(err.message); 
    }
  };


  return (
    <main className="auth">
      <h1 className="auth__title">{isSignUp ? "Create an Account" : "Welcome back"}</h1>

      {error && <p className="auth__error">{error}</p>}

      <form className="auth__form" onSubmit={handleSubmit}>
        {isSignUp && (
          <>
            <label className="auth__label" htmlFor="name">Name</label>
            <input
              id="name"
              className="auth__input"
              type="text"
              placeholder="Filippo Loro"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </>
        )}
        <label className="auth__label" htmlFor="email">Email</label>
        <input
          id="email"
          className="auth__input"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="auth__label" htmlFor="password">Password</label>
        <input
          id="password"
          className="auth__input"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          minLength={6}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="auth__button auth__button--primary">
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </form>

      <button
        type="button"
        className="auth__button auth__button--link"
        onClick={handleSwitch}
      >
        {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
      </button>
    </main>
  );
}