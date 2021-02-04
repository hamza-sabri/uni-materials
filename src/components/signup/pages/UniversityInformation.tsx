import React from "react";

type UniversityInterface = {
  handleOnChange: any;
  state: any;
  errorStyle: object;
};

const UniversityInformation = ({
  state,
  handleOnChange,
  errorStyle,
}: UniversityInterface) => {
  const location = [
    "university",
    "PTUK",
    "Al-Quds Open University",
    "An-Najah University",
    "Birzeit University",
    "Al-Quds University",
    "Al-Khalel university",
    "Polytechnic University",
    "Al Azhar university",
    "al zaytona University",
  ];

  const universityPart = [
    "Nablus",
    "Tulkarm",
    "Qalqilya",
    "Ramallah",
    "Hebron",
    "Alaroub",
  ];
  return (
    <div className="form-card">
      <h2 className="b-form-title">University Information</h2>
      <input
        type="text"
        name="uname"
        placeholder="University Name"
        value={state.uname.value}
        onChange={handleOnChange}
      />
      <input
        type="text"
        name="mname"
        placeholder="Major name"
        value={state.mname.value}
        onChange={handleOnChange}
      />

      <div className="row">
        <div className="col-2">
          <label className="">UniversityInfo</label>
        </div>
        <div className="col-10">
          <select
            className="list-dt"
            id="university"
            name="universityname"
            value={state.universityname.value}
            onChange={handleOnChange}
          >
            {location &&
              location.map((unv, idx) => {
                return (
                  <option value={unv} key={idx}>
                    {unv}
                  </option>
                );
              })}
          </select>
          <select
            className="list-dt"
            id="location"
            name="universitypart"
            value={state.universitypart.value}
            onChange={handleOnChange}
          >
            <option selected>location</option>
            {universityPart &&
              universityPart.map((part, idx) => {
                return (
                  <option value={part} key={idx}>
                    {part}
                  </option>
                );
              })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default UniversityInformation;
