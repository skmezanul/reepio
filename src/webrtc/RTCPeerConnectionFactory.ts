import {IRTCPeerConnectionFactory} from "./IRTCPeerConnectionFactory";
export class RTCPeerConnectionFactory implements IRTCPeerConnectionFactory {
    create( configuration?:RTCConfiguration, constraints?:RTCMediaConstraints ):RTCPeerConnection {
        let ctor:{ new( configuration?:RTCConfiguration,
                        constraints?:RTCMediaConstraints ): RTCPeerConnection };
        if ( window.webkitRTCPeerConnection ) {
            ctor = webkitRTCPeerConnection;
        } else if ( window.mozRTCPeerConnection ) {
            ctor = mozRTCPeerConnection;
        } else if ( window.RTCPeerConnection ) {
            ctor = RTCPeerConnection;
        } else {
            throw new Error( "WebRTC is not supported by this browser" );
        }

        return new ctor( configuration, constraints );
    }

}