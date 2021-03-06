import React, { useEffect } from "react";
import { APIsCaller } from "../../../../requestes/apis-caller";
import { createUni, updateUni } from "../../../../requestes/uni-requests/university";

export default function SubmitBtn({ uniID, uniName, locations, majors }: any) {
  const submit = async () => {
    const requestBody = {
      name: uniName,
      locations: locations,
      fields: majors,
    };
    const requestParams = { uniID: uniID };
    if (uniID === null) {
      await APIsCaller({ api: createUni, requestBody });
    }else {
      await APIsCaller({ api: updateUni, requestBody, requestParams });
    }
  };
  return (
    <button className="submit-btn" onClick={submit}>
      SUBMIT
    </button>
  );
}
