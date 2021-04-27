import React, { useEffect, useState, useRef, useContext } from "react";
import avatar from "./avatar.png";
import "../../../../styles/dynamic-content/user-profile/user-profile.css";
interface SelectProtected {
  readonly wrapperElement: HTMLDivElement;
}

export default function Avatar({ data, unisDataList }: any) {
  const src = avatar;
  const { userProfile } = data;
  const { firstName, lastName, email, universityName } = userProfile;
  const fullName = firstName + " " + lastName;
  const [name, setName] = useState(fullName);
  const [Email, setEmail] = useState(email);
  const [uniName, setUniName] = useState(universityName);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const uniNameRef = useRef<HTMLInputElement>(null);

  const [disabled, setDisabled] = useState(false);

  const handleClick = () => {
    setDisabled(!disabled);
  };

  const tempUnisNames: string[] =
    unisDataList.map(({ doc }: any) => doc.name) || [];
  const [unisNames, setUnisNames] = useState(tempUnisNames || []);

  let index = 0;
  const [search, setSearch] = useState(uniName);
  const [display, setDisplay] = useState(false);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutSide);

    nameRef.current!.disabled = true;
    emailRef.current!.disabled = true;
    uniNameRef.current!.disabled = true;

    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);
  const selectProtected: SelectProtected = {
    wrapperElement: document.createElement("div"),
  };
  const wrapperRef = useRef(selectProtected.wrapperElement);

  const handleClickOutSide = (e: any) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(e.target)) {
      setDisplay(false);
    }
  };
  const setUniDex = (uni: string) => {
    if (unisNames.includes(uni)) {
      setUniName(uni);
    } else {
      setUniName("");
    }
  };

  return (
    <div className="head-div">
      <img className="profile-avatar" src={src} />
      <div className="profile-info">
        <input
          ref={nameRef}
          className="profile-info-data user-name"
          value={name}
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
          disabled={disabled}
          onDoubleClick={() => (nameRef.current!.disabled = false)}
          onBlur={() => (nameRef.current!.disabled = true)}
        ></input>
        <input
          ref={emailRef}
          className="profile-info-data user-email"
          value={Email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          disabled={disabled}
          onDoubleClick={() => (emailRef.current!.disabled = false)}
          onBlur={() => (emailRef.current!.disabled = true)}
          
        ></input>
        <input
          ref={uniNameRef}
          className="auto-input input profile-info-data user-uniName"
          onClick={() => setDisplay(true)}
          value={search}
          autoComplete="off"
          onChange={(event) => setSearch(event.target.value)}
          onBlur={(event) => {
            setUniDex(search);
            uniNameRef.current!.disabled = true;
          }}
          placeholder="university name"
          onDoubleClick={() => (uniNameRef.current!.disabled = false)}
        ></input>
        {display && (
          <div ref={wrapperRef} className="autoContainer">
            {unisNames
              .filter((uniName: string) => uniName.indexOf(search) > -1)
              .map((uniName: string) => {
                return (
                  <div
                    onClick={() => {
                      setSearch(() => uniName);
                      setUniDex(uniName);
                      setDisplay(false);
                    }}
                    className="option"
                    key={index++}
                  >
                    <span className="uni-name-option">{uniName}</span>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}
