import React from "react";
import { buttonInterface } from "../Interface/interface";

const Button = ({
  attrubte,
  handelIncrement,
  handelDecrement,
}: buttonInterface) => {
  const { name, value, buttonType, className } = attrubte;
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
          : "#"
      }
    />
  );
};

export default Button;
