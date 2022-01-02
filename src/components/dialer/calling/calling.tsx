
import { observer } from "mobx-react";
import { History } from "history";
import { Sidebar } from "../../sidebar/Sidebar";
import { call, hangup  } from "../../../sip/sip"
import "../../components.css";
import "./calling.css";
import { useState  } from "react";
import animationCalling from "../../../assets/images/animation_calling.png"
import {Header} from "../../header/header";
import {Extensions} from "../extensions";
import {CallingPad} from "./calling-pad";
import {MyTimer} from "../../../shared/timer/timer";


type Location = {
  state: { destination: string };
};

type Props = {
  history: History;
  location: Location
};

export const Calling = observer((props: Props) => {

  const [isload, setIsload] = useState(false)
  const [isHangup, setIsHangup] = useState(false)
  const [isTimer, setIsTimer] = useState(false)
  const [desciptionCall, setDesciptionCall] = useState("Calling...")

  async function calling(destination: string) {
    await call(destination).catch(err => {
      console.log(err)
    })
 

    setIsTimer(true)
  }
  if (!isload) {
    try {
      calling(props.location.state.destination).catch(err => {
        console.log(err)
      })
    }
    catch (err) {
      console.log(err)
    }
    setIsload(true)
  }

  async function hangupCall() {
    setIsTimer(false)
    setDesciptionCall("Call ended")
    setIsHangup(true)
    await hangup().catch(err => {
      console.log(err)
    })
    var sec = 0;
    var interval = setInterval(() => {
      sec++;
      if (sec === 2) {
        clearInterval(interval)
        props.history.push("/dialer");

      }
    }, 1000);



  }
  // async function keypad() {

    // var session = await initSession();
 
    // session.info( {
    //   requestOptions: {
    //     body: {
    //       contentDisposition: "render",
    //       contentType: "application/dtmf-relay",
    //       content: "Signal=1\r\nDuration=1000"
    //     }
    //   }
    // })
    // var pc = session.sessionDescriptionHandler?.peerConnection;

    // session.sessionDescriptionHandler?session.sessionDescriptionHandler.sendDtmf("1"):console.log("noooo");

    // simpleUser.sendDTMF("1")

    // }
  // }

  window.onload = async function (e: { preventDefault: () => void; }) {
    e.preventDefault();
    // const backgroundAudio=document.getElementById("remoteAudio") as HTMLMediaElement;
    // backgroundAudio.volume=0.5;
    // // backgroundAudio.setSinkId
    // const devices = await navigator.mediaDevices.enumerateDevices();
    // const audioDevices = devices.filter(device => device.kind === 'audiooutput');
    // console.log("audioDevices: ",audioDevices) 
    await hangup().catch(err => {
      console.log(err) 
    });
    props.history.push("/dialer");

  };

  window.onbeforeunload = async function (e: { preventDefault: () => void; }) {
    e.preventDefault();
    await hangup().catch(err => {
      console.log(err)
    });
    props.history.push("/dialer");

  };

  return (
    <div>
      <Header></Header>
      <Sidebar selected="dialer" history={props.history} />
      <Extensions history={props.history}></Extensions>
      {/* &&props.location.state ? */}
      {/* number={props.location.state.destination?props.location.state.destination.slice(4).split('@')[0]:null} */}
      {!isHangup ? <CallingPad number={props.location.state ? props.location.state.destination.slice(4).split('@')[0] : null} history={props.history} hangupCall={hangupCall} ></CallingPad> : null}
      <div className="main">
        <audio  controls id="remoteAudio"></audio>
        <p className="desciption-call">{isTimer ? <MyTimer initialTime={0} startImmediately={true} format=""></MyTimer> : desciptionCall}</p>
        <img className="animation-calling" src={animationCalling} alt="animation-calling"></img>

      </div>
    </div >
  );
});
