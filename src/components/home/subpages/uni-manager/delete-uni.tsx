import React from "react";
import Swal from "sweetalert2";
import { OK } from "../../../../constants/status-codes";
import { APIsCaller } from "../../../../requestes/apis-caller";
import { deleteUni } from "../../../../requestes/uni-requests/university";

type deleteUniversity = {
  unisDataList: any;
  setUnisDataList: any;
  unisNames: string[];
  setUnisNames: any;
  uniID: string;
  uniName: string;
  setUniDex: any;
  setSearch: any;
};
export default function DeleteUni({
  unisDataList,
  setUnisDataList,
  unisNames,
  setUnisNames,
  uniID,
  uniName,
  setUniDex,
  setSearch,
}: deleteUniversity) {
  const confirmDelete = async () => {
    const requestParams = { uniID };

    const { status, data } = await APIsCaller({api: deleteUni, requestParams});
    console.log(status,data);
    if (status === OK) {
      Swal.fire("Message", data.message, "success");
      deleteUniLocally();
    } else Swal.fire("Message", data.message, "error");
  };

  const deleteUniLocally = () => {
    setUnisDataList(() =>
      unisDataList.map((uni: any) => {
        if (uniID !== uni.id) return uni;
        else return uni;
      })
    );

    let index = 0;
    let temp: any = [];
    unisDataList.forEach((element: any) => {
      if (element.doc.name !== uniName) {
        temp[index] = element;
        index++;
      }
    });
    setUnisDataList(temp);
    index = 0;
    temp = [];
    unisNames.forEach((element) => {
      if (element !== uniName) {
        temp[index] = element;
        index++;
      }
    });
    setUnisNames(temp);
    setUniDex("");
    setSearch("");
  };

  const deleteUniversity = () => {
    if (uniID !== null) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          confirmDelete();
          // Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    } else if (uniID === null) {
      Swal.fire("Ops", "select a university to delete", "error");
    }
  };

  return (
    <div className="delete-uni-div">
      <button className="delete-uni-btn" onClick={deleteUniversity}>
        Delete University
      </button>
    </div>
  );
}
