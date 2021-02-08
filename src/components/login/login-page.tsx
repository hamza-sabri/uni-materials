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
    const response = await signin({
      email,
      password,
    });
    console.log(response);
  };

  return (
    <div className="border">
      <div className="login-page">
        <div className="login-form inner-div">
          <h3>Log in</h3>
          <br/><br/>
          
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
          <br/>
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
          <button className="btn " type="submit" onClick={login}>
            Login
          </button>
          <br />
          <ForgotPassword />
          <br />
          <span>don't have an account?</span><SignUpButton />
        </div>
        <div className="login-design inner-div"></div>
      </div>
    </div>
  );
}
