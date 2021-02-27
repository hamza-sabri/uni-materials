import React, { useContext, useState } from "react";
import { UniDataContext } from "../../../../contexts/signup-context/uni-data-context";
import "../../../../styles/dynamic-content/uni-manager/uni-manager.css";
import UniLocations from "./uni-locations";
import UniMajors from "./uni-majors";
import UniManagerInfo from "./uni-manager-info";

export default function UniManagerContainer() {
  const [uniManagerResult, setUniManagerResult] = useState({
    uniID: "",
    uniName: "",
    uniLocations: [],
    uniMajors: [],
  });

  return (
    <div className="uni-manager-container-2">
      <UniManagerInfo {...{ uniManagerResult, setUniManagerResult }} />
    </div>
  );
}
