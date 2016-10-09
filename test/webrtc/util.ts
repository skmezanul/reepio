import * as faker from "faker";

let _restoreRTCPeerConnections:Function[] = [];

export function getRTCPeerConnection( createSpy:boolean = false ) {
    let prefix = window.webkitRTCPeerConnection ? "webkit" : ( window.mozRTCPeerConnection ? "moz" : "" );
    let name = prefix + "RTCPeerConnection";

    if ( !createSpy ) {
        return window[ name ];
    }

    // gets called by afterEach to restore the original RTCPeerConnection function
    _restoreRTCPeerConnections.push( ( ( name, origFn ) => {
        window[ name ] = origFn;
    } ).bind( null, name, window[ name ] ) );

    return spyOn( window, name );
}

/**
 * Restores the default global [webkit|moz]RTCPeerConnection function if
 * it has been spied upon by getRTCPeerConnection
 */
export function restoreRTCPeerConnection():void {
    if ( _restoreRTCPeerConnections.length ) {
        _restoreRTCPeerConnections.forEach( cb => cb() );
        _restoreRTCPeerConnections.length = 0;
    }
}

export function isWebRTCSupported():boolean {
    return !!getRTCPeerConnection();
}

export function mockRTCPeerConnectionConfig():RTCPeerConnectionConfig {
    return {
        iceServers: [
            { urls: [ faker.internet.url() ] }
        ],
    };
}

export function mockRTCMediaConstraints():RTCMediaConstraints {
    return {
        mandatory: {
            offerToReceiveAudio: false,
            offerToReceiveVideo: true
        },
        optional: [ faker.lorem.word() ]
    };
}