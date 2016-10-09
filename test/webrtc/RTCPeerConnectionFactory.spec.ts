import * as faker from "faker";
import {RTCPeerConnectionFactory} from "../../src/webrtc/RTCPeerConnectionFactory";

describe( "RTCPeerConnectionFactory", function () {
    let factory:RTCPeerConnectionFactory;
    let _restoreRTCPeerConnection;

    beforeEach( function () {
        factory = new RTCPeerConnectionFactory();
    } );

    afterEach( function () {
        if ( _restoreRTCPeerConnection ) {
            _restoreRTCPeerConnection();
            _restoreRTCPeerConnection = null;
        }
    } );

    function getRTCPeerConnection( createSpy:boolean = false ) {
        let prefix = window.webkitRTCPeerConnection ? "webkit" : ( window.mozRTCPeerConnection ? "moz" : "" );
        let name = prefix + "RTCPeerConnection";

        if ( !createSpy ) {
            return window[ name ];
        }

        // gets called by afterEach to restore the original RTCPeerConnection function
        _restoreRTCPeerConnection = ( ( name, origFn ) => {
            window[ name ] = origFn;
        } ).bind( null, name, window[ name ] );

        return spyOn( window, name );
    }

    function isWebRTCSupported():boolean {
        return !!getRTCPeerConnection();
    }

    function mockRTCPeerConnectionConfig():RTCPeerConnectionConfig {
        return {
            iceServers: [
                { urls: [ faker.internet.url() ] }
            ],
        };
    }

    function mockRTCMediaConstraints():RTCMediaConstraints {
        return {
            mandatory: {
                offerToReceiveAudio: false,
                offerToReceiveVideo: true
            },
            optional: [ faker.lorem.word() ]
        };
    }

    it( "should create a [webkit|moz]RTCPeerConnection", function () {
        if ( isWebRTCSupported() ) {
            expect( factory.create() instanceof getRTCPeerConnection() ).toBe( true );
        } else {
            pending( "not supported" );
        }
    } );

    it( "should pass params", function () {
        if ( isWebRTCSupported() ) {
            let spy = getRTCPeerConnection( true );
            let configuration = mockRTCPeerConnectionConfig();
            let constraints = mockRTCMediaConstraints();
            factory.create( configuration, constraints );
            expect( spy ).toHaveBeenCalledWith( configuration, constraints );
        } else {
            pending( "not supported" );
        }
    } );
} );