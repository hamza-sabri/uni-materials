import Swal from "sweetalert2";
import { OK } from "../../../../constants/status-codes";
import { APIsCaller } from "../../../../requestes/apis-caller";
import { createUni, updateUni } from "../../../../requestes/uni-requests/university";

export default function SubmitBtn({ uniID, uniName, locations, majors }: any) {
  const submit = async () => {
    Swal.showLoading();
    const requestBody = {
      name: uniName,
      locations: locations,
      fields: majors,
    };
    const requestParams = { uniID: uniID };
    if (uniID === null) {
    const {status,data} =  await APIsCaller({ api: createUni, requestBody });
    const {message, uniID} = data;
    if(status === OK)  Swal.fire('Message', message, 'success')
    else Swal.fire('Ops', 'Something went wrong', 'error')
    }else {
      const {status,data} = await APIsCaller({ api: updateUni, requestBody, requestParams });
      if(status === OK)  Swal.fire('Message', data.message, 'success')
      else Swal.fire('Ops!', 'Something went wrong', 'error')
    }
  };
  return (
    <button className="submit-btn" onClick={submit}>
      SUBMIT
    </button>
  );
}
