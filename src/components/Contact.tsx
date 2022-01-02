import { observer } from "mobx-react";
import { History } from "history";
import { Sidebar } from "./sidebar/Sidebar";
import "./components.css"


type Props = {
    history: History;
}

export const Contact = observer((props: Props) => {

  return (
      <div>    
          <Sidebar selected="contact" history={props.history} />
            <div className="main">
                <h2>Contact</h2>
            </div>
        </div>
  );
});
