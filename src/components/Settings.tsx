import { observer } from "mobx-react";
import { History } from "history";
import { Sidebar } from "./sidebar/Sidebar";
import "./components.css"


type Props = {
    history: History;
}

export const Settings = observer((props: Props) => {

  return (
      <div>    
          <Sidebar selected="settings" history={props.history} />
            <div className="main">
                <h2>Settings</h2>
            </div>
        </div>
  );
});