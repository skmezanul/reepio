export interface IRTCPeerConnectionFactory {
    create( configuration?:RTCConfiguration,
            constraints?:RTCMediaConstraints ):RTCPeerConnection
}