import { observer } from "mobx-react";
import { History } from "history";
import { Sidebar } from "./sidebar/Sidebar";
import "./components.css"


type Props = {
    history: History;
}

export const Transcripts = observer((props: Props) => {

  return (
      <div>    
          <Sidebar selected="transcripts" history={props.history} />
            <div className="main">
                <h2>Transcripts</h2>
            </div>
        </div>
  );
});
