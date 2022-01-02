import { observer } from "mobx-react";
import { History } from "history";
import { Sidebar } from "../sidebar/Sidebar";
import "../components.css";
import "./home.css";
import helloImg from "../../assets/images/home.png";
import {Header} from "../header/header";
import { useWebRtcStore } from "../../stores/use-webrtc-store";


type Props = {
    history: History;
}

export const Home = observer((props: Props) => {
    const {  authStore } = useWebRtcStore()

  return (
      <div>   
          <Header></Header> 
          <Sidebar selected="home" history={props.history} />
            <div className="main home">
                <h1>Hello {authStore.extension?.description}!</h1>
                <h3> you're all caught up</h3>
                <img src={helloImg} alt="hello"></img>
            </div>
        </div>
  );
});