import { observer } from "mobx-react";
import React, { useEffect } from "react";
import Timer  from "react-compound-timer";
type Props = {
  initialTime:number,
  startImmediately:boolean,
  format: string
};

export const MyTimer =observer((props: Props) => {

  useEffect(() => {

  }, [props.initialTime,props.startImmediately])

  console.log("props.startImmediately",props.startImmediately)
  return (
    <Timer
    initialTime={props.initialTime}
      startImmediately={props.startImmediately}
      formatValue={(value: number) => `${value < 10 ? `0${value}` : value}`}
    >
      {" "}
      <Timer.Days
        formatValue={(value: number) =>
          `${value > 0 ? (value < 10 ? `0${value}:` : `${value}:`) : ""}`
        }
      />{" "}
      <Timer.Hours
        // formatValue={(value: number) =>
        //   `${value > 0 ? (value < 10 ? `0${value}:` : `${value}:`) : ""}`
        // }
      />:
      <Timer.Minutes />:<Timer.Seconds />{" "}
    </Timer>
    
 );
});