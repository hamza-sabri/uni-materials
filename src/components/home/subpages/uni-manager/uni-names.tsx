import React, { useState, useRef, useEffect } from "react";
import lottie from "lottie-web";
import Swal from "sweetalert2";
import uniManagerPic from "../../../../assets/home/uni-manager/uni-manager.json";
import DeleteUni from "./delete-uni";
interface SelectProtected {
  readonly wrapperElement: HTMLDivElement;
}

type uniNames = {
  unisDataList: any;
  setUnisDataList: any;
  setLocations: any;
  setMajors: any;
  uniName: string;
  setUniName: any;
  uniID: string;
  setUniID: any;
  unisNames: string[];
  setUnisNames: any;
};

export default function UnisNames({
  unisDataList,
  setUnisDataList,
  setLocations,
  setMajors,
  uniName,
  setUniName,
  uniID,
  setUniID,
  unisNames,
  setUnisNames,
}: uniNames) {
  const [display, setDisplay] = useState(false);
  const [search, setSearch] = useState("");

  // let unisNamess: string[] = unisDataList.map(({ doc }: any) => doc.name);
  // const [unisNames, setUnisNames] = useState(unisNamess || []);

  let index = 0;
  const animated: any = useRef(null);
  const [flag, setFlag] = useState(true); // to clear data (locations and majors) depending on the name
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setUniDex = (uni: string) => { // set the uni index to fill data locations and majors if founds
    if (unisNames.includes(uni)) {
      // setSearch(uni);
      // setDisplay(false);
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
      setFlag(true);
    } else {
      setUniName(uni);
      setUniID(null);
      if (flag === true) {
        const empty: any = [];
        setLocations(empty);
        setMajors(empty);
        setFlag(false);
      }
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

    if (unisNames[0].length > 0) {
      const temp = unisNames[0];
      setUniDex(temp);
      setSearch(temp);
    }

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
        onBlur={(event) => setUniDex(search)}
      ></input>
      {display && (
        <div ref={wrapperRef} className="autoContainer">
          {unisNames
            .filter((uniName: string) => uniName.indexOf(search) > -1)
            .map((uniName: string) => {
              return (
                <div
                  onClick={() => {
                    setSearch(() => uniName);
                    setUniDex(uniName);
                    setDisplay(false);
                  }}
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
      <DeleteUni
        {...{
          unisDataList,
          setUnisDataList,
          unisNames,
          setUnisNames,
          uniID,
          uniName,
          setUniDex,
          setSearch,
        }}
      />
      <div className="animated" ref={animated}></div>
    </div>
  );
}
