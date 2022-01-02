import { observer } from "mobx-react";
import { History } from "history";
import { Sidebar } from "./sidebar/Sidebar";
import "./components.css"


type Props = {
    history: History;
}

export const Messages = observer((props: Props) => {

  return (
      <div>    
          <Sidebar selected="messages" history={props.history} />
            <div className="main">
                <h2>Messages</h2>
            </div>
        </div>
  );
});
