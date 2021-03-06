import React, { useState, useRef, useEffect } from "react";
import lottie from "lottie-web";
import Swal from "sweetalert2";
import uniManagerPic from '../../../../assets/home/uni-manager/uni-manager.json';
interface SelectProtected {
  readonly wrapperElement: HTMLDivElement;
}

export default function UnisNames({
  unisDataList,
  setLocations,
  setMajors,
  setUniName,
  setUniID,
}: any) {
  const [display, setDisplay] = useState(false);
  // const [options, setOptions] = useState(unisDataList);
  const [search, setSearch] = useState("");

  let unisNamess = unisDataList.map(({ doc }: any) => doc.name);

  const [unisNames, setUnisNames] = useState(unisNamess);

  let index = 0;
  const animated: any = useRef(null);

  const setUniDex = (uni: any) => {
    if (unisNames.includes(uni)) {
      setSearch(uni);
      setDisplay(false);
      const index = unisNames.indexOf(uni);
      const item = unisDataList[index];
      const { id } = item;
      const { doc } = item;
      const { name } = doc;
      const { locations } = doc;
      const { fields } = doc;
      setLocations(locations);
      setMajors(fields);
      setUniName(name);
      setUniID(id);
    } else {
      setUniName(uni);
      setUniID(null);
      const empty: any = [];
      setLocations(empty);
      setMajors(empty);
    }
  };

  const changeUniName = async (oldName: string) => {
    let newName = oldName;

    const { value: newUni } = await Swal.fire({
      title: "change university name",
      input: "text",
      inputValue: oldName,
    });

    newName = newUni;

    if (newName !== null) {
      const temp = [];
      for (let i = 0; i < unisNames.length; i++) {
        if (unisNames[i] === oldName) temp[i] = newName;
        else temp[i] = unisNames[i];
      }
      setUnisNames(temp);
      setSearch(newName);
      setUniName(newName);
    }
  };

  useEffect(() => {
    lottie.loadAnimation({
      container: animated.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: uniManagerPic,
    });
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);
  const selectProtected: SelectProtected = {
    wrapperElement: document.createElement("div"),
  };
  const wrapperRef = useRef(selectProtected.wrapperElement);

  const handleClickOutSide = (e: any) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(e.target)) {
      setDisplay(false);
    }
  };

  return (
    <div className="uni-names-div">
      <label htmlFor="uni-name-input" className="uni-name-label label">
        University name
      </label>
      <input
        id="auto"
        className="auto-input input"
        onClick={() => setDisplay(true)}
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        onBlur={(event) => setUniDex(event.target.value)}
      ></input>
      {display && (
        <div ref={wrapperRef} className="autoContainer">
          {/* {options
            .filter(({ doc }: any) => doc.name.indexOf(search) > -1)
            .map(({ doc }: any) => { */}
          {unisNames
            .filter((uniName: any) => uniName.indexOf(search) > -1)
            .map((uniName: any) => {
              return (
                <div
                  onClick={() => setUniDex(uniName)}
                  className="option"
                  key={index++}
                >
                  <span className="uni-name-option">{uniName}</span>
                </div>
              );
            })}
        </div>
      )}
      <button
        className="change-uni-name-btn"
        onClick={() => changeUniName(search)}
      >
        change name
      </button>
      <div className="animated" ref={animated}></div>
    </div>
  );
}
