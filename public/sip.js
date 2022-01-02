

// set the destination ip of the keypad service
var domain = '68.183.220.137';


//set the caller id
const aor = 'sip:0722744002@' + domain;
var fromName = 'Caller';

// set the destination number
var toURI = '';
var toName = 'Callee';

var simple = null;
var state = null;

var remoteVideoElement;
// Function: createSimple
//   creates a SIP.js Simple instance with the given arguments plugged into the
//   configuration. This is a standard Simple instance for WebRTC calls.
//
// Arguments:
//   callerURI: the URI of the caller, aka, the URI that belongs to this user.
//   displayName: what name we should display the user as
//   remoteVideo: the DOM element id of the video for the remote
function getAudio(id) {
    const el = document.getElementById(id);
    return el;
}

function createSimple(callerURI, displayName, remoteVideoElement) {
    // navigator.permissions.query(
    //     // { name: 'camera' }
    //     { name: 'microphone' }
    //     // { name: 'geolocation' }
    //     // { name: 'notifications' } 
    //     // { name: 'midi', sysex: false }
    //     // { name: 'midi', sysex: true }
    //     // { name: 'push', userVisibleOnly: true }
    //     // { name: 'push' } // without userVisibleOnly isn't supported in chrome M45, yet
    // ).then(function (permissionStatus) {

    //     console.log("state", permissionStatus.state); // granted, denied, prompt

    //     permissionStatus.onchange = function () {
    //         console.log("Permission changed to " + this.state);
    //     }

    // })


    var configuration = {
        aor,
        media: {
            remote: {
                audio: remoteVideoElement,
            },
        },
        ua: {
            traceSip: true,
            uri: aor,
            displayName: displayName,
            userAgentString: 'SIP-0.20.0.js',
        },
    };
    return new SIP.Web.SimpleUser('wss://webrtc01.phone.do:443', configuration);
}

async function call() {
    var remoteVideoElement = getAudio('remoteAudio');
    simple = createSimple(aor, fromName, remoteVideoElement);
    await simple.connect();
    doState();
    // runTimer();
}

function call(to) {
    simple.call(to);
    state = 1;
}
async function hangup() {

    await simple.hangup();
    clearInterval();
    window.location = "https://webrtc.phone.do/";

}

function doState() {
    if (state == null) {
        toURI =`sip:${localStorage.getItem("extension")}@${domain}`;
        call(toURI);
    } else {
        hangup();
    }
}
window.onbeforeunload = function (evt) {
    hangup();
}

