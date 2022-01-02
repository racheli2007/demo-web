import { Sidebar } from "../sidebar/Sidebar";
import { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { History } from "history";
import { RecordGroup } from "../../shared/model/Record";
import "../components.css";
import "./recording.css"
import { useWebRtcStore } from "../../stores/use-webrtc-store";

type Props = {
  history: History;
};

export const RecordGroups = observer((props: Props) => {
  const [errors, setErrors] = useState<string>("")
  const [recordGroups, setRecordGroups] = useState<RecordGroup[]>([]);
  const { recordingStore } = useWebRtcStore()

  useEffect(() => {
    recordingStore.getRecordGroupsList().then((res) => {
      if (res.err) {
        setErrors(res.err["FINAL_FORM/form-error"]);
        setRecordGroups([]);
      }
      else {
        setErrors("");
        setRecordGroups(res.response);
      }
    });

  }, [recordingStore]);

  return (
    <div>
      <Sidebar selected="recording" history={props.history} />
      <div className="main">
        <h2>Record Groups</h2>
        <ul>
          {errors !== "" ? (
            <p>{errors}</p>
          ) : (
            recordGroups.map((group: RecordGroup) => (
              <button
                className="record-group"
                key={group.id}
                onClick={() =>
                  props.history.push("/recording/recordings", {
                    recordgroup: { id: group.id, name: group.name },
                    recordgroups: recordGroups,
                  })
                }
              >
                <h3>{group.name}</h3>
              </button>
            ))
          )}
        </ul>
      </div>
    </div>
  );
});