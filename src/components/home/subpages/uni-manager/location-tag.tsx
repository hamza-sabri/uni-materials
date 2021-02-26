import React from "react";
import "../../../../styles/dynamic-content/uni-manager/uni-manager.css";
import { location } from "../../../../interfaces/uni-info-manager/uni-manager-interfaces";

export default function LocationTag({
  neededLocation,
  deleteLocation,
}: any) {

  const handleDelete = (event:any) => {
    deleteLocation(neededLocation)
  }
  return (
    <span className="location-tag">
      <span className="location-tag-text">{neededLocation}</span>
      <button className="location-tag-delete" onClick={handleDelete}>
        x
      </button>
    </span>
  );
}
