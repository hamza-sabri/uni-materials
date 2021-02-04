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
  return (
    <div className="form-card">
      <h2 className="b-form-title">Account Information</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={state.email.value}
        onChange={handleOnChange}
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
