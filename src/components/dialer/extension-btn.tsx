import { useEffect, useState } from "react";
import red_headphones from "../../assets/icons/red_headphones.png"
import { domain } from "../../sip/sip"
import { History } from "history";
import { useWebRtcStore } from '../../stores/use-webrtc-store';
import { Call } from "../../shared/model/call";
import { observer } from "mobx-react";
import { Extension } from "../../shared/model/user-onboarding";

type Props = {
  history: History;
  ex: Extension;
  activeCalls: Call[] | null;
};

export const ExtensionBtn = observer((props: Props) => {
  // = (props: Props) => {
  const { ex, activeCalls } = props;
  let [src, setSrc] = useState("");

  const { dialerStore } = useWebRtcStore()
  useEffect(() => {
    if (activeCalls)
      dialerStore.isActive(activeCalls, ex).then((response) => {
        if (response) {
          setSrc("https://webrtc.phone.do/images/green_ellipse.png");
        } else {
          if (!ex.contact) {
            setSrc("https://webrtc.phone.do/images/red_ellipse.png");
          } else {
            setSrc("https://webrtc.phone.do/images/orange_ellipse.png");
          }
        }
      });
  }, [activeCalls, ex,dialerStore]);

  async function callExtension(extension: string) {

    props.history.push("dialer/calling", { destination: "sip:" + extension + "@" + domain });

  }

  return (
    <button key={ex.name} className="dialer-btn extension-btn">
      <button onClick={() => callExtension(ex.callerid_external)} className="headphones">
        <img
          src={red_headphones}
          className="btn-icon call-menu-icon-left"
          alt=""
        />
      </button>
      <img
        src={src}
        className="btn-icon call-menu-icon-right"
        alt="status"
      />
      {ex.description ? ex.description : ex.name}
    </button>
  );
})