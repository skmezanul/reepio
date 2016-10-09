import * as util from "./util";

import {RTCPeerConnectionFactory} from "../../src/webrtc/RTCPeerConnectionFactory";
import restoreRTCPeerConnection = util.restoreRTCPeerConnection;
import isWebRTCSupported = util.isWebRTCSupported;
import getRTCPeerConnection = util.getRTCPeerConnection;
import mockRTCPeerConnectionConfig = util.mockRTCPeerConnectionConfig;
import mockRTCMediaConstraints = util.mockRTCMediaConstraints;

describe( "RTCPeerConnectionFactory", function () {
    let factory:RTCPeerConnectionFactory;

    beforeEach( function () {
        factory = new RTCPeerConnectionFactory();
    } );

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

        restoreRTCPeerConnection();
    } );
} );