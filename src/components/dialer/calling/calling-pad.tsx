import { History } from "history";
import {MyTimer} from "../../../shared/timer/timer";
import {MyDate} from "../date";
import { simpleUser, connectWebrtc, domain, call } from "../../../sip/sip";
import { useState,  } from "react";
import Mute from "../../../assets/icons/muteWhite.png";
import UnMute from "../../../assets/icons/unMute.png";
import Hold from "../../../assets/icons/hold.png";
import UnHold from "../../../assets/icons/un_hold.png";

type Props = {
    number: string | null
    history: History;
    hangupCall: any
};

export const CallingPad = (props: Props) => {
    const [isMute, setIsMute] = useState(false)
    const [isHold, setIsHold] = useState(false)

    function hold() {
        if (isHold) {
            simpleUser.unhold().catch(err => {
                console.log(err)
            })
            setIsHold(!isHold)
        }

        else {
            setIsHold(!isHold)
            simpleUser.hold().catch(err => {
                console.log(err)
            })
            
        //    console.log("session",simpleUser.session ) 
            // Waitingsong.pipe(simpleUser.session.outputAudioStream)
        }

    }

  async  function AddCall(){
 await connectWebrtc();
 await call("sip:972548591810@"+domain);
    }
    function keypad(){
    //      simpleUser.session.info( {
    //   requestOptions: {
    //     body: {
    //       contentDisposition: "render",
    //       contentType: "application/dtmf-relay",
    //       content: "Signal=1\r\nDuration=1000"
    //     }
    //   }
    // })
        // simpleUser.session.sessionDescriptionHandler.peerConnection();
        // simpleUser.session.sessionDescriptionHandler.sendDtmf("1");
        // simpleUser.sendDTMF("1")
        
            //  dtmf("1")  
            
            // simpleUser.session.sessionDescriptionHandler.sendDtmf("1",simpleUser.session.options)
            // SessionDescriptionHandler.sendDtmf()
    }
    function mute() {

        if (isMute) {
            try {
                simpleUser.unmute()
                setIsMute(!isMute)
            }
            catch (err) {
                console.log(err)
            }

        }

        else {
            try {
                setIsMute(!isMute)
                simpleUser.mute();
            }
            catch (err) {
                console.log(err)
            }

        }
   
    }
    return (
        <div className="calling-pad">
            <div>
                <h2 className="title calling title-top">Outgoing Call</h2>
                <h2 className="title calling-number title-top">({props.number ? props.number.slice(0, props.number.length - 9) : null}) {props.number ? props.number.slice(-9) : null}</h2>
            </div>
            <div>
                <h4 className="title title-center title-left">Duration</h4>
                <h4 className="title title-center title-right">
                    <MyTimer initialTime={0} startImmediately={true} format="number" ></MyTimer>
                </h4>
            </div>
            <div className="call-menu-calling btn-group">
                <div className="div-menu-calling">
                    <button className="btn btn-circle border div-center">
                        <img
                            src="https://webrtc.phone.do/images/Call_Transfer_Icon_White.png"
                            className="div-center"
                            alt="call transfer"
                        />
                    </button>
                    <p className="title title-small">Call Transfer</p>
                </div>
                <div className="div-menu-calling">
                    <button className="btn btn-circle border div-center" onClick={mute}>
                        <img src={isMute ? UnMute : Mute}
                            className="div-center"
                            alt="mute"></img>
                    </button>
                    <p className="title title-small">{isMute ? "Un mute" : "Mute"}</p>
                </div>
                <div className="div-menu-calling">
                    <button className="btn btn-circle border div-center" onClick={hold}>
                        <img
                            src={isHold ? UnHold : Hold}
                            className="div-center"
                            alt="hold"
                        />
                    </button>
                    <p className="title title-small">{isHold ? "Un hold" : "Hold"}</p>
                </div>
                <div className="div-menu-calling">
                    <button className="btn btn-circle border div-center" onClick={AddCall}>
                        <img
                            src="https://webrtc.phone.do/images/Add_Call.png"
                            className="div-center"
                            alt="add call"
                        />
                    </button>
                    <p className="title title-small">Add Call</p>
                </div>
                <div className="div-menu-calling">
                    <button className="btn btn-circle border div-center" >
                        <img
                            src="https://webrtc.phone.do/images/Block.png"
                            className="div-center"
                            alt="block"
                        />
                    </button>
                    <p className="title title-small">Block Call</p>
                </div>
                <div className="div-menu-calling">
                    <button className="btn btn-circle border div-center" onClick={keypad}>
                        <img
                            src="https://webrtc.phone.do/images/Keyboard.png"
                            className="div-center"
                            alt="keyboard"
                        />
                    </button>
                    <p className="title title-small">Keyboard</p>
                </div>
            </div>
            <div className="hangup">
                <button
                    className="background-red btn btn-square"
                    onClick={props.hangupCall}
                >
                    <img
                        className="div-center"
                        src="https://webrtc.phone.do/images/dial.png"
                        alt="dial"
                    />
                </button>
            </div>
            <div className="date-calling">
                <MyDate></MyDate>
            </div>
        </div>
    );
};
