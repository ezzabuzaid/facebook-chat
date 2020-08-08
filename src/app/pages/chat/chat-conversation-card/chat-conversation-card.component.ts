import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NAVIGATOR } from '@shared/common';
import { ChatModel } from '@shared/models';
import { ChatCardManager } from '../chat-card.manager';
import { ChatCardComponent } from '../chat-card/chat-card.component';
import { ChatManager } from '../chat.manager';
import { IChatCard } from '../index';
@Component({
  selector: 'app-user-card',
  templateUrl: './chat-conversation-card.component.html',
  styleUrls: ['./chat-conversation-card.component.scss'],
  providers: [ChatManager]
})
export class ChatConversationCardComponent implements OnInit, OnDestroy, IChatCard<ChatModel.Room> {
  video = document.querySelector('#webrtc') as HTMLVideoElement;
  localVideo = document.querySelector('#localVideo') as HTMLVideoElement;
  public id: string;
  public data: ChatModel.Room = null;
  peerConnection = new RTCPeerConnection({
    iceServers: [{
      urls: ['stun:stun.l.google.com:19302']
    }]
  });
  @ViewChild(ChatCardComponent, { static: true }) baseCharCard: ChatCardComponent;

  constructor(
    private readonly chatCardManager: ChatCardManager,
    private readonly chatManager: ChatManager,
    @Inject(NAVIGATOR) private readonly navigator: Navigator,
  ) { }

  async ngOnInit() {
    this.chatManager.join(this.data._id);
    this.baseCharCard.updateContentHeight();

    this.chatManager.socket.on('CallNegotiationMade', async (callNegotiation: ChatModel.CallNegotiation) => {
      console.log('CallNegotiationMade');
      await this.peerConnection.setRemoteDescription(callNegotiation.negotiation);
      const answer = await this.peerConnection.createAnswer();
      await this.peerConnection.setLocalDescription(answer);
      this.chatManager.acceptCallNegotiation(new ChatModel.CallNegotiation(answer, this.data._id));
      this.localVideo.srcObject = await this.getMedia();
    });

    this.chatManager.socket.on('AcceptedCallNegotiation', async (callNegotiation: ChatModel.CallNegotiation) => {
      console.log('AcceptedCallNegotiation');
      await this.peerConnection.setRemoteDescription(callNegotiation.negotiation);
      this.localVideo.srcObject = await this.getMedia();
    });

    this.peerConnection.ontrack = ({ streams: [stream] }) => {
      this.video.srcObject = stream;
      this.video.play();
    };

    // this.peerConnection.onicecandidate = (event) => {
    //   if (event.candidate) {
    //     console.log(event.candidate);
    //     this.chatManager.socket.emit('CallerCandidate', new ChatModel.CallNegotiation(event.candidate as any, this.data._id));
    //   }
    // };

    // this.chatManager.socket.on('CalleeCandidate', (candidate: ChatModel.CallNegotiation) => {
    //   console.log(candidate.negotiation);
    //   this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate.negotiation as any));
    // });


  }

  updateScroll() {
    this.baseCharCard.updateContentHeight();
  }

  closeCard() {
    this.chatCardManager.removeCard();
    this.chatCardManager.removeButton(this.id);
  }

  ngOnDestroy() {
    this.chatManager.leave(this.data._id);
  }

  async callUser() {
    const stream = await this.getMedia();
    this.video.srcObject = stream;
    stream.getTracks().forEach(track => this.peerConnection.addTrack(track, stream));

    await this.peerConnection.setLocalDescription(await this.peerConnection.createOffer());
    this.chatManager.makeCallNegotiation(new ChatModel.CallNegotiation(this.peerConnection.localDescription, this.data._id));
  }


  getMedia() {
    return this.navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
  }

}
