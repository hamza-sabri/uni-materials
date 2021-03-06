import React, { useContext, useState } from "react";
import { UniDataContext } from "../../../../contexts/signup-context/uni-data-context";
import "../../../../styles/dynamic-content/uni-manager/uni-manager.css";
import UnisNames from "./uni-names";
import UniLocations from "./uni-locations";
import UniMajors from "./uni-majors";
import SubmitBtn from "./submit-btn";

export default function UniManagerInfo() {
  const unisDataList = useContext(UniDataContext);
  const [uniID, setUniID] = useState("");
  const [uniName, setUniName] = useState("");
  const [locations, setLocations] = useState([]);
  const [majors, setMajors] = useState([]);

  const uniNamesFun = () => {
    return (
      <UnisNames
        {...{
          unisDataList,
          setLocations,
          setMajors,
          setUniName,
          setUniID,
        }}
      />
    );
  };
  const uniLocationInputs = () => {
    return locations && <UniLocations {...{ locations, setLocations }} />;
  };
  const uniMajorsInputs = () => {
    return majors && <UniMajors {...{ majors, setMajors }} />;
  };

  return (
    <div className="uni-manager-info">
      <div className="left-div">
        {uniNamesFun()}
        <SubmitBtn
          {...{
            uniID,
            uniName,
            locations,
            majors,
          }}
        />
      </div>
      <div className="right-div">
        {uniLocationInputs()}
        {uniMajorsInputs()}
      </div>
    </div>
  );
}
//make arr of names, ids, indexies
