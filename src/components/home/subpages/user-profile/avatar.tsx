import React, { useEffect, useState, useRef } from "react";
import defualtAvatar from "../../../../assets/home/profile/avatar.png";
import "../../../../styles/dynamic-content/user-profile/user-profile.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ProfileDropZone from "./profile-dropzone";
import saveIcon from "../../../../assets/home/profile/save.svg";
import { APIsCaller } from "../../../../requestes/apis-caller";
import { updateUserProfile } from "../../../../requestes/user-requestes/user";
import { OK } from "../../../../constants/status-codes";

export default function Avatar({ data, unisDataList, setUser }: any) {
  const MySwal = withReactContent(Swal);

  const { userProfile } = data;
  const { firstName, lastName, email, universityName } = userProfile;
  const fullName = firstName + " " + lastName;
  const [name, setName] = useState(fullName);
  const [Email, setEmail] = useState(email);
  const [uniName, setUniName] = useState(universityName);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const uniNameRef = useRef<HTMLSelectElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const tempUnisNames: string[] =
    unisDataList.map(({ doc }: any) => doc.name) || [];

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutSide);
    nameRef.current!.disabled = true;
    emailRef.current!.disabled = true;
    uniNameRef.current!.disabled = true;
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);

  const handleClickOutSide = (e: any) => {
    if (nameRef && !nameRef.current?.contains(e.target)) {
      nameRef.current!.disabled = true;
    }
    if (emailRef && !emailRef.current?.contains(e.target)) {
      emailRef.current!.disabled = true;
    }
    if (uniNameRef && !uniNameRef.current?.contains(e.target)) {
      uniNameRef.current!.disabled = true;
    }
  };

  const submitHandler = async () => {
    Swal.showLoading();
    try {
      const name: string = nameRef.current!.value;
      const email: string = emailRef.current!.value;
      const universityName: string = uniNameRef.current!.value;
      const profileAvatar: string = imgRef.current!.src;
      let uniID: string = "";
      unisDataList.forEach(({ id, doc }: any) =>
        doc.name === universityName ? (uniID = id) : ""
      );
      if (uniID === "")
        Swal.fire(
          "Ops!",
          "The univeristy you choose no longer exist please try another",
          "error"
        );
      else {
        const [firstName, lastName] = name.split(" ");
        const requestBody = {
          uniID,
          universityName,
          email,
          firstName,
          lastName,
          profileAvatar,
        };
        console.log(requestBody);

        const { data, status } = await APIsCaller({
          api: updateUserProfile,
          requestBody,
        });
        if (status === OK) {
          Swal.fire("Woow!", data.message, "success");
        } else {
          throw new Error("hello");
        }
      }
    } catch (err) {
      Swal.fire(
        "Ops!",
        "Sorry something went wrong please try again latter!",
        "error"
      );
    }
  };

  return (
    <div className="head-div">
      <img
        ref={imgRef}
        alt=""
        className="profile-avatar"
        src={userProfile.profileAvatar || defualtAvatar}
        onDrag={() =>
          window.open(userProfile.profileAvatar || defualtAvatar, "_blank")
        }
        onDoubleClick={() =>
          MySwal.fire({
            title: "select image",
            html: <ProfileDropZone imageRef={imgRef} />,
            confirmButtonText: "save",
            confirmButtonColor: "#766ffa",
          })
        }
      />
      <div className="profile-info">
        <input
          ref={nameRef}
          className="profile-info-data user-name"
          value={name}
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
          onDoubleClick={() => (nameRef.current!.disabled = false)}
          onBlur={() => (nameRef.current!.disabled = true)}
        />
        <input
          ref={emailRef}
          className="profile-info-data user-email"
          value={Email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          onDoubleClick={() => (emailRef.current!.disabled = false)}
          onBlur={() => (emailRef.current!.disabled = true)}
          style={{ paddingLeft: "1.5rem" }}
        />
        <select
          className="dropdown-menu profile-info-data user-uniName"
          ref={uniNameRef}
          onBlur={(event) => (uniNameRef.current!.disabled = true)}
          placeholder="university name"
          onDoubleClick={() => (uniNameRef.current!.disabled = false)}
          onChange={(e) => setUniName(e.target.value)}
          value={uniName}
        >
          {tempUnisNames.map((item) => (
            <option className="dropdown-option" key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="save-button" onClick={submitHandler}>
        <img alt="save" src={saveIcon} />
      </div>
    </div>
  );
}
