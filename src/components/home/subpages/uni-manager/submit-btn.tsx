import Swal from "sweetalert2";
import { CREATED, OK } from "../../../../constants/status-codes";
import { APIsCaller } from "../../../../requestes/apis-caller";
import {
  createUni,
  updateUni,
} from "../../../../requestes/uni-requests/university";

type submitData = {
  uniID: string;
  uniName: string;
  locations: string[];
  majors: string[];
  unisDataList: any;
  setUnisDataList: any;
  unisNames: string[];
  setUnisNames: any;
  setUniID: any;
};
type university = {
  id: string;
  doc: doc;
};
type doc = {
  name: string;
  fields: string[];
  locations: string[];
};
export default function SubmitBtn({
  uniID,
  uniName,
  locations,
  majors,
  unisDataList,
  setUnisDataList,
  unisNames,
  setUnisNames,
  setUniID
}: submitData) {
  const submit = async () => {
    if (uniName === "") {
      Swal.fire("Ops", "Enter the University name", "error");
    } else {
      Swal.showLoading();
      const requestBody = {
        name: uniName,
        locations: locations,
        fields: majors,
      };
      const requestParams = { uniID: uniID };
      if (uniID === null) {
        const { status, data } = await APIsCaller({
          api: createUni,
          requestBody,
        });
        const { message , uniID } = data;
        if (status === OK || status === CREATED) {
          Swal.fire("Message", message, "success");
          const uni = {
            id: uniID,
            doc: requestBody,
          };
          setUnisDataList([...unisDataList, uni]);
          setUnisNames([...unisNames, uniName]);
          setUniID(uniID);
        } else Swal.fire("Ops", "Something went wrong", "error");
      } else {
        const { status, data } = await APIsCaller({
          api: updateUni,
          requestBody,
          requestParams,
        });
        if (status === OK) {
          Swal.fire("Message", data.message, "success");

          const updatedUni = {
            id: uniID,
            doc: requestBody,
          };

          setUnisDataList(() =>
            unisDataList.map((uni: any) => {
              if (uniID !== uni.id) return uni;
              else return updatedUni;
            })
          );
        } else Swal.fire("Ops!", "Something went wrong", "error");
      }
    }
  };
  return (
    <div className="submit-btn-div">
      <button className="submit-btn" onClick={submit}>
        SUBMIT
      </button>
    </div>
  );
}
