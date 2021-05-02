import React, { useState } from "react";
import "../../../../styles/dynamic-content/uni-manager/uni-manager.css";
import LocationTag from "./location-tag";
import { showAlert } from "../../../../utilities/alearts";
// the majorTag component is as same as the locationTag conmponent ,so the name of it is locationTag

type uniMajor = {
  majors: string[];
  setMajors: any;
};

export default function UniMajors({ majors, setMajors }: uniMajor) {
  const [majorText, setMajorText] = useState("");
  const addMajor = () => {
    const major = majorText.trim();
    const tempMajors = majors.map(function (v: string) {
      return v.toLowerCase();
    });
    if (major === "") {
    } else if (major && !tempMajors.includes(major)) {
      setMajors([...majors, major]);
      setMajorText("");
    } else {
      showAlert({
        title: "Ops",
        text: "this major exists",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const deleteLocation = (major: any) => {
    const tempMajors = majors.filter((l: any) => l !== major);
    setMajors(tempMajors);
  };

  return (
    <div className="uni-majors-div">
      <label
        htmlFor="location-tag-editor"
        className="uni-locations-label label"
      >
        Majors
      </label>

      <div className="location-tag-editor" id="location-tag-editor">
        <div className="tags-border">
          <span className="location-tag-wrapper">
            {majors.map((major: string) => (
              <LocationTag
                key={major}
                neededLocation={major}
                deleteLocation={deleteLocation}
              />
            ))}
          </span>
        </div>
        <div className="uni-input-and-button-div">
          <div className="uni-manger-input-wraper">
            <input
              onChange={(e) => {
                setMajorText(e.target.value);
              }}
              value={majorText}
              id="uni-majors-input"
              className="uni-locations-input input"
              placeholder="add major"
              autoComplete="off"
			  onKeyPress={(event) => {
				if (event.key === "Enter") {
				  addMajor();
				}
			  }}
            />
          </div>
          <div className="add-button-container">
            <button className="add-uni-location-button" onClick={addMajor}>
              Add Major
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
