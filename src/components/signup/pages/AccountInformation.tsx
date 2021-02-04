import { useRef } from "react";
type AccountInterface = {
  state: any;
  errorStyle: object;
  handleOnChange: any;
};

const AccountInformation = ({
  state,
  handleOnChange,
  errorStyle,
}: AccountInterface) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleEvent = () => {
    const { current } = inputRef;
    console.log(current?.value);
  };

  return (
    <div className="form-card">
      <h2 className="b-form-title">Account Information</h2>
      <input
        ref={inputRef}
        type="email"
        name="email"
        placeholder="Email"
        value={state.email.value}
        onChange={handleEvent}
      />
      {state.email.error && <p style={errorStyle}>{state.email.error}</p>}

      <input
        type="password"
        name="password"
        placeholder="password"
        value={state.password.value}
        onChange={handleOnChange}
      />
      {state.password.error && <p style={errorStyle}>{state.password.error}</p>}

      <input
        type="password"
        name="password2"
        placeholder="Confirm Password"
        value={state.password2.value}
        onChange={handleOnChange}
      />
      {state.password2.error && (
        <p style={errorStyle}>{state.password2.error}</p>
      )}
    </div>
  );
};

export default AccountInformation;
