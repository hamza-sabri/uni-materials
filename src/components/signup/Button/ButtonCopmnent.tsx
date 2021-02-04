import React from "react";
import { buttonInterface } from "../Interface/interface";
// type buttonAttrubite = {
//   buttonType: string;
//   name: string;
//   className: string;
//   value: string;
// };

// type buttonInterface = {
//   attrubite: buttonAttrubite;
//   handelDecrement?: any;
//   handelIncrement?: Function;
//   onSignup?: any;
// };

const Button = ({
  attrubite,
  handelIncrement,
  handelDecrement,
}: buttonInterface) => {
  const { buttonType, name, className, value } = attrubite;
  return (
    <input
      type={buttonType}
      name={name}
      className={className}
      value={value}
      onClick={
        name === "previous"
          ? handelDecrement
          : name === "next"
          ? handelIncrement
          : ""
      }
    />
  );
};

export default Button;
