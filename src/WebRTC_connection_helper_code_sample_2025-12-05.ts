class WebRTCHelper {
  private pc: RTCPeerConnection;
  private sendChannel: RTCDataChannel;
  private onMessageCallback: (data: string) => void = () => {};
  private onIceCandidateCallback: (candidate: RTCIceCandidate) => void = () => {};
  private onDataChannelOpenCallback: () => void = () => {};

  constructor(iceServers: RTCIceServer[]) {
    this.pc = new RTCPeerConnection({ iceServers });
    this.pc.onicecandidate = (event) => {
      if (event.candidate) {
        this.onIceCandidateCallback(event.candidate);
      }
    };
  }

  async createOffer(): Promise<RTCSessionDescriptionInit> {
    this.sendChannel = this.pc.createDataChannel("sendDataChannel");
    this.sendChannel.onopen = () => this.onDataChannelOpenCallback();
    this.sendChannel.onmessage = (event) => this.onMessageCallback(event.data);

    const offer = await this.pc.createOffer();
    await this.pc.setLocalDescription(offer);
    return offer;
  }

  async createAnswer(offer: RTCSessionDescriptionInit): Promise<RTCSessionDescriptionInit> {
    this.pc.ondatachannel = (event) => {
      this.sendChannel = event.channel;
      this.sendChannel.onopen = () => this.onDataChannelOpenCallback();
      this.sendChannel.onmessage = (event) => this.onMessageCallback(event.data);
    };

    await this.pc.setRemoteDescription(offer);
    const answer = await this.pc.createAnswer();
    await this.pc.setLocalDescription(answer);
    return answer;
  }

  async setRemoteDescription(sdp: RTCSessionDescriptionInit): Promise<void> {
    await this.pc.setRemoteDescription(sdp);
  }

  addIceCandidate(candidate: RTCIceCandidateInit): Promise<void> {
    return this.pc.addIceCandidate(candidate);
  }

  sendMessage(message: string): void {
    this.sendChannel.send(message);
  }

  setOnMessage(callback: (data: string) => void): void {
    this.onMessageCallback = callback;
  }

  setOnIceCandidate(callback: (candidate: RTCIceCandidate) => void): void {
    this.onIceCandidateCallback = callback;
  }

  setOnDataChannelOpen(callback: () => void): void {
    this.onDataChannelOpenCallback = callback;
  }

  close(): void {
    if (this.sendChannel) {
      this.sendChannel.close();
    }
    this.pc.close();
  }
}

export default WebRTCHelper;