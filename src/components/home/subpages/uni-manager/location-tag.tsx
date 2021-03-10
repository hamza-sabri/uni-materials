import React from "react";
import "../../../../styles/dynamic-content/uni-manager/uni-manager.css";

type locationTag = {
  neededLocation: string;
  deleteLocation: any;
};

export default function LocationTag({
  neededLocation,
  deleteLocation,
}: locationTag) {
  const handleDelete = (event: any) => {
    deleteLocation(neededLocation);
  };
  return (
    <span className="location-tag">
      <button className="location-tag-delete" onClick={handleDelete}>
        x
      </button>
      <span className="location-tag-text">{neededLocation}</span>
    </span>
  );
}
