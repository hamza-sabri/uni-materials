import React, { useState } from "react";
import "../../../../styles/dynamic-content/uni-manager/uni-manager.css";
import LocationTag from "./location-tag";
import { showAlert } from "../../../../utilities/alearts";

type uniLocation = {
  locations: string[];
  setLocations: any;
};

export default function UniLocations({ locations, setLocations }: uniLocation) {
  const [locationText, setLocationText] = useState("");
  const addLocation = () => {
    const loc = locationText.trim();
    const tempLocations = locations.map(function (location: string) {
      return location.toLowerCase();
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

  const deleteLocation = (location: string) => {
    const tempLocations = locations.filter((l: string) => l !== location);
    setLocations(tempLocations);
  };

  return (
    <div className="uni-locations-div grid-container">
      <label
        htmlFor="location-tag-editor"
        className="uni-locations-label label item1"
      >
        Locations
      </label>
      <div className="location-tag-editor" id="location-tag-editor">
        <div className="tags-border">
          <span className="location-tag-wrapper">
            {locations.map((location: string) => (
              <LocationTag
                key={location}
                neededLocation={location}
                deleteLocation={deleteLocation}
              />
            ))}
          </span>
        </div>
        <div className="uni-input-and-button-div">
          <input
            onChange={(e) => {
              setLocationText(e.target.value);
            }}
            value={locationText}
            id="uni-locations-input"
            className="uni-locations-input input"
            placeholder="add location"
            autoComplete="off"
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                addLocation();
              }
            }}
          />
          <div className="add-button-container">
            <button className="add-uni-location-button" onClick={addLocation}>
              Add Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
