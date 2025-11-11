
"use client";

import Image from "next/image";
import React from "react";
import { useState } from "react";


export default function Home() {

const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [isSingUp , setIsSingUp] = useState(false)

  const handleswich = () => {
      setIsSingUp((prev) => !prev )
  }

  return (
    <main className="auth">
      <h1 className="auth__title">Welcome to the app</h1>

      <form className="auth__form" >
        <label className="auth__label" htmlFor="email">Email</label>
          <input
            id="email"
            className="auth__input"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
            value={email}
           
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
          
          />

        <button type="submit" className="auth__button auth__button--primary">
          Sign up
        </button>
      </form>

      <button
        type="button"
        className="auth__button auth__button--link"
       
      >
        Already have an account?
      </button>
    </main>


  )}