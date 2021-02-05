import React from "react";
import { PageInterface } from "../Interface/interface";

const PersonalInformation = ({
  handelChange,
  InputRef,
  formData,
}: PageInterface) => {
  const { firstName, lastName, phone } = formData;
  return (
    <div className="tab">
      <span className="title">Personal Information:</span>
      <p>
        <input
          type="text"
          placeholder="First name"
          name="firstName"
          value={firstName}
          onChange={handelChange}
          ref={InputRef}
        />
      </p>
      <p>
        <input
          type="text"
          placeholder="Last name"
          name="lastName"
          value={lastName}
          onChange={handelChange}
          ref={InputRef}
        />
      </p>
      <p>
        <input
          type="text"
          placeholder="phone"
          name="phone"
          value={phone}
          onChange={handelChange}
          ref={InputRef}
        />
      </p>
    </div>
  );
};

export default PersonalInformation;
