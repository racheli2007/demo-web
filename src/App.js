import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {Home} from "./components/home/Home";
import {Contact} from "./components/Contact";
import {Dialer} from "./components/dialer/dialer";
import {HistoryCalls} from "./components/history/history";
import {RecordGroups} from "./components/recording/record-groups";
import {Recordings} from "./components/recording/recording";
import {Transcripts} from "./components/Transcripts";
import {Messages} from "./components/Messages";
import {Settings} from "./components/Settings";
import {Calling} from "./components/dialer/calling/calling";
import { Login } from "./components/login/login";
import {RedirectLogin} from "./components/redirect-login";
import {Page} from "./page"
// import {QrCodeNew} from "./components/qr_code/qrCode-new";
import {QrCode} from "./components/qr_code/qrCode";


export default function App() {
  // var isFirstCall=false;
  // var socket = io('https://cc1.fra1.omega-telecom.net:5999', { transports: ['websocket', 'polling'], secure: true, query: { token: "eluJk815si5Bug3aLRzoWe120NAM97aN" } });
  // socket.emit("setCrmListener", { name: "crm", number: "5843007" })
  // socket.on('newEvent', function (msg) {
  //   console.log("message: ", msg);
  //   if (msg.event === "incoming")
  //   {
  //     if(isFirstCall)
  //     alert("incomingCall now from:" + msg.caller_id)
  //   }
  //   else
  //     if (msg.event === "hangup")
  //     {
  //       isFirstCall=false
  //       alert('hangup')
  //     }
  // });

  return (
    <>
    <Router>
      <Switch>
        <Route path="/contact" render={(props) => (<Page title="Contact"> <Contact {...props} /> </Page>)} />
        <Route path="/dialer/calling" render={(props) => (<Page title="Calling"> <Calling {...props} /> </Page>)} />
        <Route path="/dialer" render={(props) => (<Page title="Dialer"> <Dialer {...props} /> </Page>)} />
        <Route path="/history" render={(props) => (<Page title="History"> <HistoryCalls {...props} /></Page>)} />
        <Route path="/recording/recordings" render={(props) => (<Page title="Recordings"> <Recordings {...props} /> </Page>)} />
        <Route path="/recording" render={(props) => (<Page title="RecordGroups"> <RecordGroups {...props} /></Page>)} />
        <Route path="/transcripts" render={(props) => (<Page title="Transcripts"> <Transcripts {...props} /></Page>)} />
        <Route path="/messages" render={(props) => (<Page title="Messages"> <Messages {...props} /></Page>)} />
        <Route path="/settings" render={(props) => (<Page title="Settings"> <Settings {...props} /></Page>)} />
        <Route path="/redirectlogin" render={(props) => (<Page title="Redirect Login"> <RedirectLogin {...props} /></Page>)} />
        <Route path="/login" render={(props) => (<Page title="Login"> <Login {...props} /></Page>)} />
        <Route path="/home" render={(props) => (<Page title="Home"> <Home {...props} /></Page>)} />
        <Route path="/qrCode/:hotlineId" render={(props) => ( <QrCode {...props} />)} />
        <Route path="/" render={(props) => (<Page title="Login"> <Login {...props} /></Page>)} />
      </Switch>
    </Router>
    </>
  );
}

