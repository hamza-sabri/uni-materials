import React from "react";

import SignUpForm from "./sign-up-form";

// import bootstrab here just on ths compnant signup
import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap/dist/js/bootstrap.bundle.min";

const Form = () => {
  return (
    <div className="contanier">
      <SignUpForm />
    </div>
  );
};

export default Form;
