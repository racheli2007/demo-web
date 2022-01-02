import { useEffect, useState } from "react";
import {DialerPadBtn} from "./dialer-pad-btn";
import { History } from "history";
import { domain } from "../../sip/sip";

type Props = {
  history: History;
};

export const DialerPad = (props: Props) => {
  const [numberToCall, setNumberToCall] = useState("");
  const [touch, setTouch] = useState<number| string>();
  const numbers = {
    1: { letters: "END", order: 1 },
    2: { letters: "ABC", order: 1 },
    3: { letters: "DEF", order: 1 },
    4: { letters: "GHI", order: 2 },
    5: { letters: "JKL", order: 2 },
    6: { letters: "MNO", order: 2 },
    7: { letters: "PQRS", order: 3 },
    8: { letters: "TUV", order: 3 },
    9: { letters: "WXYZ", order: 3 },
    "*": { letters: "*", order: 4 },
    0: { letters: "+", order: 4 },
    "#": { letters: "#", order: 4 },
  };

  var playSound = (function beep() {
    var snd = new Audio(
      "data:audio/wav;base64,SUQzAwAAAAADHlRBTEIAAAApAAAB//5mAHIAZQBlAHMAbwB1AG4AZABlAGYAZgBlAGMAdAAuAG4AZQB0AFRQRTEAAAApAAAB//5mAHIAZQBlAHMAbwB1AG4AZABlAGYAZgBlAGMAdAAuAG4AZQB0AFRZRVIAAAALAAAB//4yADAAMQA2AFREQVQAAAALAAAB//4wADEAMAAxAFRFTkMAAABTAAAB//5XAGEAdgBlAFAAYQBkACAARgByAGUAZQAgAEgAbwBtAGUAIABWAGUAcgBzAGkAbwBuACAAqQAgAE4AQwBIACAAUwBvAGYAdAB3AGEAcgBlAFRDT04AAAALAAAB//4oADEANwApAFRJVDIAAABTAAAB//5jAGwAaQBjAGsAIABmAGkAbgBnAGUAcgBzACAAIABzAGkAbgBnAGwAZQAgAGMAbABpAGMAawAgAHMAbwB1AG4AZAAgAGUAZgBmAGUAYwB0AFRSQ0sAAAANAAAB//4wADQALwAxADYAQ09NTQAAAB4AAAFlbmf//gAA//5lAHgAYwBlAGwAbABlAG4AdAAhAP/zgAQAAAAAAAAAAAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAA0IAVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq////////////////////////////////////////////AAAAOUxBTUUzLjk5cgFuAAAAACxoAAAUQCQEaSYAAEAAAANC88aJlAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/84AEAAgAA2aqBAAAEQAG0jYIRgAgcIAXBnyYIAg6fKAgc5QEATP5QHwfB8P8Tg+CBzKAgCByo5+gHw/y4Pg+f6wcBAEPEAIAN///pE4f//lAwn+XkajpVVgAoOoEAQD5fBMHwfP8uD5rpBAEAQ4gBAEAfflwfB8H/E4E8oCDv/+sHwfD/pBAEAQOfB8Hz/7v1AgD4f/+UBAHSBBAqCoKnVgqCoKgsHcFQaBoO1A0DQNA0dqBoGQVBUFdYKgqC2VBUGj2LA0DQNcGgaBkNZYF//OCBDcKbANktQAjABUIAtZcAEYAQVBUNawVBUGgafqBoGgaJf///iUFQafxEDQNA1J63WkiUojBYGgaDosDQNA0DQK1A0DIKncSgqCoKndYKg0DXEQNA0DR3EQMgqCrsSgqCp0O4lEXBY95YGgaPdQlBUFTvrEQNB0O+DQKgqCv1g0DQdVMQU1FMy45OUxBTUUzLjk5LjVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/84IEQwAAAaQAAAAAAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVRBRwBsaWNrIGZpbmdlcnMgIHNpbmdsZSBjbGljayBzb2ZyZWVzb3VuZGVmZmVjdC5uZXQAAAAAAAAAAAAAAGZyZWVzb3VuZGVmZmVjdC5uZXQAAAAAAAAAAAAAADIwMTYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQR"
    );
    return function () {
      snd.play();
    };
  })();

  const onKeyDown = (eve: React.KeyboardEvent<HTMLDivElement>): void => {
    if (
      (eve.key >= "0" && eve.key <= "9" && !eve.shiftKey) ||
      (Number(eve.key) >= 96 && Number(eve.key) <= 107) ||
      eve.key === "#" ||
      eve.key === "*"
    ) {
      digitBtn(eve.key);
    } else if (eve.key === "Backspace") {
      onClickDelete();
    }
    else if(eve.key==="Eanter")
    calling();
    eve.preventDefault();
  };

  const digitBtn = (num: number | string) => {
    setTouch(num)
    playSound();
    if (numberToCall.length < 16) {
      setNumberToCall(numberToCall + num);
    }
  };

  const onClickDelete = () => {
    playSound();
    setNumberToCall(numberToCall.slice(0, -1));
  };

  const getSipNumber = () => {
    if (numberToCall.length < 7) {
      return `sip:-${numberToCall}@${domain}`;
    }
    return `sip:${numberToCall}@${domain}`;
  };

  async function calling() {
    props.history.push("dialer/calling", { destination: getSipNumber() });
  }

  useEffect(() => {
    document.getElementById("dialer")?.focus();
  });

  return (
    <div className="dialer" id="dialer" onKeyDown={onKeyDown} tabIndex={0}>
      <div className="demo-window"></div>
      <audio id="remoteAudio"></audio>
      <div className="clearfix"></div>

      {numberToCall === "" ? (
        <div className="msg">Type a number or extension</div>
      ) : (
        <div>
          <div className="number">{numberToCall}</div>
          <button className="delete" onClick={onClickDelete}>
            x
          </button>
        </div>
      )}
      <div className="digits">
        <div className="">
          {Object.entries(numbers).map(([num, val]) => (
            <DialerPadBtn
              touch={touch===num?true:false}
              number={num}
              onClick={() => digitBtn(num)}
              order={val.order}
              key={num}
            ></DialerPadBtn>
          ))}
        </div>
      </div>

      <button className="background-green btn call" onClick={calling}>
        <img
          className="div-center"
          src="https://webrtc.phone.do/images/dial.png"
          alt="dial"
        />
      </button>
    </div>
  );
};