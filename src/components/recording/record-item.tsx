import { useState } from "react";
import { Record } from "../../shared/model/Record";
import { useWebRtcStore } from "../../stores/use-webrtc-store";

type Props={
  value:Record
}
export const RecordItem = (props: Props) => {
  const [errors,setErrors]=useState<string>("")
  const { recordingStore } = useWebRtcStore()

  var start = new Date(parseInt(props.value.start) * 1000).toISOString();
  var end = new Date(parseInt(props.value.end) * 1000).toISOString();
  var totaltime = new Date(Number(props.value.totaltime) * 1000)
    .toISOString()
    .substr(11, 8);

  const downloadRecord = (
    recordgroup: string,
    recordid: string,
    recordfile: string
  ) => {
    var a = document.createElement("a");
    a.download = `record-${recordgroup}-${recordid}`;
    a.setAttribute("href", "data:audio/wav;base64," + recordfile);
    a.click();
  };

  const onClickDownload = async (
    recordgroup: string,
    uniqueid: string,
    recordid: string
  ) => {
    const params = {
      recordgroup: recordgroup,
      uniqueid: uniqueid,
      recordid: recordid,
      encoding: "base64",
    };
   
     const res= await recordingStore.getRecordFile(params)
     if(res.err)
     setErrors(res.err["FINAL_FORM/form-error"])
     else   
     downloadRecord(recordgroup, recordid,res.response.data);
    
  };

  return (
    <div>
      <p>
        {props.value.cnumber_display} - {props.value.snumber_display}
        {totaltime} on {start} Expires {end}{" "}
        <button
          onClick={() =>
            onClickDownload(
              props.value.recordgroup,
              props.value.uniqueid,
              props.value.recordid
            )
          }
        >
          Download
        </button>
      </p>
      <div id="err"> {errors}</div>
    </div>
  );
};