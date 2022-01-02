
import { observer } from "mobx-react";
import { useCallback, useEffect, useState } from "react";
import { useWebRtcStore } from "../../stores/use-webrtc-store";
import { Hotline } from "../../shared/model/hotline";
import { useLingui } from "@lingui/react";
import styles from "./qrCode.module.scss";
import logoWhite from "../../assets/images/logoWhite.png"
import speaker from "../../assets/icons/speaker.png";
import { simpleUser } from "../../sip/sip";
import { Web } from "sip.js";
import { MyTimer } from "../../shared/timer/timer";
import Timer from "react-compound-timer";
import React from "react";

type Props = {
  location: Location;
  match: any

};


type Status = 'hangup' | 'call';

export const QrCode = observer((props: Props) => {


  let videoElement: any;
  let audioInputSelect: any;
  let audioOutputSelect: any;
  const { i18n } = useLingui();
  const hotlineId = props.match.params.hotlineId;
  const { qrCodeStore, makeACallStore } = useWebRtcStore()
  const [status, setStatus] = useState<Status>('hangup')
  const [errors, setErrors] = useState()
  const [hotline, setHotline] = useState<Hotline>()
  // const [videoElement, setVideoElement] = useState<any>();
  const [selectors, setSelectors] = useState<any[]>([]);
  const [speakerPhone, setSpeakerPhone] = useState<boolean>(false);
  const [speakerId, setSpeakerId] = useState<string>();
  const [headsetId, setHeadsetId] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [render, setRender] = useState(false);
  const [audio, setAudio] = useState(null);
  const [startImmediately, setStartImmediately] = useState<boolean>(true);
  const [initialTime, setInitialTime] = useState(0);

  const to = '+972548591810'
  // const to = '+972552996071'

  // const to = '+972548591810'

  const onload = useCallback(async () => {
    await makeACallStore.onLoad();
    setStartImmediately(true);
  // await  makeACallStore.call(to)
    // const response = await qrCodeStore.getHotlineDetails(hotlineId)
    // if (response.err)
    //   setErrors(response.err['FINAL_FORM/form-error']);
    // else
    //   setHotline(response.response)
  }, [makeACallStore, qrCodeStore, hotlineId, startImmediately])

  useEffect(() => {
    onload()


    // setSelectors([document.querySelector('select#audioSource'), document.querySelector('select#audioOutput')])
    // makeACallStore.onLoad();

  }, [])

  // async function setupRemoteMedia(simpleUser: Web.SimpleUser) {
  //   let remoteStream = new MediaStream();
  //   let remoteAudio = document.getElementById('remoteAudio') as HTMLAudioElement;
  //   let device;
  //   const deviceInfos = await window.navigator.mediaDevices.enumerateDevices();//await gotStream(a);
  //   for (let i = 0; i !== deviceInfos.length; ++i) {
  //     const deviceInfo = deviceInfos[i];
  //     if (deviceInfo.label.toLowerCase().includes('speaker')) {

  //     }
  //     else if (deviceInfo.label.toLowerCase().includes('headset')) {

  //     }
  //   }
  //   //  let  localStream = new MediaStream();


  //   //  let localMedia = document.getElementById('localVideo');

  //   simpleUser.session.sessionDescriptionHandler.peerConnection.getReceivers().forEach((receiver: any) => {
  //     console.log("getReceivers", receiver)
  //     if (receiver.track) {
  //       // remoteStream.addTrack(receiver.track);
  //     }
  //   });

  //   if (remoteAudio) {

  //     console.log("remoteAudio", remoteAudio.srcObject)
  //     remoteAudio.setMediaKeys(device?.deviceId as unknown as MediaKeys);

  //     remoteAudio.play();
  //   }

  //   simpleUser.session.sessionDescriptionHandler.peerConnection.getSenders().forEach((sender: any) => {
  //     console.log("getReceivers", sender);
  //     if (sender.track) {
  //       // this.localStream.addTrack(sender.track);
  //     }
  //   });
  //   // this.localMedia.srcObject = this.localStream;

  // }


  window.onload = async function (e: any) {
    // audioInputSelect = document.querySelector('select#audioSource');
    // videoElement = document.getElementById('remoteAudio');
    // audioOutputSelect = document.querySelector('select#audioOutput');
    // audioInputSelect.onchange = start;
    // audioOutputSelect.onchange = changeAudioDestination;
    e.preventDefault();
    await makeACallStore.hangup();
    // setStartImmediately(false)

  };

  window.onbeforeunload = async function (e: any) {
    e.preventDefault();
    await makeACallStore.hangup();
    // setStartImmediately(false)

  }

  const doState = async () => {
    debugger;
    if (status === 'hangup') {
      await makeACallStore.hangup();
    setStartImmediately(false);
    setInitialTime(0);
      setStatus('call')
    }
    else {
      await makeACallStore.call(to);
      setStatus('hangup')
      setStartImmediately(true);
    }
  };

  // const start = async (window: any, deviceId: any) => {
  //   if (window.stream) {
  //     window.stream.getTracks().forEach((track: any) => {
  //       track?.stop();
  //     });
  //   }
  //   const audioSource = deviceId;
  //   const constraints = {
  //     audio: { deviceId: audioSource ? { exact: audioSource } : undefined },
  //   };
  //   setSpeakerPhone(!speakerPhone)
  //   navigator.mediaDevices.getUserMedia(constraints).then(gotStream)//.then(gotDevices)
  //     .catch(handleError);
  //   // setRender(!render);
  // }

  // function changeAudioDestination() {
  //   const audioDestination = audioOutputSelect.value;
  //   attachSinkId(videoElement, audioDestination);
  //   setSpeakerPhone(!speakerPhone);
  // }
  // function attachSinkId(element: any, sinkId: any) {
  //   if (typeof element.sinkId !== 'undefined') {
  //     element.setSinkId(sinkId)
  //       .then(() => {
  //         console.log(`Success, audio output device attached: ${sinkId}`);
  //       })
  //       .catch((error: any) => {
  //         let errorMessage = error;
  //         if (error.name === 'SecurityError') {
  //           errorMessage = `You need to use HTTPS for selecting audio output device: ${error}`;
  //         }
  //         console.error(errorMessage);
  //         // Jump back to first output device in the list as it's the default.
  //         audioOutputSelect.selectedIndex = 0;
  //       });
  //   } else {
  //     console.warn('Browser does not support output device selection.');
  //   }
  // }

  // const gotDevices = async () => {
  //   const values = selectors?.map((select: any) => select.value);
  //   selectors?.forEach((select: any) => {
  //     while (select.firstChild) {
  //       select.removeChild(select.firstChild);
  //     }
  //   });

  //   selectors?.forEach((select: any, selectorIndex: any) => {
  //     if (Array.prototype.slice.call(select.childNodes).some(n => n.value === values[selectorIndex])) {
  //       select.value = values[selectorIndex];
  //     }
  //   });
  //   const deviceInfos = await window.navigator.mediaDevices.enumerateDevices();//await gotStream(a);
  //   for (let i = 0; i !== deviceInfos.length; ++i) {
  //     const deviceInfo = deviceInfos[i];
  //     if (deviceInfo.label.toLowerCase().includes('speaker')) {
  //       await setSpeakerId(deviceInfo.deviceId);
  //       start(window, deviceInfo.deviceId)
  //     }
  //     else if (deviceInfo.label.toLowerCase().includes('headset')) {
  //       await setHeadsetId(deviceInfo.deviceId)
  //     }
  //     const option = document.createElement('option');
  //     option.value = deviceInfo.deviceId;
  //     if (deviceInfo.kind === 'audioinput') {
  //       option.text = deviceInfo.label || `microphone ${audioInputSelect?.length + 1}`;
  //       document.querySelector('select#audioSource')?.appendChild(option);
  //       // audioInputSelect?.appendChild(option);
  //     } else if (deviceInfo.kind === 'audiooutput') {
  //       option.text = deviceInfo.label || `speaker ${audioOutputSelect?.length + 1}`;
  //       // audioOutputSelect?.appendChild(option);
  //       document.querySelector('select#audioOutput')?.appendChild(option);

  //     }

  //     else {
  //       console.log('Some other kind of source/device: ', deviceInfo);
  //     }
  //   }
  //   selectors.forEach((select: any, selectorIndex: any) => {
  //     if (Array.prototype.slice.call(select.childNodes).some(n => n.value === values[selectorIndex])) {
  //       select.value = values[selectorIndex];
  //     }
  //   })
  // }

  // if (!loading) {

  //   gotDevices();
  //   setLoading(true)
  // }

  // function gotStream(stream: any) {
  //   // window.MSStream = stream; // make stream available to console
  //   // videoElement.srcObject = stream;
  //   // Refresh button list in case labels have become available
  //   return navigator.mediaDevices.enumerateDevices();
  // }

  // function handleError(error: any) {
  //   console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
  // }
  // function setupRemoteMedia(session:Session) {
  //   let localStream = new MediaStream();
  //   let remoteStream = new MediaStream();
  //   let remoteMedia = document.getElementById('remoteAudio');
  //   let localMedia = document.getElementById('remoteAudio');

  //   // session.sessionDescriptionHandler.peerConnection.getReceivers().forEach((receiver:any) => {
  //     if (receiver.track) {
  //       remoteStream.addTrack(receiver.track);
  //     }
  //   });
  // if(remoteMedia){
  // remoteMedia.srcObject = remoteStream;
  // remoteMedia.play();
  // }

  // session.sessionDescriptionHandler.peerConnection.getSenders().forEach((sender:any) => {
  //   if (sender.track) {
  //     localStream.addTrack(sender.track);
  //   }
  // });
  // localMedia.srcObject = localStream;
  // localMedia.play();
  // }
  function start(){

  }
  return (
    <body className={`${styles.body} hm-100 container-fluid`}>
      <audio id="remoteAudio"></audio>
      <div className={i18n._locale === 'he' ? `${styles.hebrow}` : `${styles.english}`}>
        <div className="row" >
          <div className="col">
            <img className={`${styles.logoCompany} d-flex`} src={logoWhite} alt="" />
            <div className={`d-flex flex-column`}>
              <div className={`${styles.textAbout} d-flex`} >
                <p>
                  {i18n._('You are transferred to a sales center')}
                  <br />
                  {i18n._('Please wait while we connect you')}{' '}
                  {i18n._('to an English speaking sales representative')}
                </p>
              </div>
              <div id="theCalling" className={`${styles.call} d-flex`}>
                <p className={`${styles.calling}`}>
                  {i18n._('Calling...')}
                </p>
              </div>
              <img className={`${styles.callingImageGroup} `} src="//stt.dev.phone.do/images/group.png" alt="" />
              <div className={`${styles.timer} d-flex`} id="timer">
                <p className={`${styles.timerNum}`}>
                  {
  console.log("props.startImmediately",startImmediately)

                  }
                  {startImmediately===true?<MyTimer initialTime={initialTime} startImmediately={true} format='number'></MyTimer>:
                  <p>00:00:00</p>
                  // <p>hanpup</p>
                  }

                </p>
              </div>
              <img className={`${styles.callingImageGroupMobile} `} src="//stt.dev.phone.do/images/group.png" alt="" />
              {/* <button className={speakerPhone ? "numberBtn numberBtnTouch" : "numberBtn"} onClick={() => { start(window, speakerPhone ? headsetId : speakerId) }}>  <img
                src={speaker}
                className="call-menu-icon-left"
                alt="messages"
              /></button> */}
              {/* <button onclick={clearInterval(timerVar)} id="button-hangup">hangup</button>   */}
              <div className="d-flex">
                <button onClick={doState} className={`${styles.buttonCall}`} id="button-call">
                  {i18n._(status)}
                </button>
              </div>
              {/* <div className="select">
                <label htmlFor="audioSource">Audio input source: </label>
                <select id="audioSource"></select>
              </div>
              <div className="select">
                <label htmlFor="audioOutput">Audio output destination: </label><select id="audioOutput"></select>
              </div> */}
              <div className={`${styles.textKnown} d-flex`}>
                {i18n._('This free call is made using revolutionary technology.')}{' '}
                {i18n._('This is a concrete example of how you as a viatelcustomer can communicate with customers from all over the world,')}{' '}
                {i18n._('including website, posts, articles, applications, print publications in the newspaper and street ads')}{' '}
                {i18n._('in any language, field, purpose and task.')}{' '}

              </div>
            </div>

          </div>
          {/* 
            <img src="//stt.dev.phone.do/images/calls.gif" className={`${styles.callsImage} d-flex`} alt=""/>
           */}
          <div className="col">
            <img src="//stt.dev.phone.do/images/calls.gif" className={`${styles.callsImage}`} alt="" />
          </div>
        </div>
      </div>
      <div className="err">{errors}</div>
    </body>
  );
});











