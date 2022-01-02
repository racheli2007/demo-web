import { useState } from "react";
import { observer } from "mobx-react";
import { History } from "history";
import { Sidebar } from "../sidebar/Sidebar";
import {RecordingSearchForm} from "./recording-search-form";
import {RecordItem} from "./record-item";
import { RecordGroup, Record } from "../../shared/model/Record";
import "../components.css";

type Location = {
  hash: string;
  key: string;
  pathname: string;
  search: string;
  state: { recordgroup: RecordGroup; recordgroups: RecordGroup[] };
};

type Props = {
  history: History;
  location: Location;
};

export const Recordings = observer((props: Props) => {
  const [recording, setRecording] = useState<Record[]>([]);

  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css?family=Rubik"
        rel="stylesheet"
      />
      <Sidebar selected="recording" history={props.history} />
      <div className="main">
        <h2>Recordings for {props.location.state.recordgroup.name}</h2>
        <RecordingSearchForm
          recordgroup={props.location.state.recordgroup.id}
          setRecording={setRecording}
          recordgroups={props.location.state.recordgroups}
        ></RecordingSearchForm>
        {recording?recording.map((record, index) => (
          <RecordItem key={record.callid + index} value={record}></RecordItem>
        )):null}
      </div>
    </div>
  );
});