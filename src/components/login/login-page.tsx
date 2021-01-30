import React, { useState } from "react";
import { onLogin } from "./auth.api";
import "../../styles/logins/login.css";

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
    <form className = "form1" onSubmit={login}>
      <label htmlFor="email">Username</label>
      <input
        placeholder="Username"
        value={email}
        onChange={(event) =>
          setCredentials({
            email: event.target.value,
            password,
          })
        }
      />
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
      <button type="submit">Login</button>
    </form>
  );
}
