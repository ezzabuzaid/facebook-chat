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
  styleUrls: ['./chat-conversation-card.component.scss']
})
export class ChatConversationCardComponent implements OnInit, OnDestroy, IChatCard<ChatModel.IRoom> {
  public id: string;
  public data: ChatModel.IRoom = null;
  @ViewChild(ChatCardComponent, { static: true }) baseCharCard: ChatCardComponent;

  constructor(
    private readonly chatCardManager: ChatCardManager,
    private readonly chatManager: ChatManager,
    @Inject(NAVIGATOR) private readonly navigator: Navigator
  ) { }

  async  ngOnInit() {
    this.chatManager.join(this.data._id);
    this.baseCharCard.updateContentHeight();
    this.navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    })
    this.chatManager.socket.on('StreamAnswer', (videoStream: ChatModel.VideoStream) => {
      console.log('Streaming', videoStream);
      // const peerConnection = new RTCPeerConnection();

      // await peerConnection.setRemoteDescription(
      //   new RTCSessionDescription(data.offer)
      // );
      // const answer = await peerConnection.createAnswer();
      // await peerConnection.setLocalDescription(new RTCSessionDescription(answer));

      // socket.emit("make-answer", {
      //   answer,
      //   to: data.socket
      // });
    })
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
    const peerConnection = new RTCPeerConnection();
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(offer));
    this.chatManager.streamVideo(new ChatModel.VideoStream(offer, this.data._id));
  }

}
