import React from "react";
type PersonalInterface = {
  state: any;
  handleOnChange: any;
  errorStyle: object;
};
const PersonalInformation = ({
  state,
  handleOnChange,
  errorStyle,
}: PersonalInterface) => {
  return (
    <div className="form-card">
      <h2 className="b-form-title">Personal Information</h2>
      <input
        type="text"
        name="firstName"
        placeholder="firstName"
        value={state.firstName.value || ""}
        onChange={handleOnChange}
      />
      {state.firstName.error && (
        <p style={errorStyle}>{state.firstName.error}</p>
      )}
      <input
        type="text"
        name="lastName"
        placeholder="lastName"
        value={state.lastName.value || ""}
        onChange={handleOnChange}
      />
      {state.lastName.error && <p style={errorStyle}>{state.lastName.error}</p>}

      <input
        type="text"
        name="phone"
        placeholder="Contact No"
        value={state.phone.value || ""}
        onChange={handleOnChange}
      />
      {state.phone.error && <p style={errorStyle}>{state.phone.error}</p>}
    </div>
  );
};

export default PersonalInformation;
