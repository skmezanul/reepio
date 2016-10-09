///<reference path="../typings/index.d.ts"/>
import {IRTCPeerConnectionFactory} from "./webrtc/IRTCPeerConnectionFactory";
import {RTCPeerConnectionFactory} from "./webrtc/RTCPeerConnectionFactory";
let rtcFactory:IRTCPeerConnectionFactory = new RTCPeerConnectionFactory();
let conn = rtcFactory.create( {
    iceServers: [
        { urls: [ "stun:stun.l.google.com:19302", "stun:stun.l.google.com:19302" ] }
    ]
} );

conn.createOffer( {
} ).then( offer => {
    console.log(offer)
} );

