import React, { useState } from "react";
import "../../styles/logins/login.css";
import ForgotPassword from "./forgotPassword";
import SignUpButton from "./signUpButton";
import { signin } from "../../requestes/user-requestes/user";
import { APIsCaller } from "../../requestes/apis-caller";
import icon from "../../icons/sign-in/sign-in.svg";

export default function LoginPage() {
  const [{ email, password }, setCredentials] = useState({
    email: "",
    password: "",
  });

  const login = async (event: React.FormEvent) => {
    const response = await signin({
      email,
      password,
    });
    console.log(response);
  };

  return (
    <div className="login-page">
      <div className="login-design inner-div">
        <img className="icon" src={icon} alt="what"/>
      </div>

      <div className="login-form inner-div">
        <h3 className="login-h3">Log in</h3>
        <br />

        <div className="card">

          <input
            className="input form-control"
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
          <input
            className="input form-control"
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
          <br />
          <button className="btn " type="submit" onClick={login}>
            Login
          </button>
        </div>
        <br />
        <ForgotPassword />
        <br />
        <span>don't have an account?</span>
        <SignUpButton />
      </div>
    </div>
  );
}
