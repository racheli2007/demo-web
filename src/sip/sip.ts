import { Inviter, InviterOptions, Session, UserAgent, Web } from "sip.js";

export const domain = "68.183.220.137";

 function getAudioElement(id: string): HTMLAudioElement {
  const el = document.getElementById(id);
  if (!(el instanceof HTMLAudioElement)) {
    throw new Error(`Element "${id}" not found or not an audio element.`);
  }
  return el;
}
export var  session=  Session;
export var simpleUser: Web.SimpleUser;
// Helper function to wait

const aor = "sip:alice@example.com";
export async function initSession() {

  // const audio1 = await getAudioElement("remoteAudio");
  // const options: Web.SimpleUserOptions = {
  //   aor,
  //   media: {
  //     remote: {
  //       audio: audio1
  //     }
  //   }
  // };

  const target = UserAgent.makeURI("sip:bob@example.com");
  if (!target) {
    throw new Error("Failed to create target URI.");
  }
  // const displayName = "wss://webrtc01.phone.do:443";
  const transportOptions = {
    server: "wss://webrtc01.phone.do:443"
  };
  var userAgent = new UserAgent({transportOptions});
  var inviterOptions: InviterOptions = {};
  let constraints = { audio: true, video: false }
  if (!inviterOptions.sessionDescriptionHandlerOptions) {
    inviterOptions.sessionDescriptionHandlerOptions = {};
  }
  if (!inviterOptions.sessionDescriptionHandlerOptions.constraints) {
    inviterOptions.sessionDescriptionHandlerOptions.constraints = constraints;
  }

  var session: Session | undefined = new Inviter(userAgent, target, inviterOptions);
  return session;
}

// Main function
export async function connectWebrtc(): Promise<void> {
const audio1=await getAudioElement("remoteAudio");
  // SIP over WebSocket Server URL
  // The URL of a SIP over WebSocket server which will complete the call.
  // FreeSwitch is an example of a server which supports SIP over WebSocket.
  // SIP over WebSocket is an internet standard the details of which are
  // outside the scope of this documentation, but there are many resources
  // available. See: https://tools.ietf.org/html/rfc7118 for the specification.
  const server = "wss://webrtc01.phone.do:443";

  // SIP Request URI
  // The SIP Request URI of the destination. It's "Who you wanna call?"
  // SIP is an internet standard the details of which are outside the
  // scope of this documentation, but there are many resources available.
  // See: https://tools.ietf.org/html/rfc3261 for the specification.

  // SIP Address of Record (AOR)
  // This is the user's SIP address. It's "Where people can reach you."
  // SIP is an internet standard the details of which are outside the
  // scope of this documentation, but there are many resources available.
  // See: https://tools.ietf.org/html/rfc3261 for the specification.


  // Configuration Options
  // These are configuration options for the `SimpleUser` instance.
  // Here we are setting the HTML audio element we want to use to
  // play the audio received from the remote end of the call.
  // An audio element is needed to play the audio received from the
  // remote end of the call. Once the call is established, a `MediaStream`
  // is attached to the provided audio element's `src` attribute.
  const options: Web.SimpleUserOptions = {
    aor,
    media: {
      remote: {
        audio: audio1
      }
    }
  };

  // Construct a SimpleUser instance
 simpleUser = new Web.SimpleUser(server, options);

  // Supply delegate to handle inbound calls (optional)
  
}
export async function call(destination:string): Promise<void> {
  // Connect to server

  await simpleUser.connect();

  // Register to receive inbound calls (optional)
  await simpleUser.register();

  // Place call to the destination
  await simpleUser.call(destination);
}
export async function hangup(): Promise<void> {
await simpleUser.hangup();
}


