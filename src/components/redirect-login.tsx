import { useEffect } from "react";
import { observer } from "mobx-react";
import { History } from "history";
import loadingGif from ".././assets/icons/loading.gif"

type Props = {
  history: History;
  to:string;
};

export const RedirectLogin = observer((props: Props) => {
  useEffect(() => {
    const sleep = (milliseconds: number) => {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };
    const wait = async () => {
      await sleep(5000).then((response) => {
        console.log(response, "here");
        props.history.push("/login",{to:props.to});
      });
    };

    wait();
  }, [props.history,props.to]);
  return (
    <div style={{ textAlign: "center" }}>
      <h1>
        It's been a while since you logged in and you need to login again.
      </h1>
      <h2>You will redirect to the login page in 5 seconds.</h2>

      <img src={loadingGif} alt="wait gif"></img>
    </div>
  );
});