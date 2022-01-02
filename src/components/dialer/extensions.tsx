import { useEffect, useState } from "react";
import { Extension } from "../../shared/model/user-onboarding";
import { History } from "history";
import {ExtensionBtn} from "./extension-btn";
import { Call } from "../../shared/model/call";
import { useWebRtcStore } from "../../stores/use-webrtc-store";
import { useCallback } from "react";

type Props = {
  history: History;
};

export const Extensions = (props: Props) => {
  const { dialerStore, authStore } = useWebRtcStore()
  const [activeCalls, setActiveCalls] = useState<Call[] | null>([]);
  const [extensions, setExtensions] = useState<Extension[] | null>([]);
  const [errors, setErrors] = useState<string>("");

  const userOnboardingFetch = useCallback(async() => {
   await authStore
      .userOnboardingFetch()
      .then((response) => {
        if (response.err) setErrors(response.err["FINAL_FORM/form-error"]);
        else setExtensions(response.response);
      })
      .catch((err) => {
        console.log("err1", err);
      });
  }, [authStore])

  const getActivecalls = useCallback(async () => {
    const response = await dialerStore.getActivecalls();
    if (response.err) setErrors(response.err["FINAL_FORM/form-error"]);
    else setActiveCalls(response.response);
  }, [dialerStore])

  useEffect(() => {
    if (authStore.extensions) setExtensions(authStore.extensions);
    else userOnboardingFetch();
    getActivecalls();
  }, [authStore.extensions, getActivecalls,userOnboardingFetch]);

  return (
    <>
      <div className="extensions btn-group">
        <div className="extension-title">All extensions</div>
        {extensions
          ? extensions.map((ex) => (
              <ExtensionBtn
                history={props.history}
                activeCalls={activeCalls}
                ex={ex}
              ></ExtensionBtn>
            ))
          : null}
      </div>
      <div className="err">{errors}</div>
    </>
  );
};
