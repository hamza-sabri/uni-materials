import React, { useState, useEffect } from "react";
import { UniDataContext } from "../../../../contexts/signup-context/uni-data-context";
import { APIsCaller } from "../../../../requestes/apis-caller";
import { getAllUnis } from "../../../../requestes/uni-requests/university";
import "../../../../styles/dynamic-content/uni-manager/uni-manager.css";
import UniManagerInfo from './uni-manager-info';

export default function UniManager() {
  const [unisDataList, setUnisDataList] = useState<any[]>([]);
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await APIsCaller({ api: getAllUnis });
      const { unisList } = data!;
      setUnisDataList(unisList);
      setFlag(true);
    };
    fetchData();
  }, []);

  return (
    <div className="uni-manager-container">
      <UniDataContext.Provider value={unisDataList}>
        {flag && <UniManagerInfo />}
      </UniDataContext.Provider>
    </div>
  );
}
