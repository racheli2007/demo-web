import { useEffect } from "react";
import { Login } from "./components/login/login";
import {RedirectLogin} from "./components/redirect-login";
import { useWebRtcStore } from "./stores/use-webrtc-store";

export const Page = (props: any) => {
  const { apiClient } = useWebRtcStore()

  useEffect(() => {
    document.title = "Phone.Do " + (props.title || "");
  }, [props.title]);

  const MILI_SECONDS_PER_HOUR = 60 * 60 * 1000;

  //if token provided, or its login page
  if (
    props.title === "Login" ||
    (localStorage.getItem(apiClient.USER_TOKEN_KEY) &&
      Number(sessionStorage.getItem("login_time")) >
        new Date().getTime() - 24 * MILI_SECONDS_PER_HOUR)
  ) {
    return props.children;
  }

  //if no token provided or if tab closed then must login again
  if (
    !localStorage.getItem(apiClient.USER_TOKEN_KEY) ||
    !sessionStorage.getItem("login_time")
  )
    return (
      <Login
        history={props.children[1].props.history}
        location={{
          state: { to: `${props.children[1].props.location.pathname}` },
        }}
      ></Login>
    );

  return (
    <RedirectLogin
      history={props.children[1].props.history}
      to={`${props.children[1].props.location.pathname}`}
    ></RedirectLogin>
  );

  // if (localStorage.getItem(USER_TOKEN_KEY)) {
  //   return (
  //     <RedirectLogin
  //       history={props.children[1].props.history}
  //       to={`${props.children[1].props.location.pathname}`}
  //     ></RedirectLogin>
  //   );
  // }

  // return (
  //   <Login
  //     history={props.children[1].props.history}
  //     location={{
  //       state: { to: `${props.children[1].props.location.pathname}` },
  //     }}
  //   ></Login>
  // );
};