"use strict";

// set the destination ip of the keypad service
var domain = '68.183.220.137'; //set the caller id

var aor = 'sip:0722744002@' + domain;
var fromName = 'Caller'; // set the destination number

var toURI = '';
var toName = 'Callee';
var simple = null;
var state = null;
var remoteVideoElement; // Function: createSimple
//   creates a SIP.js Simple instance with the given arguments plugged into the
//   configuration. This is a standard Simple instance for WebRTC calls.
//
// Arguments:
//   callerURI: the URI of the caller, aka, the URI that belongs to this user.
//   displayName: what name we should display the user as
//   remoteVideo: the DOM element id of the video for the remote

function getAudio(id) {
  var el = document.getElementById(id);
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
    aor: aor,
    media: {
      remote: {
        audio: remoteVideoElement
      }
    },
    ua: {
      traceSip: true,
      uri: aor,
      displayName: displayName,
      userAgentString: 'SIP-0.20.0.js'
    }
  };
  return new SIP.Web.SimpleUser('wss://webrtc01.phone.do:443', configuration);
}

function onLoad() {
  var remoteVideoElement;
  return regeneratorRuntime.async(function onLoad$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          remoteVideoElement = getAudio('remoteAudio');
          simple = createSimple(aor, fromName, remoteVideoElement);
          _context.next = 4;
          return regeneratorRuntime.awrap(simple.connect());

        case 4:
          doState();
          runTimer();

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}

function call(to) {
  simple.call(to);
  state = 1;
}

function hangup() {
  return regeneratorRuntime.async(function hangup$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(simple.hangup());

        case 2:
          clearInterval();
          window.location = "https://webrtc.phone.do/";

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function doState() {
  if (state == null) {
    toURI = localStorage.getItem("toURI");
    call(toURI);
  } else {
    hangup();
  }
}

window.onbeforeunload = function (evt) {
  hangup();
};