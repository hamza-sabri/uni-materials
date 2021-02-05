import React from "react";
import { PageInterface } from "../Interface/interface";

// get data from data-needd folder
import { universityName } from "../Interface/data-need/sign-up-data-to-pass";
import { universityPart } from "../Interface/data-need/sign-up-data-to-pass";
const UniversityInformation = ({
  handelChange,
  InputRef,
  formData,
}: PageInterface) => {
  const { unversityName, unversityLocation, majorName } = formData;
  return (
    <div className="tab">
      <span className="title">Unversity Info:</span>
      <p>
        <select
          onChange={handelChange}
          className="select-ls"
          name="unversityName"
          ref={InputRef}
          value={unversityName}
        >
          {universityName &&
            universityName.map((e, idx) => {
              return (
                <option value={e} key={idx}>
                  {e}
                </option>
              );
            })}
        </select>
      </p>

      <p>
        <select
          onChange={handelChange}
          className="select-ls"
          name="unversityLocation"
          value={unversityLocation}
          ref={InputRef}
        >
          {universityPart &&
            universityPart.map((e, idx) => {
              return (
                <option key={idx} value={e}>
                  {e}
                </option>
              );
            })}
        </select>
      </p>

      <p>
        <input
          type="text"
          placeholder="Major"
          name="majorName"
          value={majorName}
          ref={InputRef}
          onChange={handelChange}
        />
      </p>
    </div>
  );
};

export default UniversityInformation;
