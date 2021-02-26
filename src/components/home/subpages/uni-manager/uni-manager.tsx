import React, { Component, useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { UniDataContext } from "../../../../contexts/signup-context/uni-data-context";
import { APIsCaller } from "../../../../requestes/apis-caller";
import { getAllUnis } from "../../../../requestes/uni-requests/university";
import "../../../../styles/dynamic-content/uni-manager/uni-manager.css";
import UniManagerContainer from "./uni-manager-container";

export default function UniManager() {
  const [unisDataList, setUnisDataList] = useState<any[]>([]);
  const [flag, setFlag] = useState (false);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await APIsCaller(getAllUnis);
      const { unisList } = data!;
      setUnisDataList(unisList);
      setFlag(true);
    };
    fetchData();
  }, []);

  return (
    <div className="uni-manager-container">
      <UniDataContext.Provider value={unisDataList}>
        { flag && <UniManagerContainer />}
      </UniDataContext.Provider>
    </div>
  );
}
