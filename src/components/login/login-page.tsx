import React, { useState } from "react";
import "../../styles/logins/login.css";
import ForgotPassword from "./forgotPassword";
import SignUpButton from "./signUpButton";
import { signin } from "../../requestes/user-requestes/user";
import { APIsCaller } from "../../requestes/apis-caller";

export default function LoginPage() {
  const [{ email, password }, setCredentials] = useState({
    email: "",
    password: "",
  });

  const login = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await signin({
      email,
      password,
    });
    console.log(response);
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
        <br />
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
        <br />
        <button type="submit">Login</button>
        <br />
        <ForgotPassword />
        <br />
        <SignUpButton />
      </form>
    </div>
  );
}
