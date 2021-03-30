import React, { useContext, useState } from "react";
import { UniDataContext } from "../../../../contexts/signup-context/uni-data-context";
import "../../../../styles/dynamic-content/uni-manager/uni-manager.css";
import UnisNames from "./uni-names";
import UniLocations from "./uni-locations";
import UniMajors from "./uni-majors";
import SubmitBtn from "./submit-btn";
import { DynamicContentContext } from "../../../../contexts/home-context/dynamic-content-state-context";

export default function UniManagerInfo() {
  const unisDataListTemp = useContext(UniDataContext);
  //const [unisDataList, setUnisDataList] = useState(unisDataListTemp);
  const {unisDataList, setUnisDataList} = useContext(DynamicContentContext);


  const tempUnisNames: string[] = unisDataList.map(({ doc }: any) => doc.name) || [];
  const [unisNames, setUnisNames] = useState(tempUnisNames || []);

  const [uniID, setUniID] = useState("");
  const [uniName, setUniName] = useState("");
  const [locations, setLocations] = useState([]);
  const [majors, setMajors] = useState([]);

  const uniNamesFun = () => {
    return (
      <UnisNames
        {...{
          unisDataList,
          setUnisDataList,
          setLocations,
          setMajors,
          uniName,
          setUniName,
          uniID,
          setUniID,
          unisNames, 
          setUnisNames
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
            unisDataList,
            setUnisDataList,
            unisNames, 
            setUnisNames,
            setUniID
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
