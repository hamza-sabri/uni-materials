import React, { useState } from "react";
import { onLogin } from "./auth.api";
import "../../styles/logins/login.css";
import ForgotPassword from "./forgotPassword";
import SignUpButton from "./signUpButton";

export default function LoginPage() {
  const [{ email, password }, setCredentials] = useState({
    email: "",
    password: "",
  });

  const login = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await onLogin({
      email,
      password,
    });
  };

  return (
    <div className="login-page">
      <form className="form1" onSubmit={login}>
        <label htmlFor="email">Email</label>
        <input
          placeholder="Email"
          value={email}
          onChange={(event) =>
            setCredentials({
              email: event.target.value,
              password,
            })
          }
        />
        <br/>
        <label htmlFor="password">Password</label>
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(event) =>
            setCredentials({
              email,
              password: event.target.value,
            })
          }
        />
        <br/>
        <button type="submit">Login</button>
        <br/>
        <ForgotPassword />
        <br/>
        <SignUpButton />
       
      </form>
    </div>
    
  );
}
