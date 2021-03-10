import React, { useState, useRef, useEffect } from "react";
import lottie from "lottie-web";
import Swal from "sweetalert2";
import uniManagerPic from "../../../../assets/home/uni-manager/uni-manager.json";
import { resourceLimits } from "worker_threads";
interface SelectProtected {
  readonly wrapperElement: HTMLDivElement;
}

type uniNames = {
  unisDataList: any;
  setLocations: any;
  setMajors: any;
  setUniName: any;
  setUniID: any;
};

export default function UnisNames({
  unisDataList,
  setLocations,
  setMajors,
  setUniName,
  setUniID,
}: uniNames) {
  const [display, setDisplay] = useState(false);
  // const [options, setOptions] = useState(unisDataList);
  const [search, setSearch] = useState("");

  let unisNamess: string[] = unisDataList.map(({ doc }: any) => doc.name);

  const [unisNames, setUnisNames] = useState(unisNamess || []);

  let index = 0;
  const animated: any = useRef(null);

  const setUniDex = (uni: string) => {
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
    Swal.fire({
      title: "change university name",
      input: "text",
      inputValue: oldName,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCancelButton: true,
      allowEnterKey: true,
      confirmButtonText: "edit",
      showLoaderOnConfirm: true,
      preConfirm: (result) => {
        if (result) {
          if (unisNames.includes(result)) {
            Swal.showValidationMessage("this name already exists");
          } else return;
        } else {
          Swal.showValidationMessage("please enter a name");
        }
      },
    }).then((result: any) => {
      newName = result.value;
      if (result.isConfirmed) {
        if (newName === "") {
        }
        if (newName !== null && newName !== "") {
          const temp = [];
          for (let i = 0; i < unisNames.length; i++) {
            if (unisNames[i] === oldName) temp[i] = newName;
            else temp[i] = unisNames[i];
          }
          setUnisNames(temp);
          setSearch(newName);
          setUniName(newName);
        }
      } else {
      }
    });
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
    if (unisNames[0].length > 0) {
      const temp = unisNames[0];
      setUniDex(temp);
    }
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
    <div className="uni-names-div ">
      <label htmlFor="uni-name-input" className="uni-name-label label">
        University name
      </label>
      <input
        id="auto"
        className="auto-input input"
        onClick={() => setDisplay(true)}
        value={search}
        autoComplete="off"
        onChange={(event) => setSearch(event.target.value)}
        onBlur={(event) => setUniDex(event.target.value)}
      ></input>
      {display && (
        <div ref={wrapperRef} className="autoContainer">
          {unisNames
            .filter((uniName: string) => uniName.indexOf(search) > -1)
            .map((uniName: string) => {
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
      <div className="change-uni-name-div">
        <button
          className="change-uni-name-btn"
          onClick={() => changeUniName(search)}
        >
          change name
        </button>
      </div>
      <div className="animated" ref={animated}></div>
    </div>
  );
}
