import React, { useContext, useState } from "react";
import { UniDataContext } from "../../../../contexts/signup-context/uni-data-context";
import { uniResults } from "../../../../interfaces/uni-info-manager/uni-manager-interfaces";
import "../../../../styles/dynamic-content/uni-manager/uni-manager.css";
import UnisNames from "./uni-names";
import UniLocations from "./uni-locations";
import UniMajors from "./uni-majors";

export default function UniManagerInfo({
  uniManagerResult,
  setUniManagerResult,
}: uniResults) {
  const unisDataList = useContext(UniDataContext);
  const [uniIndex, setUniIndex] = useState(0);

  const uniNamesFun = () => {
    return (
      <UnisNames
        {...{
          unisDataList,
          uniIndex,
          setUniIndex,
          uniManagerResult,
          setUniManagerResult,
        }}
      />
    );
  };

  const uniLocationInputs = () => {
    return <UniLocations {...{ uniIndex, unisDataList }} />;
  };
  const uniMajorsInputs = () => {
    return <UniMajors {...{ uniIndex, unisDataList }} />;
  };

  return (
    <div className="uni-manager-info">
      {uniNamesFun()}
      {uniLocationInputs()}
      {uniMajorsInputs()}
    </div>
  );
}
//make arr of names, ids, indexies
