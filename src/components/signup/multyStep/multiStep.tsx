/* eslint-disable no-lone-blocks */
import React, { useState } from "react";
// this is three page
import AccountInformation from "../pages/AccountInformation";
import PersonalInformation from "../pages/PersonalInformation";
import UniversityInformation from "../pages/UniversityInformation";

// this is if the signup correct
// import Success from "../SuccessForm";

// this to check validation and handel it
import useForm from "../Validation/useForm";

//Genral Copmonant next prevuois signup and other
import Button from "../Button/ButtonCopmnent";

// here Schema of validation with rules
import FormValidationRules from "../Validation/FormValidationRules";

// set the type of button on sending

import { buttonAttrubite } from "../Interface/interface";

const MultiStep = () => {
  const [pageno, setpageno] = useState<number>(1);

  // get data from Form Rule Validatino
  const {
    stateSchema,
    validationStateSchema,
    onSubmitForm,
    errorStyle,
  } = FormValidationRules();

  const { state, handleOnChange, handleOnSubmit } = useForm(
    stateSchema,
    validationStateSchema,
    onSubmitForm
  );

  const Previous: buttonAttrubite = {
    buttonType: "button ",
    name: "previous",
    className: "previous action-button-previous",
    value: "Previous",
  };

  const Next: buttonAttrubite = {
    name: "next",
    buttonType: "button",
    className: "next action-button",
    value: "next",
  };

  const signUp: buttonAttrubite = {
    buttonType: "submit",
    name: "submit",
    className: "next action-button",
    value: "SignUp",
  };

  const handelIncrement = () => setpageno((pageno) => pageno + 1);

  const handelDecrement = () => setpageno((pageno) => pageno - 1);

  const RenderPage = (pageno: number) => {
    switch (pageno) {
      case 1:
        console.log(pageno);
        return (
          <React.Fragment>
            <fieldset>
              <AccountInformation {...{ state, errorStyle, handleOnChange }} />

              <Button handelIncrement={handelIncrement} attrubite={Next} />
            </fieldset>
          </React.Fragment>
        );
      case 2:
        {
          /*console.log(`iam on personal information here ${pageno}`)*/
        }
        return (
          <React.Fragment>
            <fieldset>
              <PersonalInformation {...{ errorStyle, state, handleOnChange }} />
              <Button handelDecrement={handelDecrement} attrubite={Previous} />
              <Button attrubite={Next} handelIncrement={handelIncrement} />
            </fieldset>
          </React.Fragment>
        );

      case 3:
        return (
          <fieldset>
            <UniversityInformation {...{ state, handleOnChange, errorStyle }} />
            <Button attrubite={Previous} handelDecrement={handelDecrement} />
            <Button attrubite={signUp} />
          </fieldset>
        );
      default:
        console.log(pageno);
        return "not found here ";
    }
  };

  return (
    <form id="msform" onSubmit={handleOnSubmit}>
      {RenderPage(pageno)}
    </form>
  );
};

export default MultiStep;
