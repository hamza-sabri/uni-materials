import React, { useState } from "react";
import "../../../../styles/dynamic-content/uni-manager/uni-manager.css";
import LocationTag from "./location-tag";
import { showAlert } from "../../../../utilities/alearts";

export default function UniLocations({ uniIndex, unisDataList }: any) {
  const { doc } = unisDataList[uniIndex];
  const { locations: destructuredLocations } = doc;
  const [locations, setLocations] = useState(destructuredLocations);
  const [locationText, setLocationText] = useState("");

  const addLocation = () => {
    const loc = locationText.trim();
    const tempLocations = locations.map(function (v: string) {
      return v.toLowerCase();
    });
    if (loc === "") {
    } else if (loc && !tempLocations.includes(loc)) {
      setLocations([...locations, loc]);
      setLocationText("");
    } else {
      showAlert({
        title: "Ops",
        text: "this location exists",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const deleteLocation = (location: any) => {
    const tempLocations = locations.filter((l: any) => l !== location);
    setLocations(tempLocations);
  };

  return (
    <div className="uni-locations-div">
      <label
        htmlFor="location-tag-editor"
        className="uni-locations-label label"
      >
        Locations
      </label>

      <div className="location-tag-editor" id="location-tag-editor">
        <span className="location-tag-wrapper">
          {locations.map((location: string) => (
            <LocationTag
              key={location}
              neededLocation={location}
              deleteLocation={deleteLocation}
            />
          ))}
        </span>
        <div className="uni-input-and-button-div">
          <input
            onChange={(e) => {
              setLocationText(e.target.value);
            }}
            value={locationText}
            id="uni-locations-input"
            className="uni-locations-input input"
          />

          <button className="add-uni-location-button" onClick={addLocation}>
            add location
          </button>
        </div>
      </div>
    </div>
  );
}
