import { observer } from "mobx-react";
import { History } from "history";
import { Sidebar } from "../sidebar/Sidebar";
import { HistorySearchForm } from "./history-search-form";
import { useState } from "react";
import { HistoryCall } from "./store/history-store";
import { HistoryItem } from "./history-item";
import "../components.css";
import "./history.css";
import { useWebRtcStore } from "../../stores/use-webrtc-store";

type Props = {
  history: History;
};

export const HistoryCalls = observer((props: Props) => {
  const {  authStore } = useWebRtcStore()
  const [historycalls, setHistoryCalls] = useState<HistoryCall[]>([]);
  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css?family=Rubik"
        rel="stylesheet"
      />
      <Sidebar selected="history" history={props.history} />
      <div className="main">
        <HistorySearchForm setHistoryCalls={setHistoryCalls} />
        {console.log("historycalls",historycalls)}
        {historycalls?.map((call) => {
          let x=0
          if (
            call.dnumber === authStore.extension?.name ||
            call.callerid_internal === authStore.extension?.name
          )
          {console.log(x++)}
            return (
              <HistoryItem key={call.callid + call.uniqueid} call={call} />
            );
        })}
        <div id="historyCalls"></div>
      </div>
    </div>
  );
});