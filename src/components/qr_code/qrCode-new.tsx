
import { observer } from "mobx-react";
// import { useLingui } from '@lingui/react';
// import { useWebRtcStore } from "../../stores/use-webrtc-store";
import {  useState } from "react";
import "../dialer/dialer.css";
import speaker from "../../assets/icons/speaker.png";


export const QrCodeNew = observer(() => {
  const [speakerPhone, setSpeakerPhone] = useState<boolean>(false);
  const [speakerId, setSpeakerId] = useState<string>();
  const [headsetId, setHeadsetId] = useState<string>();
  const [loading, setLoading] = useState(false);
 
  const start = async (window: any, deviceId: any) => {
    if (window.stream) {
      window.stream.getTracks().forEach((track: any) => {
        track?.stop();
      });
    }
    const audioSource = deviceId;
    const constraints = {
      audio: { deviceId: audioSource ? { exact: audioSource } : undefined },
    };
      setSpeakerPhone(!speakerPhone) 
    navigator.mediaDevices.getUserMedia(constraints).then(gotStream)//.then(gotDevices)
      .catch(handleError);
  }

  const gotDevices = async () => {
    const deviceInfos = await navigator.mediaDevices.enumerateDevices();//await gotStream(a);
    for (let i = 0; i !== deviceInfos.length; ++i) {
      const deviceInfo = deviceInfos[i];
      if (deviceInfo.label.toLowerCase().includes('speaker')) {
        await setSpeakerId(deviceInfo.deviceId);
        start(window, deviceInfo.deviceId)
      }
      else if (deviceInfo.label.toLowerCase().includes('headset')) {
        await setHeadsetId(deviceInfo.deviceId)
      }
    }
  }
 
  // useEffect(() => {
  //   const fetchData = async () => {gotDevices()}
  //   // anyNameFunction();
    
  //   if (!loading){fetchData();
  //   setLoading(true)
  //  } },[loading]);

  if (!loading){gotDevices();
    setLoading(true)
  }

  function gotStream(stream: any) {
    // window.MSStream = stream; // make stream available to console
    // videoElement.srcObject = stream;
    // Refresh button list in case labels have become available
    return navigator.mediaDevices.enumerateDevices();
  }

  function handleError(error: any) {
    console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
  }

  return (
    <div>
      {console.log("speakerPhone",speakerPhone)}
      <div className="select">
        <label htmlFor="audioSource">Audio input source: </label><select id="audioSource"></select>
      </div>
      <div className="select">
        <label htmlFor="audioOutput">Audio output destination: </label><select id="audioOutput"></select>
      </div>
      <audio controls id="remoteAudio">
        <source src="https://www.w3schools.com/tags/horse.ogg" type="audio/ogg"></source>
      </audio>
      <button className={speakerPhone ? "numberBtn numberBtnTouch" : "numberBtn"} onClick={() => { start(window, speakerPhone ? headsetId : speakerId)}}>  <img
        src={speaker}
        className="call-menu-icon-left"
        alt="messages"
      /></button>
      <p>{speakerPhone.toString()}</p>
      <p>speakerId: {speakerId}</p>
      <p>headsetId: {headsetId}</p>
    </div >
  );
});
