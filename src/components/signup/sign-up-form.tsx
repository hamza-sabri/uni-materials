import React, { useState, useRef } from "react";
import Button from "./Button/button-componant";
// get the page i needed
import AccountInformation from "./pages/account-information";
import PersonalInformation from "./pages/personal-information";
import UniversityInformation from "./pages/university-Information";
import "./sign-up.css";

// get data i needed here
import { nextButton } from "./Interface/data-need/sign-up-data-to-pass";
import { prevButton } from "./Interface/data-need/sign-up-data-to-pass";
import { signUp } from "./Interface/data-need/sign-up-data-to-pass";

import { data } from "./Interface/data-need/sign-up-data-to-pass";

const SignUpForm = () => {
  const [tabno, settabno] = useState<number>(0);

  const [formData, setformData] = useState(data);
  const InputRef = useRef();

  //decal useRef

  const handelSubmit = (event: any) => {
    event.preventDefault();
    console.log(formData);
  };

  const handelIncrement = () => {
    settabno((tabno) => tabno + 1);
  };

  const handelDecrement = () => {
    settabno((tabno) => tabno - 1);
  };

  const handelChange = (event: any) => {
    const { name, vlaue } = event.target;
    setformData({ ...formData, [name]: vlaue });
  };

  // here write function to render pages
  const renderPage = (tabno: number) => {
    switch (tabno) {
      case 0:
        return (
          <React.Fragment>
            <AccountInformation
              handelChange={handelChange}
              InputRef={InputRef}
              formData={formData}
            />

            <div className="button-control" style={{ overflow: "hidden" }}>
              <Button attrubte={nextButton} handelIncrement={handelIncrement} />
            </div>
          </React.Fragment>
        );

      case 1:
        return (
          <React.Fragment>
            <PersonalInformation
              handelChange={handelChange}
              InputRef={InputRef}
              formData={formData}
            />

            <div className="button-control" style={{ overflow: "hidden" }}>
              <Button attrubte={prevButton} handelDecrement={handelDecrement} />
              <Button attrubte={nextButton} handelIncrement={handelIncrement} />
            </div>
          </React.Fragment>
        );
      case 2:
        return (
          <React.Fragment>
            <UniversityInformation
              handelChange={handelChange}
              InputRef={InputRef}
              formData={formData}
            />

            <Button attrubte={prevButton} handelDecrement={handelDecrement} />
            <Button attrubte={signUp} />
          </React.Fragment>
        );
      default:
        return "not found";
    }
  };

  return (
    <div className="form">
      <div className="container d-flex justify-content-center h-100 ">
        <div className=" row " style={{ width: "100%" }}>
          <div className="col-sm-5 col-xs-5 animation-div"></div>
          <div className="col-sm-7 col-xs-7 sign-page">
            <h5 className="title">Sign up </h5>
            <div className="card">
              <form onSubmit={handelSubmit}>
                {/** render page here  */}

                {renderPage(tabno)}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
