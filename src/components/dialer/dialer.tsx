import { observer } from "mobx-react";
import { History } from "history";
import { Sidebar } from "../sidebar/Sidebar";
import {Header} from "../header/header";
import {DialerPad} from "./dialer-pad";
import "../components.css";
import "./dialer.css";
import {Extensions} from "./extensions";
import { useEffect } from "react";
import { hangup } from "../../sip/sip";
import { connectWebrtc } from "../../sip/sip";


type Props = {
  history: History;
};

export const Dialer = observer((props: Props) => {

  useEffect(() => {

    hangup().catch(err => {
      console.log(err)
    })
    connectWebrtc().catch(err => {
      console.log(err)
    });

  })


  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css?family=Rubik"
        rel="stylesheet"
      />
      <Header></Header>
      <Sidebar selected="dialer" history={props.history} />
      <Extensions history={props.history}></Extensions>
      <DialerPad history={props.history}></DialerPad>
      <div className="menu-btn-hr">
        <button className="dialer-btn call-menu-btn call-menu-btn-left">
          <img
            src="https://webrtc.phone.do/images/Messages_Unselected_Icon.png"
            className="btn-icon call-menu-icon-left"
            alt="messages"
          />
          <p className="call-menu-text">Voice mail</p>
          <img
            src="https://webrtc.phone.do/images/red_ellipse.png"
            className="btn-icon call-menu-icon-right"
            alt="voice mail"
          />
        </button>
        <button className="dialer-btn call-menu-btn call-menu-btn-right">
          <img
            src="https://webrtc.phone.do/images/Do_Not_Disturb_Icon.png"
            className="btn-icon call-menu-icon-right"
            alt="do not disturb"
          />
          <p className="call-menu-text">Do not disturb</p>
          <img
            src="https://webrtc.phone.do/images/red_ellipse.png"
            className="btn-icon call-menu-icon-right"
            alt="do not disturb"
          />
        </button>
      </div>
      <div className="menu-btn-hr-bottom">
        <button className="dialer-btn call-menu-btn call-menu-btn-left call-menu-btn-buttom">
          <img
            src="https://webrtc.phone.do/images/call_transfer_icon.png"
            className="btn-icon call-menu-icon-left"
            alt="call transfer"
          />
          <p className="call-menu-text">Call Transfer</p>
          <img
            src="https://webrtc.phone.do/images/red_ellipse.png"
            className="btn-icon call-menu-icon-right"
            alt="call transfer"
          />
        </button>
        <button className="dialer-btn call-menu-btn call-menu-btn-right call-menu-btn-buttom">
          <img
            src="https://webrtc.phone.do/images/conference_room_icon.png"
            className="btn-icon call-menu-icon-left"
            alt="conference room"
          />
          <p className="call-menu-text">Conference Call</p>
          <img
            src="https://webrtc.phone.do/images/red_ellipse.png"
            className="btn-icon call-menu-icon-right"
            alt="conference call"
          />
        </button>
      </div>
    </div>
  );
});
