import { PageInterface } from "../Interface/interface";

const AccountInformation = ({
  handelChange,
  InputRef,
  formData,
}: PageInterface) => {
  const { email, password, password2 } = formData;
  return (
    <div className="tab">
      <span className="title">Account Info:</span>
      <p>
        <input
          type="email"
          placeholder="E-mail"
          name="email"
          value={email}
          ref={InputRef}
          onChange={handelChange}
        />
      </p>
      <p>
        <input
          type="password"
          placeholder="password"
          name="password"
          value={password}
          ref={InputRef}
          onChange={handelChange}
        />
      </p>
      <p>
        <input
          type="password"
          placeholder="Confirm password"
          name="password2"
          value={password2}
          ref={InputRef}
          onChange={handelChange}
        />
      </p>
    </div>
  );
};

export default AccountInformation;
