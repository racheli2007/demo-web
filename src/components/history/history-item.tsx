import { HistoryCall } from "./store/history-store";

type Props = {
  call: HistoryCall;
};

export const HistoryItem = (props: Props) => {
  const { call } = props;

  // const format=(num:number)=>{
  //     return num<10?`0${num}`:`${num}`;
  // }
function convertToDate(time:number){
  var theDate = new Date(time);


  // const hour=Number(time)>3600?`${format(Math.floor(Number(time)/3600))}:`:"";
  // const minutes=format(Math.floor((Number(time)%3600)/60));
  // const seconds=format(Number(time)%60);
return theDate;
// return   new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(time)

// `${hour}${minutes}:${seconds}`;
}
  return (
    <div>
      {call.dnumber === localStorage.getItem("extension")
        ? `${call.callerid_internal} <- ${convertToDate(Number(call.talktime))}`
        : `${call.dnumber} Outbound  ${convertToDate(Number(call.start)*1000)} ${convertToDate(Number(call.end)*1000)}`}
    </div>
  );
};
