import React, { useEffect, useState } from "react";
import avatar from "./avatar.png";
import "../../../../styles/dynamic-content/user-profile/user-profile.css";
import { APIsCaller } from "../../../../requestes/apis-caller";
import { getUserProfile } from "../../../../requestes/user-requestes/user";

export default function Avatar() {
  const src = avatar;

  const [name, setName] = useState("name");
  const [email, setEmail] = useState("email");
  const [uniName, setUniName] = useState("uni name");

  useEffect(() => {
    const obj  = async () => {
      const {data, status} = await APIsCaller({api: getUserProfile}); 
      console.log(data, status);
    } 
    obj();
  }, []);
  return (
    <div className="head-div">
      <div className="head-left-div">
        <img className="profile-avatar" src={src} />
        <div className="profile-info">
          <label className="profile-info-data user-name">{name}</label>
          <label className="profile-info-data user-email">{email}</label>
          <label className="profile-info-data user-uniname">{uniName}</label>
        </div>
      </div>

      {/* <div className="head-right-div">
        <button className="edit-btn">edit</button>
      </div> */}
    </div>
  );
}
