import { Component, OnInit, Input, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { ChatManager } from '../chat.manager';
import { TokenService } from '@core/helpers/token';
import { ChatModel } from '@shared/models';
import { MediaHubManager } from 'app/pages/media-hub/media-hub.manager';
import { AppUtils } from '@core/helpers/utils';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-message-bubble',
  templateUrl: './message-bubble.component.html',
  styleUrls: ['./message-bubble.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'mb-2 mx-3 position-relative'
  }
})
export class MessageBubbleComponent implements OnInit {
  @Input() message: ChatModel.Message;
  public loading = false;
  @HostBinding('class.sender') isSender: boolean = false;

  constructor(
    private chatManager: ChatManager,
    private tokenService: TokenService,
    private mediaHubManager: MediaHubManager
  ) { }

  ngOnInit() {
    if (this.message.timestamp) {
      this.loading = true;
      const listener = this.chatManager.socket
        .on(`saved_${this.message.timestamp}`, (id) => {
          this.loading = false;
          this.message._id = id;
          listener.removeAllListeners();
        })
    }
    this.isSender = this.tokenService.decodedToken.id === this.message.user;
  }

  sendMessage(text: string) {
    this.message.text = text;
    this.chatManager.sendMessage(this.message);
  }

  isFile() {
    return AppUtils.isFile(this.message.text);
  }

}
