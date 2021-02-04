import React from "react";
import "./Form.css";
import MultiStep from "./multyStep/multiStep";

// import SignupForm from "./SignupForm.js";

const Form = () => {
  return (
    <div className="container">
      <div className="row align-items-center justify-content-center">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 b-height">
          <div className="row b-wrapper">
            <div className="col-xs-12 col-sm-5 col-md-5 col-lg-5 b-min-height">
              <div className="b-logo swift_left"></div>
              <div className="b-title text-center">
                <h1 className="user_title">Welcome Friend</h1>
                <p className="user_subTitle">
                  To keep Connected with us please {<br />} login with your
                  personal info.
                </p>
                <button type="button" className="swift sign_in">
                  Sign In
                </button>
              </div>
            </div>

            <div className="col-xs-12 col-sm-7 col-md-7 col-lg-7">
              <div className="b-logo swift_right">
                <a
                  href={
                    "https://www.youtube.com/channel/UCg-bMxpjvoQVxVs69iyqGuQ"
                  }
                >
                  <img
                    src="images/Logo.png"
                    alt="Programming Guide Logo"
                    title="Programming Guide Logo"
                    className="img-fluid"
                  />
                </a>
              </div>
              <div className="b-form text-center">
                {/** here to signup this is the form  */}
                <MultiStep />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
