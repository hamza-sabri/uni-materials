import {  useContext } from "react";
import { DynamicContentContext } from "../../../../contexts/home-context/dynamic-content-state-context";
import { UniDataContext } from "../../../../contexts/signup-context/uni-data-context";
import "../../../../styles/dynamic-content/uni-manager/uni-manager.css";
import UniManagerInfo from './uni-manager-info';


export default function UniManager() {
  const {unisDataList} = useContext(DynamicContentContext);
  return (
    <div className="uni-manager-container">
      <UniDataContext.Provider value={unisDataList}>
        {unisDataList && unisDataList.length && <UniManagerInfo />}
      </UniDataContext.Provider>
    </div>
  );
}
