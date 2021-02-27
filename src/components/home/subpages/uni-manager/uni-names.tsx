import React, { useState, useRef, useEffect } from "react";

interface SelectProtected {
  readonly wrapperElement: HTMLDivElement;
}

export default function UnisNames({
  unisDataList,
  setUniIndex,
  uniManagerResult,
  setUniManagerResult,
}: any) {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState(unisDataList);
  const [search, setSearch] = useState("");
	const unisNames = unisDataList.map(({ doc }:any) => doc.name);
  let index = 0;
  const setUniDex = (uni: any) => {
    setSearch(uni);
    setDisplay(false);
    setUniIndex(()=> unisNames.indexOf(uni));
  };

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
    <div  className="uni-names-div">
      <label htmlFor="uni-name-input" className="uni-name-label label">
        University name
      </label>
      <input
        id="auto"
        className="auto-input input"
        onClick={() => setDisplay(true)}
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      ></input>
      {display && (
        <div ref={wrapperRef} className="autoContainer">
          {options
            .filter(
              ({ doc }: any) => doc.name.indexOf(search) > -1
            )
            .map(({ doc }: any) => {
              return (
                <div
                  onClick={() => setUniDex(doc.name)}
                  className="option"
                  key={index++}
                >
                  <span className="uni-name-option">{doc.name}</span>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
